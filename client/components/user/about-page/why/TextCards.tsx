"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cardsData = [
  {
    title: "Local Insight, Global Reach",
    description:
      "We understand the Sri Lankan digital landscape and connect you with global opportunities to grow, earn, and succeed online.",
  },
  {
    title: "Up-to-Date Tech Knowledge",
    description:
      "Stay ahead with the latest tech news, real-time updates, unbiased reviews, and easy-to-follow tutorials designed for everyone.",
  },
  {
    title: "Step-by-Step Earning Guides",
    description:
      "From freelancing to affiliate marketing, we simplify every earning method with clear, beginner-friendly, step-by-step guidance.",
  },
  {
    title: "Strong Community Support",
    description:
      "Join a growing community of learners, creators, and digital entrepreneurs. Learn, share ideas, and grow together with expert support.",
  },
];

const TextCards = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cn = container.current;
      if (!cn) return;

      gsap.from(".about-text-card", {
        duration: 1,
        opacity: 0,
        xPercent: -5,
        filter: "blur(10px)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cn,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-[1em] grid grid-cols-1 gap-[1.5em] lg:grid-cols-2"
    >
      {cardsData.map((card, i) => (
        <div
          key={i}
          className="bg-foreground/10 about-text-card border-foreground/20 rounded-[1em] border px-[1.5em] py-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        >
          <div className="flex items-center gap-[0.5em]">
            <div className="bg-foreground/15 w-[2em] h-[2em] rounded-full flex items-center justify-center">
              <span className="text-[1.2em]">🔹</span>
            </div>
            <p className="text-[1.1em]">{card.title}</p>
          </div>
          <p className="mt-[0.5em] text-[0.9em] font-light">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TextCards;
