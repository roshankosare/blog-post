import { Blog } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import useBlogEdit from "./useBlogEdit";

const useBlog = (blogId: string) => {
  const [blog, setBlog] = useState<
    (Blog & { images: { url: string }[] } & { tags: { name: string }[] }) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean | null>(null);
  const [triggerRerender, setTriggerRerender] = useState<boolean>(false);

  const fetchBlog = () => {
    setTriggerRerender((pre) => !pre);
  };

  useEffect(() => {
    const fetchBlog = () => {
      axios
        .get(`/api/blog/${blogId}`)
        .then((res) => {
          setBlog(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setIsNotFound(true);
        });
      setLoading(false);
      setIsNotFound(false);
    };
    fetchBlog();
  }, [blogId,triggerRerender]);

 
  return {
    blog,
    loading,
    isNotFound,
    fetchBlog,
  };
};

export default useBlog;
