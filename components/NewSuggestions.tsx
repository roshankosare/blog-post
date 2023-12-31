import { Blog } from "@prisma/client";
import Card from "./ui/Card";
import Avatar from "./Avatar";
import getDateTimeFormat from "@/lib/getDateTimeFormat";
import Link from "next/link";

interface NewSuggetionsProps {
  blogs: Partial<
    Pick<
      Blog & { auther: { username: string; email: string; avatar: string } },
      "id" | "title" | "auther" | "createdAt" | "readTime"
    >
  >[];
}

const NewSuggetions: React.FC<NewSuggetionsProps> = ({ blogs }) => {
  return (
    <Card className="flex flex-col   w-full border-0 gap-y-5 px-5 ">
      <p className="font-bold text-gray-600">Recently Added Articles</p>
      <div className="flex flex-col  gap-y-4">
        {blogs.map((blog) => (
          <Link href={`blog/${blog.id}`} key={blog.id}>
            <div className="w-full min-w-full flex flex-col h-18 justify-start gap-y-1  px-1 py-1">
              <div className="flex justify-start gap-x-2">
                <Avatar
                  src={blog.auther?.avatar || "/avatar.png"}
                  width={40}
                  hight={40}
                  className="w-6 h-6"
                ></Avatar>
                <p className="text-xs">{blog.auther?.username}</p>
              </div>
              <p className="text-sm font-bold line-clamp-1 capitalize">{blog.title}</p>
              <div className="flex gap-x-2">
                <p className="text-xs text-gray-600">
                  {blog.readTime + " min read"}
                </p>
                <p className="text-xs text-gray-600">
                  {getDateTimeFormat(blog.createdAt?.toString() || "")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default NewSuggetions;
