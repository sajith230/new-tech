"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { FaRegUser, FaUser } from "react-icons/fa6";
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
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import MobileCartLink from "./MobileCartLink";

type MobileNavProps = {
  getActiveLinkClasses: (href: string) => string;
  handleCloseMobileNav: () => void;
  mobileNavBgRef: React.RefObject<HTMLDivElement | null>;
  mobileNavOverlayRef: React.RefObject<HTMLDivElement | null>;
  mobileNavRef: React.RefObject<HTMLElement | null>;
};

const MobileNav: React.FC<MobileNavProps> = ({
  getActiveLinkClasses,
  handleCloseMobileNav,
  mobileNavBgRef,
  mobileNavOverlayRef,
  mobileNavRef,
}) => {
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
    handleCloseMobileNav();
  };

  return (
    <>
      {/* Mobile nav overlay */}
      <div
        ref={mobileNavOverlayRef}
        className="fixed inset-0 -z-[1] hidden bg-black/30 opacity-0 lg:hidden"
        onClick={handleCloseMobileNav}
      ></div>

      {/* Mobile nav */}
      <nav
        ref={mobileNavRef}
        className="text-foreground fixed right-0 bottom-0 left-0 hidden max-h-[70dvh] overflow-hidden rounded-t-[2em] px-[2em] pt-[1.5em] pb-[3em] text-[20px] sm:text-[21px] md:text-[23px] lg:hidden"
      >
        {/* Gradient bg */}
        <div
          ref={mobileNavBgRef}
          className="bg-background dark:from-background from-background absolute inset-0 -z-[1] bg-gradient-to-bl to-[#0A2A4A]"
          style={{ clipPath: "circle(0% at 50% 100%)" }}
        ></div>

        {/* Nav links */}
        <ul className="flex grow flex-col gap-[2em] pt-[1em]">
          <li className="mobile-nav-list-item flex shrink-0 items-center justify-between">
            <ThemeToggle />

            {/* Sign in/up */}
            <div className="dark:text-primary text-background flex items-center justify-center gap-[1.2em]">
              <MobileCartLink navigate={navigate} />

              {!user && (
                <button
                  className="h-fit opacity-80 hover:opacity-100 focus:opacity-100"
                  onClick={() => navigate("/sign-in")}
                >
                  <FaRegUser className="text-[1.35em]" />
                </button>
              )}

              {user && (
                <DropdownMenu>
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

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      disabled={isDisabled}
                    >
                      <IoLogOut className="text-[1.2em]" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </li>

          <li className="mobile-nav-list-container grow overflow-hidden pr-[8px]">
            <ul className="flex grow flex-col gap-[2em]">
              {navLinks.map(({ href, placeholder }) => (
                <li key={href} className="mobile-nav-list-item">
                  <button
                    onClick={() => navigate(href)}
                    className={cn(
                      "mx-auto block w-fit",
                      getActiveLinkClasses(href),
                    )}
                  >
                    {placeholder}
                  </button>
                  <hr className="border-t-foreground mt-[0.3em] opacity-20" />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
