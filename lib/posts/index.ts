import { Blog, Prisma } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { prisma } from "../prisma/prisma";

export const getBlogs = async ({
  skip,
  take,
  filterByWhere,
  orderBy,
}: {
  skip?: number;
  take?: number;
  filterByWhere?: Partial<
    Pick<Prisma.BlogWhereInput, "autherId" | "title" | "tags" | "createdAt">
  >;
  orderBy?: Partial<
    Pick<Prisma.BlogOrderByWithRelationInput, "createdAt" | "likes">
  >;
}) => {
  try {
    const blogs = await prisma.blog.findMany({
      skip: skip || 0,
      take: take || 10,
      where: {
        ...filterByWhere,
      },
      orderBy: {
        ...orderBy,
      },
      select: {
        id: true,
        title: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        coverImage: true,
        readTime: true,
        auther: {
          select: {
            username: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          select: {
            name: true,
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
            avatar: true,
          },
        },
        tags: {
          select: {
            name: true,
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
  blogBody: { markdownString?: string; title?: string;  },
  blogId: string,
  tags?: string[]
) => {
  try {
    if (tags && tags.length > 0) {
      const res = await axios.patch(`/api/blog/${blogId}`, {
        ...blogBody,
        tags: tags,
      });
      return;
    }
    const res = await axios.patch(`/api/blog/${blogId}`, {
      ...blogBody,
    });
  } catch (error) {
    throw new Error("unauthorized person");
  }
};
