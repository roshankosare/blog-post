import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import BlogCard, { BlogSkeleton } from "./Blog";
import Card from "./ui/Card";
import { type Blog } from "@prisma/client";

interface UserBlogsProps {
  blogs: Blog[];
  setShowDeletePost: () => void;
  setSeletedPost: (id: string) => void;
}

const UserBlogs: React.FC<UserBlogsProps> = ({
  blogs,
  setSeletedPost,
  setShowDeletePost,
}) => {
  return (
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
                setShowDeletePost();
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
  );
};

export const UserBlogSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-y-5 ">
      {[0, 1, 2].map((id) => (
        <Card
          key={id}
          className="w-full h-52 sm:h-40  gap-x-5 flex flex-col sm:flex-row border-none"
        >
          <BlogSkeleton />
        </Card>
      ))}
    </div>
  );
};

export default UserBlogs;
