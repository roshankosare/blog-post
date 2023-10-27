import BlogContainer from "@/components/BlogContainer";


export default async function Home() {
  return (
    <main className=" w-full lg:max-w-6xl flex flex-col h-full gap-y-5 mx-auto ">
      <div className="flex justify-between max-h-[800px] sm:gap-x-10 ">
        <div className="sm:w-2/3 mx-auto w-full">
          <BlogContainer />
        </div>
      </div>
    </main>
  );
}
