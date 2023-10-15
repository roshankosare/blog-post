// pages/api/images.js
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextApiRequest } from "next";

import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;

    if (!image) {
      return NextResponse.json(
        { message: "bad request image not provided", success: false },
        { status: 400 }
      );
    }

    const dataBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(dataBuffer);

    const path = join("./public/uploads", image.name);

    await writeFile(path, buffer);

    return NextResponse.json(
      {
        message: "image uploaded successfully",
        publicUrl: `uploads/${image.name}`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error", success: false },
      { status: 500 }
    );
  }
}

// pages/api/images/[imageId].j

