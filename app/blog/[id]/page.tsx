import Avatar from "@/components/Avatar";
import Card from "@/components/ui/Card";
import getDateTimeFormat from "@/lib/getDateTimeFormat";
import { getBlog } from "@/lib/posts";
import { Blog } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const blogId = params.id;
  if (!blogId) {
    return {
      title: "404 Page not found",
    };
  }

  const blog = await getBlog(blogId);
  if (!blog)
    return {
      title: "404 Page not found",
    };

  return {
    title: blog.title,
  };
}

const BlogInfo: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const blogId = params.id;
  if (!blogId) {
    return <div>Page Not found</div>;
  }
  const blog = await getBlog(blogId);

  if (!blog) {
    return notFound();
  }
  return (
    <Card className="sm:max-w-3xl w-full h-auto flex flex-col mx-auto border-0 py-5 px-10 gap-y-5">
      <div className="flex gap-x-5 py-2 mb-5">
        <Avatar
          src={blog.auther.avatar || "/avatar.png"}
          width={50}
          hight={50}
        />
        <p className="text-lg text-gray-900 my-auto ">{blog.auther.username}</p>
      </div>
      <div className=" w-full text-4xl font-bold">{blog.title}</div>
      <p className="text-md text-gray-600">
        {getDateTimeFormat(blog.createdAt?.toString() || "")}
      </p>
      <Image
        src={blog.coverImage}
        alt="cover image"
        className="w-full h-auto"
        width={600}
        height={400}
      ></Image>

      <div
        className=" prose w-full h-auto "
        dangerouslySetInnerHTML={{ __html: blog.markdownHTML || "" }}
      ></div>
    </Card>
  );
};

export default BlogInfo;
