import BlogContainer from "@/components/BlogContainer";
import NewSuggetions from "@/components/NewSuggestions";
import TagLinks from "@/components/TagLinks";
import { getBlogs } from "@/lib/posts";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let blogsHomePage;

  const tag = searchParams["tag"] as unknown as string;

  if (tag) {
    blogsHomePage = await getBlogs({
      skip: 0,
      take: 2,
      filterByWhere: {
        tags: {
          some: {
            name: {
              in: [tag],
            },
          },
        },
      },
    });
  } else {
    blogsHomePage = await getBlogs({
      skip: 0,
      take: 2,
    });
  }

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
        <BlogContainer blogs={blogsHomePage} searchParams={searchParams} />
      </div>
      <div className="flex-col w-full sm:w-1/3 px-2  gap-y-5 flex">
        <div>
          <p className="font-bold text-gray-700">
            Discover what more matter to you
          </p>
          <TagLinks
            tages={[
              "Sports",
              "Programming",
              "Entertainment",
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
