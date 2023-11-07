import { prisma } from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptionts } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

import { utapi } from "@/lib/uploadthing";
import { Blog, Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const autherId = searchParams.get("autherId");
  const tag = searchParams.get("tag");
  const page = parseInt(searchParams.get("page") || "0");
  const blogFilter: Partial<Pick<Prisma.BlogWhereInput, "autherId" | "tags">> =
    {};

  autherId ? (blogFilter.autherId = autherId) : null;
  if (tag) {
    blogFilter.tags = {
      some: {
        name: {
          in: [tag],
        },
      },
    };
  }
  try {
    const blogs = await prisma.blog.findMany({
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
      where: blogFilter,
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

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptionts);
    if (!session) {
      return NextResponse.json({ message: "not authorized!" }, { status: 403 });
    }

    const body = await req.formData();
    const title = body.get("title") as unknown as string;
    const coverImage = body.get("coverImage") as unknown as File;

    let coverImageUrl;

    if (!title)
      return NextResponse.json(
        { error: "title or body missing" },
        { status: 400 }
      );
    if (coverImage) {
      coverImageUrl = (await utapi.uploadFiles(coverImage)).data?.url;
    }

    // const processedMarkdown = await remark()
    //   .use(html)
    //   .process(markdownWithImageLinks);
    // const parsedMarkdown = processedMarkdown.toString();

    const blog = await prisma.blog.create({
      data: {
        autherId: session.user.id,
        title: title,
        markdownString: "",
        markdownHTML: "",
        coverImage: coverImageUrl || "/default-blog-cover.jpg",
      },
    });
    if (blog) {
      return NextResponse.json(blog, { status: 201 });
    }
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
