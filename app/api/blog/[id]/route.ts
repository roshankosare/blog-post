import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { param }: { param: { id: string } }) {
  const id = param.id;
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  if (!blog) {
    return NextResponse.json({ message: "bad param blog id" }, { status: 400 });
  }
  return NextResponse.json(blog, { status: 200 });
}

export async function PUT(req: Request, { param }: { param: { id: string } }) {}
export async function PATCH(
  req: Request,
  { param }: { param: { id: string } }
) {}
export async function DELETE(
  req: Request,
  { param }: { param: { id: string } }
) {}
