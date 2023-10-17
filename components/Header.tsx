"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";

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
    <div className="w-full inset-x-0 z-10 mb-5 top-0 px-5 sticky py-5 flex justify-between items-center bg-white shadow-sm">
      {/* logo */}
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold px-5">Medium</p>
      </div>
      <div className="flex flex-row gap-x-10 px-5">
        {links.map((link) => {
          const active =
            (pathname.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;
          return (
            <Link
              className={`hover:text-blue-800 my-auto ${
                active ? "font-bold text-blue-800" : ""
              }`}
              key={link.label}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
        {session.status === "loading" ? null : session.status ===
          "authenticated" ? (
          <Button
            className={buttonVariants({ size: "sm" })}
            onClick={() => singOutHadler()}
          >
            Sign out
          </Button>
        ) : (
          <Link href={"/sign-in"} className={buttonVariants({ size: "sm" })}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
