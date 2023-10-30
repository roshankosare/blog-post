import { utapi } from "@/lib/uploadthing";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptionts } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptionts);
    console.log(session)
    if (!session?.user)
      return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    const form = await req.formData();
    const image = form.get("image");
    console.log(form)

    if (!image)
      return NextResponse.json(
        { error: "bad request image not provided" },
        { status: 400 }
      );
    const url = (await utapi.uploadFiles(image)).data?.url;
    return NextResponse.json({ url: url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
