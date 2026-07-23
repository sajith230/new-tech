import React from "react";
import Image from "next/image";

import eclipse from "@/public/images/eclipse.svg";

const TitleArea = () => {
  return (
    <section>
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto flex flex-col items-center pt-[8em] text-center lg:items-start lg:text-left">
        <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          Our Products
        </p>

        <div className="mt-[1em] flex flex-col gap-[0.5em] lg:mt-[0.5em] lg:flex-row lg:gap-[1.5em]">
          <h2 className="dark:from-foreground to-foreground bg-gradient-to-b from-[#999999] bg-clip-text text-[26px] font-semibold text-transparent uppercase sm:text-[34px] md:text-[43px] lg:shrink-0 lg:text-[51px] xl:text-[60px] 2xl:text-[68px] dark:to-[#999999]">
            All t shirts. <br />
            All stories.
          </h2>
          <p className="text-foreground/40 mx-auto max-w-9/10 text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:mx-0 lg:mt-[0.5em] lg:max-w-none lg:text-left lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            Discover our exclusive collection of TECHCD tech-inspired T-shirts, designed for developers, creators, gamers, and digital entrepreneurs. Each design reflects innovation, passion, and the digital mindset. Wear your identity. Represent the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TitleArea;
