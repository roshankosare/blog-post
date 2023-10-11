import { prisma } from "@/lib/prisma/prisma";

import { getServerSession } from "next-auth";
import { authOptionts } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { remark } from "remark";
import html from "remark-html";
import { join } from "path";
import { writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

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

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptionts);
    if (!session) {
      return NextResponse.json({ message: "not authorized!" }, { status: 403 });
    }

    const body = await req.formData();
    const title = body.get("title") as unknown as string;
    const markdown = body.get("markdown") as unknown as string;
    const coverImage = body.get("coverImage") as unknown as File;
    let coverImagePath;
    let relativeImagePath;

    if (!title || !markdown)
      return NextResponse.json(
        { error: "title or body missing" },
        { status: 400 }
      );
    if (coverImage) {
      const dataBuffer = await coverImage.arrayBuffer();
      const buffer = Buffer.from(dataBuffer);
      const filename = `${uuid()}.${coverImage.name.split(".")[1]}`;
      coverImagePath = join("../images", filename);
      await writeFile(coverImagePath, buffer);
    }

    // if (images.length > 0) {
    //   for (let i = 0; i < images.length; i++) {
    //     const dataBuffer = await images[i].arrayBuffer();
    //     const buffer = Buffer.from(dataBuffer);

    //     const path = join("./public/uploads", images[i].name);

    //     await writeFile(path, buffer);
    //   }

    //   for (let i = 0; i < images.length; i++) {
    //     const imageName = images[i].name;
    //     const regexPattern = new RegExp(
    //       `\\[${imageName}\\]\\(blob:http://localhost:3000/[^)]*\\)`,
    //       "g"
    //     );
    //     const replace = markdown.replace(
    //       regexPattern,
    //       `[${imageName}](/uploads/[${images[i].name})`
    //     );
    //     console.log(replace);
    //   }
    // }

    const processedMarkdown = await remark().use(html).process(markdown);
    const parsedMarkdown = processedMarkdown.toString();
    if (coverImagePath) {
      relativeImagePath = coverImagePath
        .replace(/^public\\/, "")
        .replace(/\\/g, "/");
      relativeImagePath = "/" + relativeImagePath;
    }

    const blog = await prisma.blog.create({
      data: {
        autherId: session.user.id,
        title: title,
        markdownString: markdown,
        markdownHTML: parsedMarkdown,
        coverImage: relativeImagePath || "/default-blog-cover.jpg",
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
