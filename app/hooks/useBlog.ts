import { Blog } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import useBlogEdit from "./useBlogEdit";
import { notFound } from "next/navigation";

const useBlog = (blogId: string) => {
  const [blog, setBlog] = useState<(Blog & { images: string[] }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [blogImages, setBlogImages] = useState<string[]>([]);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const { triggerRerender } = useBlogEdit(blogId);

  useEffect(() => {
    if (blogId)
      axios
        .get(`/api/blog/${blogId}`)
        .then((res) => {
          setBlog(res.data);
          setBlogImages(res.data.images.map((image: any) => image.url));
          setBlogTags(res.data.tags.map((tag: any) => tag.name));
        })
        .catch((error) => {
            setLoading(false);
        });
    setLoading(false);
  }, [blogId, triggerRerender]);

  return {
    blogImages,
    blogTags,
    blog,
    loading,
  };
};

export default useBlog;
