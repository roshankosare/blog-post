import { Blog } from "@prisma/client";
import BlogCard, { BlogProps } from "./Blog";
import Card from "./ui/Card";
import { getBlogs } from "@/lib/posts";
import Link from "next/link";

interface BlogContainerProps {}

const BlogContainer: React.FC<BlogContainerProps> = async ({}) => {
  const blogs = await getBlogs();

  return (
    <div className="w-full flex flex-col max-h-full bg-transparent  overflow-y-scroll gap-y-5 no-scrollbar  px-5">
      {blogs.map((blog) => {
        return (
          <Link href={`blog/${blog.id}`} key={blog.id}>
            <BlogCard blog={blog}></BlogCard>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogContainer;
