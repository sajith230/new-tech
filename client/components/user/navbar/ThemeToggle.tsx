"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

const ThemeToggle = () => {
  const containerRef = useRef<SVGSVGElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleTheme = contextSafe(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");

    const tl = gsap.timeline({ paused: true }).fromTo(
      "#navbar-theme-icon",
      {
        morphSVG:
          "M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
      },
      {
        duration: 0.3,
        morphSVG:
          "M 4.965 11.986 C 4.965 15.886 8.126 19.047 12.026 19.047 C 15.925 19.047 19.086 15.886 19.086 11.986 C 19.086 8.086 15.926 4.925 12.026 4.925 C 8.126 4.925 4.965 8.086 4.965 11.986 Z M 12.026 -0.017 L 10.04 3.955 L 14.012 3.955 L 12.026 -0.017 Z M 20.51 3.473 L 16.297 4.876 L 19.104 7.685 L 20.51 3.473 Z M 7.755 4.876 L 3.543 3.473 L 4.946 7.686 L 7.755 4.876 Z M 3.965 9.971 L -0.006 11.957 L 3.965 13.942 L 3.965 9.971 Z M 20.028 14.002 L 24 12.016 L 20.028 10.031 L 20.028 14.002 Z M 12.026 23.989 L 14.011 20.017 L 10.039 20.017 L 12.026 23.989 Z M 16.297 19.096 L 20.51 20.499 L 19.105 16.287 L 16.297 19.096 Z M 3.543 20.499 L 7.756 19.096 L 4.947 16.287 L 3.543 20.499 Z",
      },
    );

    if (darkModeEnabled) {
      tl.play();
      document.documentElement.classList.remove("dark");
    } else {
      tl.reverse();
      document.documentElement.classList.add("dark");
    }
  });

  return (
    <button
      className="border-foreground/50 relative h-[1.6em] w-[3.5em] rounded-full border-2 p-[0.1em]"
      onClick={toggleTheme}
    >
      <div className="bg-foreground absolute top-0 bottom-0 left-[0.1em] my-auto size-[1.2em] rounded-full transition-all duration-300 ease-in dark:left-[calc(100%-1.2em-0.1em)]">
        <svg
          ref={containerRef}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 m-auto size-[0.9em]"
        >
          <path
            id="navbar-theme-icon"
            fill="var(--color-background)"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          ></path>
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;
