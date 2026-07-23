"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bg from "@/public/images/home-page/banner/bg.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Banner = () => {
  const container = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const img = imgRef.current;
      if (!img) return;

      const tween = gsap.from(img, {
        duration: 1,
        opacity: 0,
        yPercent: 5,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: img,
          start: "50% 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: imgRef },
  );

  return (
    <div ref={container} className="relative">
      <Image
        ref={imgRef}
        src={bg}
        alt="Banner"
        className="aspect-[2374/665] object-contain object-center"
      />
    </div>
  );
};

export default Banner;
