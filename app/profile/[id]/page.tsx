import { getServerSession } from "next-auth";
import { authOptionts } from "../../api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { prisma } from "@/lib/prisma/prisma";
import { getBlogs } from "@/lib/posts";
import { skip } from "node:test";
import { profile } from "console";
import BlogContainer from "@/components/BlogContainer";

interface ProfilePageProps {
  params: { id: string };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const session = await getServerSession(authOptionts);
  if (session?.user.id === params.id) {
    redirect("/my-profile");
  }
  const userProfile = await prisma.userProfile.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!userProfile) {
    return notFound();
  }

  const blogs = await getBlogs({
    skip: 0,
    take: 5,
    filterByWhere: {
      autherId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full sm:max-w-4xl h-screen flex flex-col gap-y-5 mx-auto sm:px-5 sm:py-5 px-2 py-5  ">
      <UserProfile profile={userProfile} />
      <p className="text-2xl font-bold text-gray-600">
        {userProfile.username + " "}Articles
      </p>
      <BlogContainer blogs={blogs} autherId={params.id} />
    </div>
  );
};

export default ProfilePage;
