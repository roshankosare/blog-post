"use client";

import Card from "@/components/ui/Card";
import { Blog, UserProfile } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/Blog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { DeletePostPopUP } from "@/components/DeletePostPopUp";
import { set } from "zod";

interface MyProfilePageProps {}

const MyProfilePage: React.FC<MyProfilePageProps> = ({}) => {
  const session = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [showDeletePost, setShowDeletePost] = useState<boolean>(false);
  const [seletedPost, setSeletedPost] = useState<string | null>(null);
  const [triggerRender, setTriggerRender] = useState<boolean>(false);

  const onDeletePost = async () => {
    if (seletedPost) {
      try {
        await axios.delete(`/api/blog/${seletedPost}`);
        setTriggerRender((pre) => !pre);
        setShowDeletePost(false);
        set;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/sign-in");
    }

    if (session.status === "authenticated") {
      axios
        .get("/api/user/private")
        .then((data) => setProfile(data.data))
        .catch((error) => {
          redirect("/");
        });
    }
  }, [session, setProfile, triggerRender]);

  useEffect(() => {
    if (profile) {
      axios
        .get("/api/blog", {
          params: {
            autherId: profile.id,
          },
        })
        .then((res) => setBlogs(res.data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profile]);
  return (
    <div className="w-full sm:max-w-4xl h-screen flex flex-col gap-y-5 mx-auto sm:px-5 sm:py-5 px-2 py-5  ">
      <Card className="w-full flex flex-row sm:h-48 h-32  border-none sm:gap-x-5 gap-x-2 ">
        <div className="sm:w-32 sm:h-32 w-16 h-16 px-1 py-1">
          {profile ? (
            <Image
              src={profile?.avatar || "/avatar.png"}
              width={300}
              height={400}
              alt="profile"
              className="w-full h-full rounded-full"
            ></Image>
          ) : (
            <Skeleton className="sm:w-32 sm:h-32 w-16 h-16 rounded-full" />
          )}
        </div>
        <div className="flex flex-col  gap-y-2 w-3/4   px-2 sm:px-5 py-1 sm:py-2">
          {profile ? (
            <p className="w-full text-start  font-bold font-gray-600 text-lg sm:text-2xl">
              {profile.username}
            </p>
          ) : (
            <Skeleton className="w-full sm:h-10  h-6" />
          )}

          {profile ? (
            <p className="w-full text-start font-bol font-gray-600 tex-md sm:text-xl">
              {profile.email}
            </p>
          ) : (
            <Skeleton className="w-full sm:h-10  h-6" />
          )}
        </div>
      </Card>
      <p className="text-2xl font-bold text-gray-600">My Articles</p>
      <div className="w-full flex flex-col gap-y-5 ">
        {blogs?.map((blog) => (
          <Card
            key={blog.id}
            className="w-full h-52 sm:h-40  gap-x-5 flex flex-col sm:flex-row border-none"
          >
            <BlogCard blog={blog}></BlogCard>
            <div className="px-2 py-2 flex flex-row sm:flex-col justify-start  gap-x-5 sm:justify-around">
              <Link
                href={`/blog/write/${blog.id}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-16"
                )}
              >
                Edit
              </Link>

              <Button
                onClick={() => {
                  setShowDeletePost(true);
                  setSeletedPost(blog.id);
                }}
                variant={"default"}
                size={"sm"}
                className="w-16"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <DeletePostPopUP
        open={showDeletePost}
        onPostDelete={onDeletePost}
        onClose={() => {
          setShowDeletePost(false);
          setSeletedPost(null);
        }}
      ></DeletePostPopUP>
    </div>
  );
};

export default MyProfilePage;
