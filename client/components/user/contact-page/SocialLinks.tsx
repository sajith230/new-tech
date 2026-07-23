"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const SocialLinks = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const links = container.current?.querySelectorAll("a"); 
      if (!links) return;

      const tween = gsap.from(links, {
        opacity: 0,
        xPercent: -50,
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-[0.5em] flex justify-center gap-[1em] lg:justify-normal"
    >
      <a
        href="https://www.facebook.com/share/187ZafJoZZ/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://www.youtube.com/techcd"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100"
      >
        <FaYoutube />
      </a>

      <a
        href="https://www.tiktok.com/@techcd?_r=1&_t=ZS-944kuTkIxhF"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100"
      >
        <FaTiktok />
      </a>

      <a
        href="https://www.instagram.com/tec_hcd/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border p-[0.5em] opacity-80 hover:opacity-100"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialLinks;