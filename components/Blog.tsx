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
    <Card className=" w-full   flex flex-row sm:h-[150px] h-[140px] mx-auto bor">
      
      <div className="flex flex-col h-full w-full  gap-y-1 px-2 py-2">
        <div className="w-full flex flex-row gap-x-3 ">
          <Avatar width={40} hight={40} className="w-6 h-6 sm:w-8 sm:h-8" />
          <p className="text-gray-900 text-xs sm:text-md  my-auto">
            {blog.auther?.username}
          </p>
          <p className="text-gray-600 text-xs my-auto">
            {getDateTimeFormat(blog.createdAt?.toString() || "")}
          </p>
        </div>
        <p className="   font-bold text-sm sm:text:md gray-900 line-clamp-2">
          {blog.title}
        </p>
      </div>
      <div className=" w-[170px] sm:w-[250px] h-full sm:py-2 py-2">
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

export default BlogCard;
