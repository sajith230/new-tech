"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

import NavMenuIcon from "../icons/NavMenuIcon";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import logo from "@/public/images/logo.png";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

const Navbar = () => {
  const activePath = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<GSAPTimeline>(null);

  const mobileNavOverlayRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavBgRef = useRef<HTMLDivElement>(null);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const calPosition = () => {
        const container = containerRef.current;
        if (!container) return;

        const screenWidth = document.documentElement.clientWidth;
        let containerWidth: number;

        if (screenWidth < 640) containerWidth = screenWidth;
        else if (screenWidth < 768) containerWidth = 640;
        else if (screenWidth < 1024) containerWidth = 768;
        else if (screenWidth < 1280) containerWidth = 1024;
        else if (screenWidth < 1536) containerWidth = 1280;
        else containerWidth = 1536;

        const left = (screenWidth - containerWidth) / 2;
        container.style.left = `${left}px`;
        container.style.width = `${containerWidth}px`;
      };

      calPosition();
      window.addEventListener("resize", calPosition);

      if (!mobileNavOverlayRef.current || !mobileNavBgRef.current) return;

      const tl = gsap
        .timeline({ paused: true })
        .to("#mobile-nav-toggle-icon", {
          morphSVG: "M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001",
          stroke: "var(--color-foreground)",
          strokeWidth: "3",
        })
        .to(
          mobileNavOverlayRef.current,
          {
            opacity: 1,
            ease: "none",
            duration: 0.7,
          },
          "<",
        )
        .to(
          mobileNavBgRef.current,
          {
            clipPath: "circle(120% at 50% 100%)",
            ease: "none",
            duration: 0.7,
          },
          "<",
        )
        .from(".mobile-nav-list-item", {
          opacity: 0,
          yPercent: 100,
          stagger: 0.1,
        });
      timelineRef.current = tl;

      return () => window.removeEventListener("resize", calPosition);
    },
    { scope: containerRef },
  );

  const getActiveLinkClasses = (href: string) => {
    const classes = "text-background dark:text-primary lg:text-primary";

    if (activePath === "/" && href === "/") return classes;
    if (activePath !== "/" && href !== "/" && activePath.includes(href))
      return classes;

    return "hover:text-[#00BDFF]";
  };

  const toggleMobileNav = contextSafe(() => {
    const tl = timelineRef.current;
    const overlay = mobileNavOverlayRef.current;
    const nav = mobileNavRef.current;
    if (!tl || !overlay || !nav) return;

    const navListContainer = nav.querySelector(".mobile-nav-list-container");
    if (!navListContainer) return;

    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("overflow-hidden");

    if (!isMobileNavOpen) {
      overlay.classList.remove("hidden");
      nav.classList.replace("hidden", "flex");
      tl.play().eventCallback("onComplete", () => {
        navListContainer.classList.replace("overflow-hidden", "overflow-auto");
      });
    } else {
      navListContainer.classList.replace("overflow-auto", "overflow-hidden");
      tl.reverse().eventCallback("onReverseComplete", () => {
        overlay.classList.add("hidden");
        nav.classList.replace("flex", "hidden");
      });
    }

    setIsMobileNavOpen((prev) => !prev);
  });

  const closeMobileNav = contextSafe(() => {
    const tl = timelineRef.current;
    const overlay = mobileNavOverlayRef.current;
    const nav = mobileNavRef.current;
    if (!tl || !overlay || !nav) return;

    const navListContainer = nav.querySelector(".mobile-nav-list-container");
    if (!navListContainer) return;

    const htmlElement = document.documentElement;
    htmlElement.classList.remove("overflow-hidden");
    navListContainer.classList.replace("overflow-auto", "overflow-hidden");

    tl.reverse().eventCallback("onReverseComplete", () => {
      overlay.classList.add("hidden");
      nav.classList.replace("flex", "hidden");
    });

    setIsMobileNavOpen((prev) => !prev);
  });

  return (
    <section ref={containerRef} className="fixed top-[1.5em] z-50">
      <div className="px-container container mx-auto">
        <div className="bg-foreground/10 border-foreground/20 flex items-center justify-between rounded-full border px-[1.5em] py-[0.5em] backdrop-blur-sm">
          {/* Logo */}
          <Link
            href="/"
            className="w-[25px] sm:w-[27.5px] md:w-[30px] lg:w-[32.5px] xl:w-[33.75px] 2xl:w-[35px]"
          >
            <Image src={logo} alt="" />
          </Link>

          <DesktopNav getActiveLinkClasses={getActiveLinkClasses} />

          {/* Mobile nav toggle */}
          <button onClick={toggleMobileNav} className="lg:hidden">
            <NavMenuIcon className="w-[25px] sm:w-[27.5px] md:w-[30px]" />
          </button>
        </div>

        <MobileNav
          getActiveLinkClasses={getActiveLinkClasses}
          handleCloseMobileNav={closeMobileNav}
          mobileNavBgRef={mobileNavBgRef}
          mobileNavOverlayRef={mobileNavOverlayRef}
          mobileNavRef={mobileNavRef}
        />
      </div>
    </section>
  );
};

export default Navbar;
