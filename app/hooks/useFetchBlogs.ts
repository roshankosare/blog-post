import { Blog } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

export type BlogWithAuther = Partial<
  Blog & {
    auther: { username: string; email: string; avatar: string };
  } & { tags: { name: string }[] }
>;
const useFetchBlogs = ()=>{
    const [newblogs, setNewBlogs] = useState<BlogWithAuther[]>([]);
    const [page, setPage] = useState<number>(2);
    const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

    const fetchBlogs = async (tag?: string) => {
        setLoadingBlogs(true);
        axios
          .get(`/api/blog?`, {
            params: {
              page: page,
              tag: tag || null,
            },
          })
          .then((res) => {
            setNewBlogs((pre) => [...pre, ...res.data]);
          });
        setPage((pre) => pre + 1);
        setLoadingBlogs(false);
      };

      return {
        newblogs,loadingBlogs,fetchBlogs
      }

}

export default useFetchBlogs;