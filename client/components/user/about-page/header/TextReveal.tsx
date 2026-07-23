"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextReveal = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const trigger = document.querySelector("#about-page-header");
      const heading = headingRef.current;
      if (!trigger || !heading) return;

      const lineSplit = new SplitText(heading, { type: "words" });
      const tween = gsap.from(lineSplit.words, {
        opacity: 0.2,
        filter: "blur(2px)",
        stagger: 0.1,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom 20%",
          scrub: 3,
        },
      });

      return () => tween.kill();
    },
    { scope: headingRef },
  );

  return (
    <div ref={container}>
      <p
        ref={headingRef}
        className="mx-auto mt-[1.5em] mb-[2em] max-w-[40ch] text-center text-[14px] sm:text-[20px] md:text-[27px] lg:text-[33px] xl:text-[40px] 2xl:text-[46px]"
      >
        Digital innovation is opening new opportunities for people across Sri Lanka. 
        At TECHCD, we aim to simplify technology by offering practical insights, guides, 
        and learning resources that help you grow in the online world. Whether you&apos;re 
        exploring digital skills or building new income streams, our mission is to support 
        your journey toward a smarter and more connected future.
      </p>
    </div>
  );
};

export default TextReveal;
