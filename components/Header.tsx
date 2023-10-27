"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

type AuthLink = {
  href: string;
  label: string;
  // icon:ReactNode;
};

const links: AuthLink[] = [
  {
    href: "/",
    label: "Home",
  },

  {
    href: "/blog/create",
    label: "Write-Blog",
  },
];

const Header = ({}) => {
  const singOutHadler = async () => {
    await signOut();
    router.push("/");
  };
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  return (
    <div className="w-full inset-x-0 z-10 mb-5 top-0 px-2 py-3 sm:px-5 sticky sm:py-5 flex justify-between items-center bg-white border-b-[2px] border-black">
      {/* logo */}
      <div className="flex items-center justify-center">
        <Link href="/" className=" text-3xl sm:text-4xl font-bold px-5">
          Medium
        </Link>
      </div>
      <div className="sm:flex flex-row gap-x-10 px-2">
        {session.status === "loading" ? null : session.status ===
          "authenticated" ? (
          <div className="hidden sm:flex gap-x-8">
            <div className="flex gap-x-8 items-center">
              <Link className = {""}href={"/blog/create"}>Write</Link>
              <Link className = {""}href={"/"}>My blogs</Link>
              <Link className = {""}href={"/"}>Profile</Link>
            </div>
            <Button  size={"sm"} onClick={()=>{signOut()}}>Sign Out</Button>
          </div>
        ) : (
          <div>
            <Link  className = {cn(buttonVariants({variant:"default",size:"sm"}),"rounded-full px-5")}href={"/sign-in"}>Get Started</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
