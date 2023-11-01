"use client";

import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { updateBlog } from "@/lib/posts";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { UploadImagePreview } from "@/components/UploadImagePreview";
import { Blog } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [blog, setBlog] = useState<(Blog & { images: string[] }) | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { toast } = useToast();
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [publishDisabled, setPublishedDisabled] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [triggerBlogUpadate, setTriggerBlogUpadate] = useState<boolean>(false);
  const uploadBlogImage = async () => {
    try {
      const form = new FormData();
      if (!blogImage) {
        console.log("blog Image is empty");
        return;
      }
      form.append("image", blogImage);
      const resposne = await axios.post(`/api/blog/${params.id}/image`, form);
      setShowModel(false);
      setTriggerBlogUpadate((pre) => !pre);
      return resposne.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowModel(true);
  }, [blogImage]);

  const saveBlog = async () => {
    try {
      setSaveDisabled(true);
      await updateBlog({ markdownString: markdown }, params.id);
      toast({
        title: "Saved",
        description: "Your Blog has been updated successfully",
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      setTriggerBlogUpadate((pre) => !pre);
      setSaveDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const publishBlog = async () => {
    setPublishedDisabled(true);
    await updateBlog({ published: true }, params.id);
    toast({
      title: "Published",
      description: "Your Blog has been published successfully",
    });
    setTriggerBlogUpadate((pre) => !pre);
    setPublishedDisabled(false);
  };
  useEffect(() => {
    axios
      .get(`/api/blog/${params.id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((error) => setError(true));
    setLoading(false);
  }, [params, triggerBlogUpadate]);

  useEffect(() => {
    if (blog) setMarkdown(blog.markdownString);
  }, [blog]);
  if (error) {
    notFound();
  }

  return (
    <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 sm:px-10  sm:py-10 px-2 py-2 mb-10">
       <Label>Title</Label>
      <div>
        {!loading && blog ? (
          <div className="flex justify-between flex-col sm:flex-row gap-y-4 gap-x-5">
           
            {blog ? (
              <Input
                value={blog.title}
                onChange={() => {}}
                className=" text-xl sm:text-2xl   font-bold"
              ></Input>
            ) : (
              <Skeleton className="w-full"></Skeleton>
            )}
            <Button variant={"outline"} size={"sm"} className=" w-24 sm:py-5">
              Edit Title
            </Button>
          </div>
        ) : (
          <Skeleton className="w-full h-14"></Skeleton>
        )}
      </div>
      <Label>Tags</Label>
      <div className="flex justify-between flex-col sm:flex-row gap-y-4 gap-x-5">
          <Input placeholder="create new tag or search">
           
          </Input>
          <Button variant={"outline"} size={"sm"} className=" w-24 sm:py-5">
            Save
          </Button>
      </div>
      {blog && (
        <MarkdownEditor
          images={blog.images.map((image: any) => image.url)}
          setBlogImage={(image: File) => setBlogImage(image)}
          uploadBlogImage={uploadBlogImage}
          setMarkdownValue={(value: string) => setMarkdown(value)}
          markdownValue={markdown}
        />
      )}
      <div className="flex gap-x-5">
        <Button
          disabled={saveDisabled}
          onClick={() => saveBlog()}
          className="w-40"
        >
          {saveDisabled ? <Loader message="Please wait"></Loader> : "Save"}
        </Button>
        <Button
          disabled={publishDisabled}
          onClick={() => publishBlog()}
          className="w-40"
        >
          {/* TODO:- if publish change publish to unpublish */}
          {publishDisabled ? (
            <Loader message="Please wait"></Loader>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
      {blogImage && (
        <UploadImagePreview
          onImageUpload={uploadBlogImage}
          onClose={() => setShowModel(false)}
          open={showModel}
          url={URL.createObjectURL(blogImage)}
        ></UploadImagePreview>
      )}
    </div>
  );
};

export default WriteBlog;
