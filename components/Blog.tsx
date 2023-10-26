import { Blog } from "@prisma/client";
import Card from "./ui/Card";
import Image from "next/image";
import getDateTimeFormat from "@/lib/getDateTimeFormat";
import Avatar from "./Avatar";

export interface BlogProps {
  blog: Partial<Blog & { auther: { username: string; email: string } }>;
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  return (
    <Card className="w-full min-h-[180px] flex h-[180px] border border-gray-200">
      <Image
        width={400}
        height={350}
        src={blog.coverImage || ""}
        alt="some image"
        className="w-5/12"
      />
      <div className="flex flex-col h-full w-full gap-y-5 px-5 py-2">
        <div className="w-full flex flex-row gap-x-3 ">
          <Avatar width={40} hight={40} />
          <p className="text-gray-600 text-md my-auto">
            {blog.auther?.username}
          </p>
          <p className="my-auto text-gray-600 text-sm">
            {getDateTimeFormat(blog.createdAt?.toString() || "")}
          </p>
        </div>
        <p className="text-xl font-bold gray-900 ">{blog.title}</p>
      </div>
    </Card>
  );
};

export default BlogCard;
