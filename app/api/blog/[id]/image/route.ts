import { authOptionts } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma/prisma";
import { utapi } from "@/lib/uploadthing";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptionts);
    console.log(session)
    if (!session?.user)
      return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    const form = await req.formData();
    const image = form.get("image");
    if (!image)
      return NextResponse.json(
        { error: "bad request image not provided" },
        { status: 400 }
      );
    const blogId = params.id;
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog)
      return NextResponse.json({ error: "invalid blog Id" }, { status: 400 });

    if (blog.autherId !== session.user.id)
      return NextResponse.json({ error: "forbidden" }, { status: 403 });

    const url = (await utapi.uploadFiles(image)).data?.url;

    if (!url) {
      throw new Error("internal server error");
    }
    await prisma.blogImages.create({
      data: {
        url: url,
        blogId: blog.id,
      },
    });

    return NextResponse.json({ url: url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
