import { authOptionts } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptionts);

  if (!session?.user) {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userProfile)
    return NextResponse.json(
      { message: "account does not exists" },
      { status: 400 }
    );

  return NextResponse.json(userProfile, { status: 200 });
}
