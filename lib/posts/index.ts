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
    console.log(error);
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
            avatar:true
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

  coverImage: File | null;
};
export const postBlog = async ({
  title,

  coverImage,
}: createBlogBody): Promise<Blog | undefined> => {
  if (!title || title === "") {
    throw new Error("title or body missing");
  }
  try {
    const form = new FormData();
    form.set("title", title);

    if (coverImage) form.set("coverImage", coverImage);
    const response = await axios.post("/api/blog", form);
    return response.data;
  } catch (error) {
    throw new Error("can not crate blog");
  }
};

export const updateBlog = async (
  blogBody: Partial<Pick<Blog, "markdownString" | "title" | "published">>,
  blogId: string
) => {
  try {
    const res = await axios.patch(`/api/blog/${blogId}`, blogBody);
  } catch (error) {
    throw new Error("unauthorized person");
  }
};
