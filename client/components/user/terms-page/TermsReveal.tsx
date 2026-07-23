"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TermsReveal = ({ children }: { children: React.ReactNode }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    gsap.fromTo(
      container.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  return <div ref={container}>{children}</div>;
};

export default TermsReveal;
