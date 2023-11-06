import { Blog } from "@prisma/client";
import Card from "./ui/Card";
import Image from "next/image";
import getDateTimeFormat from "@/lib/getDateTimeFormat";
import Avatar from "./Avatar";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

export interface BlogProps {
  blog: Partial<
    Blog & { auther: { username: string; email: string; avatar: string } } & {
      tags: { name: string }[];
    }
  >;
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  return (
    <Card className=" w-full   flex flex-row sm:h-[150px] h-[140px] border-none rounded-none sm:px-5 px-2">
      <div className="flex flex-col h-full w-full justify-between px-2 py-2">
        <div className="w-full flex flex-row justify-between ">
          <div className=" flex gap-x-3">
            <Avatar
              src={blog.auther?.avatar || "/avatar.png"}
              width={40}
              hight={40}
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <p className="text-gray-900 text-xs sm:text-md font-bold  my-auto">
              {blog.auther?.username}
            </p>
          </div>
          <p className="text-gray-600 text-xs sm:text-md my-auto">
            {getDateTimeFormat(blog.createdAt?.toString() || "")}
          </p>
        </div>
        <p className=" font-extrabold text-md sm:text-xl gray-900 line-clamp-2 capitalize">
          {blog.title}
        </p>
        <div className="flex gap-x-5">
          <p className="text-xs  my-auto text-gray-600">
            {blog.readTime + " min read"}{" "}
          </p>

          {blog.tags?.slice(0, 1).map((tag) => (
            <Badge
              key={tag.name}
              variant={"outline"}
              className="text-xs text-gray-500"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className=" w-[120px] sm:w-[250px] sm:h-full h-[75px] my-auto sm:py-2 py-2">
        <Image
          width={400}
          height={350}
          src={blog.coverImage || ""}
          alt="some image"
          className="w-full h-full justify-center"
        />
      </div>
    </Card>
  );
};

export const BlogSkeleton = () => {
  return (
    <Card className=" w-full   flex flex-row sm:h-[150px] h-[140px] border-none rounded-none sm:px-5 px-2">
      <div className="flex flex-col h-full w-full gap-y-4 px-2 py-2 ">
        <div className="flex flex-row gap-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className=" h-6 w-40 " />
        </div>
        <Skeleton className="w-full h-8"></Skeleton>
      </div>
      <Skeleton className="w-[120px] sm:w-[250px] sm:h-full h-[75px] my-auto sm:py-2 py-2" />
    </Card>
  );
};

export default BlogCard;

