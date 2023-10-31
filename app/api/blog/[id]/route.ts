import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptionts } from "../../auth/[...nextauth]/route";
import { remark } from "remark";
import html from "remark-html";
import { calculateReadtime } from "@/lib/utils";

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
    if (markdown) {
      body.markdownHTML = (
        await remark().use(html).process(markdown)
      ).toString();
      body.readTime = calculateReadtime(body.markdownHTML);
    }

    const blog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: body,
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
