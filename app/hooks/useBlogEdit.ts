import { useToast } from "@/components/ui/use-toast";
import { updateBlog } from "@/lib/posts";
import { Blog } from "@prisma/client";
import axios from "axios";

import { useEffect, useState } from "react";

const useBlogEdit = (blogId: string, fetchBlog: () => void) => {
  const [titleEditValue, setTitleEditValue] = useState<string | null>(null);
  const [editedMarkdown, setEditedMarkdown] = useState<string | null>(null);
  const [blogImageToUpload, setBlogImageToUpload] = useState<File | null>(null);
  const [userSelectedTags, setUserSelectedTags] = useState<string[]>([]);
  const [showUploadPreviewModel, setShowUploadPreviewModel] =
    useState<boolean>(false);

  const { toast } = useToast();

  const insertTagInUserSeletedTags = (tag: string) => {
    if (tag && !userSelectedTags.includes(tag)) {
      setUserSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const deleteTagInUserSeletedTag = (tag: string) => {
    setUserSelectedTags((pre) => pre.filter((item) => item !== tag));
  };

  const publishBlog = async () => {
    try {
      await updateBlog({ publish: true }, blogId, []);
      toast({
        title: "published",
        description: "Your Blog has been published successfully",
      });
      fetchBlog();
    } catch (error) {}
  };
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
      setUserSelectedTags([]);
      setTitleEditValue(null);
      setEditedMarkdown(null);

      toast({
        title: "Saved",
        description: "Your Blog has been updated successfully",
      });

      fetchBlog();
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
      setBlogImageToUpload(null);
      fetchBlog();
      return resposne.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setShowUploadPreviewModel(true);
  }, [blogImageToUpload]);

  const deleteBlogImage = async (id: string) => {
    try {
      const imageId = id.split("/").pop();
      if (!imageId) return;
      const resposne = await axios.delete(
        `/api/blog/${blogId}/image/${imageId}`
      );

      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setEditedMarkdown,
    saveBlog,
    showUploadPreviewModel,
    setShowUploadPreviewModel,
    setBlogImageToUpload,
    uploadBlogImage,
    setTitleEditValue,
    blogImageToUpload,
    titleEditValue,
    publishBlog,
    editedMarkdown,
    deleteBlogImage,
    userSelectedTags,
    insertTagInUserSeletedTags,
    deleteTagInUserSeletedTag,
  };
};

export default useBlogEdit;
