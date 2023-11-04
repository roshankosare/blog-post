import BlogContainer from "@/components/BlogContainer";
import NewSuggetions from "@/components/NewSuggestions";
import Suggested from "@/components/Suggested";
import TagLinks from "@/components/TagLinks";
import { getBlogs } from "@/lib/posts";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
 
  const blogsHomePage = await getBlogs({
    skip: 0,
    take: 10,
  });
  const blogsNewsuggetion = await getBlogs({
    skip: 0,
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className=" w-full lg:max-w-6xl flex  sm:flex-row h-full gap-y-5 gap-x-10 mx-auto flex-col-reverse   ">
      <div className="sm:w-2/3 mx-auto h-screen">
        <BlogContainer blogs={blogsHomePage} />
      </div>
      <div className="flex-col w-full sm:w-1/3 px-2  gap-y-5 flex">
        <div>
          <p className="font-bold text-gray-700">
            Discover what more matter to you
          </p>
          <TagLinks
            tages={[
              "Sports",
              "Programmimng",
              "Entertaintment",
              "Health",
              "Productivity",
              "Books",
              "Technology",
              "Cenema",
              "Gaming",
            ]}
          />
          <NewSuggetions blogs={blogsNewsuggetion} />
        </div>
      </div>
    </main>
  );
}
