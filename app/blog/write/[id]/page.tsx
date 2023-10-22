"use client";

import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { updateBlog } from "@/lib/posts";
import { Blog } from "@prisma/client";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [blog, setBlog] = useState<Blog | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { toast } = useToast();
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [publishDisabled, setPublishedDisabled] = useState<boolean>(false);

  const saveBlog = async () => {
    setSaveDisabled(true);
    await updateBlog({ markdownString: markdown }, params.id);
    toast({
      title: "Saved",
      description: "Your Blog has been updated successfully",
      // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    setSaveDisabled(false);
  };

  const publishBlog = async () => {
    setPublishedDisabled(true);
    await updateBlog({ published:true }, params.id);
    toast({
      title: "Published",
      description: "Your Blog has been published successfully",
    });
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
  }, [params]);

  if (error) {
    notFound();
  }

  return (
    <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 px-10 py-10">
      <div>
        {!loading && blog ? (
          <div className="flex justify-between">
            {blog ? (
              <p className="text-3xl font-bold">{blog.title}</p>
            ) : (
              <Skeleton className="w-full"></Skeleton>
            )}
            <Button variant={"outline"} size={"sm"}>
              Edit Title
            </Button>
          </div>
        ) : (
          <Skeleton className="w-full h-14"></Skeleton>
        )}
      </div>
      <MarkdownEditor
        setBlogImage={(file: File) => setBlogImage(file)}
        setMarkdownValue={(value: string) => setMarkdown(value)}
        markdownValue=""
      />
      <div className="flex gap-x-5">
        <Button
          disabled={saveDisabled}
          onClick={() => saveBlog()}
          className="w-40"
        >
          {saveDisabled ? <Loader message="Please wait"></Loader> : "Save"}
        </Button>
        <Button disabled = {publishDisabled} onClick={() => publishBlog()} className="w-40">
          {/* TODO:- if publish change publish to unpublish */}
          {publishDisabled ? <Loader message="Please wait"></Loader> : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default WriteBlog;
