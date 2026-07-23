"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/user/ui/DropdownMenu";
import { useAuthStore } from "@/store/auth-store";
import { navLinks } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import CartLink from "./CartLink";

const DesktopNav: React.FC<{
  getActiveLinkClasses: (href: string) => string;
}> = ({ getActiveLinkClasses }) => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsDisabled(true);
      toast.info("Signing out...");

      await signOut(auth);
      setUser(null);

      toast.success("Sign out successful");
    } catch {
      toast.error("Sign out failed");
    } finally {
      setIsDisabled(false);
    }
  };

  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <nav className="hidden lg:flex lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <ul className="flex items-center gap-[1.5em]">
          {navLinks.map(({ href, placeholder }) => (
            <li key={href}>
              <Link href={href} className={getActiveLinkClasses(href)}>
                {placeholder}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden lg:flex lg:items-center lg:gap-[1.5em] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <ThemeToggle />

        <div className="text-foreground flex items-center justify-center gap-[0.7em] font-medium">
          {!user && (
            <>
              <Link
                href="/sign-up"
                className="opacity-80 hover:opacity-100 focus:opacity-100"
              >
                <button className="uppercase">Signup</button>
              </Link>

              <div className="via-foreground h-[1.6em] w-[2px] self-stretch bg-gradient-to-b from-transparent to-transparent"></div>

              <Link
                href="/sign-in"
                className="opacity-80 hover:opacity-100 focus:opacity-100"
              >
                <button className="uppercase">Login</button>
              </Link>
            </>
          )}

          <CartLink />

          {user && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="border-foreground relative size-[1.5em] overflow-hidden rounded-full border-2 opacity-80 hover:opacity-100 focus:opacity-100">
                <Image
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  fill
                  className="rounded-full object-contain object-center"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <FaUser />
                  <p>Profile</p>
                </DropdownMenuItem>

                {user.role.name !== "CUSTOMER" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <AiFillDashboard className="text-[1.2em]" />
                    <p>Dashboard</p>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleSignOut} disabled={isDisabled}>
                  <IoLogOut className="text-[1.2em]" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
