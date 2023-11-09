import { authOptionts } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma/prisma";
import { utapi } from "@/lib/uploadthing";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  const session = await getServerSession(authOptionts);
  if (!session) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const blogId = params.id;
  const imageId = params.imageId;


  if (!blogId || !imageId)
    return NextResponse.json({ error: "invalid image Id" }, { status: 400 });

  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    return NextResponse.json({ error: "invalid blog Id" }, { status: 400 });
  }

  if (blog?.autherId !== session.user.id)
    return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const data = await prisma.blogImages.findUnique({
    where: {
      blogId: blogId,
      key: imageId,
    },
  });

  if (!data)
    return NextResponse.json(
      { error: "invlaid blog id or image id" },
      { status: 400 }
    );
  const deleteImageResponse = await utapi.deleteFiles(data.key);

  if (!deleteImageResponse.success) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }

  const deletedImage = await prisma.blogImages.delete({
    where: {
      id: data.id,
    },
  });

  if (!deletedImage) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "deleted image successfully" },
    { status: 200 }
  );
}
