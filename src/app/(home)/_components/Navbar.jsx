"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToogle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/clients", label: "CLIENTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACTS" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState("/");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleItemClick = (href) => {
    setActiveItem(href);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-playpen-sans font-bold tracking-wider text-primary transition-transform duration-300 hover:scale-105"
          >
            BISWAS
          </Link>

          <div className="flex space-x-10">
            <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleItemClick(item.href)}
                  className={cn(
                    "text-sm font-josefin-sans font-medium transition-colors relative overflow-hidden group",
                    activeItem === item.href
                      ? "text-[#FF014F]"
                      : "hover:text-[#FF014F]"
                  )}
                >
                  <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <VisuallyHidden>
                    <DialogTitle>Navigation Menu</DialogTitle>
                  </VisuallyHidden>
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleItemClick(item.href)}
                        className={cn(
                          "text-sm font-josefin-sans font-medium transition-colors relative overflow-hidden group",
                          activeItem === item.href
                            ? "text-[#FF014F]"
                            : "hover:text-[#FF014F]"
                        )}
                      >
                        <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          {item.label}
                        </span>
                        <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

