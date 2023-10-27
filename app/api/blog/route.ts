import { prisma } from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptionts } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";


import { utapi } from "@/lib/uploadthing";

export async function GET(req: Request) {
  try {
    const blogs = await prisma.blog.findMany();
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
