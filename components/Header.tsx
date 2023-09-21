"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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
    href: "/new-blog",
    label: "Write-Blog",
  },

  {
    href: "/sign-in",
    label: "Sign In",
  },
];

const Header = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-full inset-x-0 z-10 mb-5 top-0 px-5 py-5 flex justify-between items-center bg-white shadow-sm">
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
              className={`hover:text-blue-800  ${
                active ? "font-bold text-blue-800" : ""
              }`}
              key={link.label}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Header;
