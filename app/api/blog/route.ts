import { prisma } from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptionts } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { remark } from "remark";
import html from "remark-html";

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
    const markdown = body.get("markdown") as unknown as string;
    const coverImage = body.get("coverImage") as unknown as File;
    const blogImages = body.getAll("blogImages") as unknown as File[];

    let coverImageUrl;

    if (!title || !markdown)
      return NextResponse.json(
        { error: "title or body missing" },
        { status: 400 }
      );
    if (coverImage) {
      coverImageUrl = (await utapi.uploadFiles(coverImage)).data?.url;
    }

    if(blogImages){
      // TOTO:- UPLOAD EACH BLOG IMAGE TO UPLOADTHING AND REPLACE LOCAL BLOG IMAGE URL WITH UPLOADTHING URL
    }

    const processedMarkdown = await remark().use(html).process(markdown);
    const parsedMarkdown = processedMarkdown.toString();

    const blog = await prisma.blog.create({
      data: {
        autherId: session.user.id,
        title: title,
        markdownString: markdown,
        markdownHTML: parsedMarkdown,
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
