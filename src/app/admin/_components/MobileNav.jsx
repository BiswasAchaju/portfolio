"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession({ required: false });

  const handleClose = () => setOpen(false);

  const links = [
    { href: "/admin", label: "Home", icon: LayoutGrid },
    { href: "/api/auth/signout?callbackUrl=/", label: "Logout", icon: LogOut },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="img-wrapper w-[35%] py-[1%] mb-[2%]">
          <Link
            href="/admin"
            className="text-2xl font-playpen-sans font-bold tracking-wider text-primary transition-transform duration-300 hover:scale-105"
          >
            SUMAN
          </Link>
          </div>
        </SheetHeader>
        <div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-full py-3 flex lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-textColor hover:text-white"
              onClick={handleClose}
            >
              <link.icon />
              <span className="lg:block">{link.label}</span>
            </Link>
          ))}

          {session?.token?.email === "acharyas186@gmail.com" && (
            <Link
              href="/admin/users"
              className="w-full py-3 flex lg:justify-start lg:pl-6 gap-4 text-primary font-semibold hover:bg-textColor hover:text-white"
              onClick={handleClose}
            >
              <CircleUserRound />
              <span className="lg:block">Users</span>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
