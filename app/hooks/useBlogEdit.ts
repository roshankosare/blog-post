import {  useToast } from "@/components/ui/use-toast";
import { updateBlog } from "@/lib/posts";
import { Blog } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useBlogEdit = (blogId: string) => {
  const [title, setTitle] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string >("");
  const [blog, setBlog] = useState<(Blog & { images: string[] }) | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerRerender, setTriggerRerender] = useState<boolean>(false);
  const [blogImageToUpload, setBlogImageToUpload] = useState<File | null>(null);
  const [showUploadPreviewModel, setShowUploadPreviewModel] =
    useState<boolean>(false);
  const [blogImages, setBlogImages] = useState<string[]>([]);
  const { toast } = useToast();

  const saveBlog = async ({ tags }: { tags: string[] }) => {
    try {
      //   setSaveDisabled(true);
      if (markdown)
        await updateBlog({ markdownString: markdown }, blogId, tags);
      toast({
        title: "Saved",
        description: "Your Blog has been updated successfully",
      });
      setTriggerRerender((pre) => !pre);
      //   setSaveDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadBlogImage = async () => {
    try {
      const form = new FormData();
      if (!blogImageToUpload) {
        console.log("blog Image is empty");
        return;
      }
      form.append("image", blogImageToUpload);
      const resposne = await axios.post(`/api/blog/${blogId}/image`, form);
      setShowUploadPreviewModel(false);
      setTriggerRerender((pre) => !pre);
      return resposne.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blogId)
      axios
        .get(`/api/blog/${blogId}`)
        .then((res) => {
          setBlog(res.data);
          setMarkdown(res.data.markdownString);
          setTitle(res.data.title);
          setBlogImages(res.data.images.map((image: any) => image.url));
        })
        .catch((error) => {});
    setLoading(false);
  }, [blogId, triggerRerender]);

  return {
    blog,
    loading,
    markdown,
    title,
    setMarkdown,
    saveBlog,
    showUploadPreviewModel,setShowUploadPreviewModel,
    blogImages,
    setBlogImageToUpload,
    uploadBlogImage,
    setTitle,
    blogImageToUpload
  };
};


export default useBlogEdit;