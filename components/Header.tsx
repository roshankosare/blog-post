"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { FaCircleUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";

const Header = ({}) => {
  const singOutHadler = async () => {
    await signOut();
    router.push("/");
  };
  const router = useRouter();
  const session = useSession();
  return (
    <div className="w-full inset-x-0 z-10 mb-5 top-0 px-2 py-3 sm:px-5 sticky sm:py-5 flex justify-between items-center bg-white border-b-[2px] border-black">
      {/* logo */}
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className=" text-3xl sm:text-4xl font-bold px-5 flex gap-x-1 items-center"
        >
          <Image
            className=" w-10 h-10 sm:w-10 sm:h-10 rounded-full"
            width={50}
            height={50}
            src={"/logo.png"}
            alt=""
          />
          <p className=""> Blogify</p>
        </Link>
      </div>
      <div className="sm:flex flex-row gap-x-10 px-2">
        {session.status === "loading" ? null : session.status ===
          "authenticated" ? (
          <div>
            <div className="hidden sm:flex gap-x-8">
              <div className="flex gap-x-8 items-center">
                <Link className={""} href={"/blog/create"}>
                  Write
                </Link>
                <Link className={""} href={"/my-profile"}>
                  Profile
                </Link>
              </div>
              <Button
                size={"sm"}
                onClick={() => {
                  singOutHadler();
                }}
              >
                Sign Out
              </Button>
            </div>

            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="text-3xl text-black rounded-full px-1 py-1 border-gray-600 "
                  >
                    <FaCircleUser />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href={"/my-profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/blog/create"}>Write</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        singOutHadler();
                      }}
                    >
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div>
            <Link
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-full px-5"
              )}
              href={"/sign-in"}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
