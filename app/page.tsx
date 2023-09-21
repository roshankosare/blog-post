import BlogContainer from "@/components/BlogContainer";
import FeaturedPosts from "@/components/FeaturedPosts";
import NewSuggetions from "@/components/NewSuggestions";
import Suggested from "@/components/Suggested";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-full lg:max-w-7xl flex flex-col h-full gap-y-5 mx-auto ">
      <FeaturedPosts />
      <div className="flex justify-between max-h-[800px] gap-x-10 ">
        <div className="w-2/3">
          <BlogContainer />
        </div>
        <div className="flex flex-col w-1/3 gap-y-10">
          <NewSuggetions />
          <Suggested />
        </div>
      </div>
    </main>
  );
}
