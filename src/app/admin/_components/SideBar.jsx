"use client";

import { useSession } from "next-auth/react";
import {
  LayoutGrid,
  ClipboardCopy,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const { data: session } = useSession({ required: false });

  return (
    <div>
      {/* Logo Section */}
      <div className="img-wrapper w-[40%] mx-auto py-[3%] mb-[4%]">
      <Link
            href="/admin"
            className="text-2xl font-playpen-sans font-bold tracking-wider text-primary transition-transform duration-300 hover:scale-105"
          >
            SUMAN
          </Link>
      </div>

      {/* Navigation Links */}
      <Link
        href="/admin"
        className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
      >
        <LayoutGrid />
        <span className="hidden lg:block">Home</span>
      </Link>

      <Link
        href="/admin/blog"
        className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
      >
        <ClipboardCopy />
        <span className="hidden lg:block">Blogs</span>
      </Link>
      <Link
        href="/admin/clients"
        className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
      >
        <ClipboardCopy />
        <span className="hidden lg:block">Clients</span>
      </Link>
      <Link
        href="/admin/category"
        className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
      >
        <ClipboardCopy />
        <span className="hidden lg:block">Category</span>
      </Link>

      {/* Admin-Specific Link */}
      {session?.token?.email === "acharyas186@gmail.com" && (
        <Link
          href="/admin/users"
          className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
        >
          <CircleUserRound />
          <span className="hidden lg:block">Users</span>
        </Link>
      )}

      {/* Logout Link */}
      <Link
        href="/api/auth/signout?callbackUrl=/"
        className="w-full py-3 flex justify-center lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-black hover:text-white"
      >
        <LogOut />
        <span className="hidden lg:block">Logout</span>
      </Link>
    </div>
  );
}
