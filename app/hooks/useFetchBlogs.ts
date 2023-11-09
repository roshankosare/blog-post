import { Blog } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

export type BlogWithAuther = Partial<
  Blog & {
    auther: { username: string; email: string; avatar: string };
  } & { tags: { name: string }[] }
>;
const useFetchBlogs = () => {
  const [newblogs, setNewBlogs] = useState<BlogWithAuther[]>([]);
  const [page, setPage] = useState<number>(2);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState<boolean>(false);

  const fetchBlogs = async (tag?: string, autherId?: string) => {
    setLoadingBlogs(true);
    axios
      .get(`/api/blog?`, {
        params: {
          page: page,
          tag: tag || null,
          autherId: autherId || null,
        },
      })
      .then((res) => {
        if (res.data.length < 5 || newblogs.length === 50) {
          setNewBlogs((pre) => [...pre, ...res.data]);
          setLoadMoreDisabled(true);
          return;
        }
        setNewBlogs((pre) => [...pre, ...res.data]);
      });
    setPage((pre) => pre + 1);
    setLoadingBlogs(false);
  };
  

  return {
    newblogs,
    loadingBlogs,
    fetchBlogs,
    loadMoreDisabled
  };
};

export default useFetchBlogs;
