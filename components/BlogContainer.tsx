"use client";

import { Blog } from "@prisma/client";
import BlogCard, { BlogSkeleton } from "./Blog";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import useFetchBlogs, { BlogWithAuther } from "@/app/hooks/useFetchBlogs";

interface BlogContainerProps {
  blogs: BlogWithAuther[];
  searchParams: { [key: string]: string | string[] | undefined };
}

const BlogContainer: React.FC<BlogContainerProps> = ({
  blogs,
  searchParams,
}) => {
  const tag = searchParams["tag"] as string;

  const { fetchBlogs, newblogs, loadingBlogs } = useFetchBlogs();

  return (
    <div className="w-full flex flex-col  max-h-full bg-transparent  overflow-y-scroll gap-y-2 no-scrollbar ">
      {[...blogs, ...newblogs].map((blog) => {
        return (
          <Link href={`blog/${blog.id}`} key={blog.id}>
            <BlogCard blog={blog}></BlogCard>
          </Link>
        );
      })}
      {loadingBlogs && [0, 1].map((value) => <BlogSkeleton key={value} />)}
      <Button
        variant={"outline"}
        size={"sm"}
        className="w-40 px-3 py-4 mx-auto rounded-3xl"
        onClick={() => {
          if (tag) {
            fetchBlogs(tag);
            return;
          }
          fetchBlogs();
        }}
      >
        Load more stories
      </Button>
    </div>
  );
};

export default BlogContainer;
