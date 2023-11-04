import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptionts } from "../../auth/[...nextauth]/route";
import { remark } from "remark";
import html from "remark-html";
import { calculateReadtime } from "@/lib/utils";
import { Blog } from "@prisma/client";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      images: {
        select: {
          url: true,
        },
      },
      tags:{
        select:{
          name:true
        }
      }
    },

  });

  if (!blog) {
    return NextResponse.json({ message: "bad param blog id" }, { status: 400 });
  }
  return NextResponse.json(blog, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptionts);
    if (!session)
      return NextResponse.json({ error: "forbidden " }, { status: 401 });
    const blogId = params.id;
    const body = await req.json();
    const markdown = body.markdownString;
    const title = body.title;
    const tags = body.tags || [];
    const updateBody: Partial<
      Pick<
        Blog,
        "markdownString" | "markdownHTML" | "title" | "readTime" 
      >
    > = {};
    const tagIds = await Promise.all(
      tags.map(async (tagName: string) => {
        const existingTag = await prisma.tag.findFirst({
          where: { name: tagName },
        });

        if (existingTag) {
          return existingTag.id;
        } else {
          const newTag = await prisma.tag.create({
            data: {
              name: tagName,
            },
          });
          return newTag.id;
        }
      })
    );

    if (markdown) {
      updateBody.markdownString = markdown;
      updateBody.markdownHTML = (
        await remark().use(html).process(markdown)
      ).toString();
      updateBody.readTime = calculateReadtime(updateBody.markdownHTML);
    }

   

   
    if (title) updateBody.title = title;

    const blog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        ...updateBody,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
    });
    
    if (!blog)
      return NextResponse.json({ error: "invalid blog id" }, { status: 400 });

    if (blog.autherId !== session.user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptionts);
  if (!session)
    return NextResponse.json({ error: "forbidden " }, { status: 401 });
  const blogId = params.id;

  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    return NextResponse.json({ error: "invalid blog id" }, { status: 400 });
  }
  if (blog.autherId !== session.user.id) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  return NextResponse.json({ message: "blog deleted", blog }, { status: 200 });
}
