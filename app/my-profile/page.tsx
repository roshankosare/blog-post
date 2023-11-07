"use client";

import { DeletePostPopUP } from "@/components/DeletePostPopUp";
import useMyProfile from "../hooks/useMyProfile";
import UserProfile, { UserProfileSkeleton } from "@/components/UserProfile";
import UserBlogs, { UserBlogSkeleton } from "@/components/UserBlogs";
import { Skeleton } from "@/components/ui/skeleton";

interface MyProfilePageProps {}
const MyProfilePage: React.FC<MyProfilePageProps> = ({}) => {
  const {
    blogs,
    profile,
    setSeletedPost,
    showDeletePost,
    setShowDeletePost,
    onDeletePost,
  } = useMyProfile();
  return (
    <>
      {blogs && profile ? (
        <div className="w-full sm:max-w-4xl h-screen flex flex-col gap-y-5 mx-auto sm:px-5 sm:py-5 px-2 py-5  ">
          <UserProfile profile={profile} />
          <p className="text-2xl font-bold text-gray-600">My Articles</p>
          <UserBlogs
            blogs={blogs}
            setSeletedPost={(id: string) => setSeletedPost(id)}
            setShowDeletePost={() => setShowDeletePost(true)}
          />
          <DeletePostPopUP
            open={showDeletePost}
            onPostDelete={onDeletePost}
            onClose={() => {
              setShowDeletePost(false);
              setSeletedPost(null);
            }}
          ></DeletePostPopUP>
        </div>
      ) : (
        <UserProfilePageSkeleton />
      )}
    </>
  );
};

const UserProfilePageSkeleton = () => {
  return (
    <div className="w-full sm:max-w-4xl h-screen flex flex-col gap-y-5 mx-auto sm:px-5 sm:py-5 px-2 py-5  ">
      <UserProfileSkeleton />
      <Skeleton className="w-40 h-12" />
      <UserBlogSkeleton />
    </div>
  );
};

export default MyProfilePage;
