import { Blog } from "@prisma/client";
import Card from "./ui/Card";
import Avatar from "./Avatar";

interface NewSuggetionsProps {
  blogs: Partial<
    Pick<
      Blog & { auther: { username: string; email: string; avatar: string } },
      "id" | "title" | "auther" | "createdAt"
    >
  >[];
}

const NewSuggetions: React.FC<NewSuggetionsProps> = ({ blogs }) => {
  return (
    <Card className="flex flex-col h-[400px]  w-full border-0 gap-y-5 px-5 ">
      <p className="font-bold text-gray-600">Recently Added Articles</p>
      <div className="flex flex-col  gap-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="w-full min-w-full flex flex-col h-18 justify-start gap-y-1  px-1 py-1"
          >
            <div className="flex justify-start gap-x-2">
              <Avatar
                src={blog.auther?.avatar || "/avatar.png"}
                width={40}
                hight={40}
                className="w-6 h-6"
              ></Avatar>
              <p className="text-xs">{blog.auther?.username}</p>
            </div>
            <p className="text-sm font-bold line-clamp-1">{blog.title}</p>
            <div className="flex gap-x-2">
              <p className="text-xs text-gray-600">9 min read</p>
              <p className="text-xs text-gray-600">Oct 9</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewSuggetions;
