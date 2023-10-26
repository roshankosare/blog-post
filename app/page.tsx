import BlogContainer from "@/components/BlogContainer";
import FeaturedPosts from "@/components/FeaturedPosts";
import NewSuggetions from "@/components/NewSuggestions";
import Suggested from "@/components/Suggested";

import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptionts } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  return (
    <main className=" w-full lg:max-w-6xl flex flex-col h-full gap-y-5 mx-auto ">
      <div className="flex justify-between max-h-[800px] gap-x-10 ">
        <div className="w-2/3">
          <BlogContainer />
        </div>
      </div>
    </main>
  );
}
