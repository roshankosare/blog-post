import { useToast } from "@/components/ui/use-toast";
import { updateBlog } from "@/lib/posts";
import { Blog } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useBlogEdit = (blogId: string) => {
  const [titleEditValue, setTitleEditValue] = useState<string | null>(null);
  const [editedMarkdown, setEditedMarkdown] = useState<string | null>(null);
  const [blogImageToUpload, setBlogImageToUpload] = useState<File | null>(null);
  const [showUploadPreviewModel, setShowUploadPreviewModel] =
    useState<boolean>(false);
  const [triggerRerender, setTriggerRerender] = useState<boolean>(false);
  const { toast } = useToast();

  const saveBlog = async ({ tags }: { tags: string[] }) => {
    try {
      //   setSaveDisabled(true);
      await updateBlog(
        {
          title: titleEditValue || undefined,
          markdownString: editedMarkdown || undefined,
        },
        blogId,
        tags
      );
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

  return {
    setEditedMarkdown,
    saveBlog,
    showUploadPreviewModel,
    setShowUploadPreviewModel,
    triggerRerender,
    setBlogImageToUpload,
    uploadBlogImage,
    setTitleEditValue,
    blogImageToUpload,
    titleEditValue
  };
};

export default useBlogEdit;
