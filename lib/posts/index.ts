import { Blog } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { prisma } from "../prisma/prisma";

export const getBlogs = async (): Promise<Partial<Blog>[]> => {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        coverImage: true,
        auther: {
          select: {
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return blogs;
  } catch (error) {
    return [];
  }
};

export const getBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      include: {
        auther: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    if (!blog) return undefined;
    return blog;
  } catch (error) {
    return undefined;
  }
};

type createBlogBody = {
  title: string;
  markdown: string;
  coverImage: File | null;
  blogImages:File[]
};
export const postBlog = async ({
  title,
  markdown,
  coverImage,
  blogImages
}: createBlogBody): Promise<Blog | undefined> => {
  if (!markdown || markdown === "" || !title || title === "") {
    throw new Error("title or body missing");
  }
  try {
    const form = new FormData();
    form.set("title", title);
    form.set("markdown", markdown);
    if (coverImage) form.set("coverImage", coverImage);
    if(blogImages.length > 0)
    blogImages.map((image)=>form.append("blogImages",image));
    const response = await axios.post("/api/blog", form);
    return response.data;
  } catch (error) {
    throw new Error("can not crate blog");
  }
};
