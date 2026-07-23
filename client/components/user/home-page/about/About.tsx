import React from "react";

import Title from "./Title";
import TitleLg from "./TitleLg";
import ImageArea from "./ImageArea";

const About = () => {
  return (
    <section className="relative pt-[10vw] lg:pt-0 xl:-mt-[2vw]">
      {/* Gradient (for screens <1024px) */}
      <div className="bg-primary absolute top-1/5 left-0 aspect-square w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] lg:hidden"></div>
      <div className="bg-primary absolute top-3/5 right-0 aspect-square w-3/5 translate-x-1/2 rounded-full blur-[50px] lg:hidden"></div>

      <div className="px-container relative container mx-auto lg:mb-[1.5em] lg:grid lg:grid-cols-11 lg:items-end lg:gap-x-8">
        {/* Title (for screens <1024px) */}
        <Title />

        {/* Image area */}
        <ImageArea />

        {/* Text area */}
        <div className="mt-[1em] mb-[1.5em] flex flex-col items-end text-center text-[21px] sm:text-[21.75px] md:text-[22.5px] lg:col-span-5 lg:text-left lg:text-[23.25px] xl:text-[24px] 2xl:mb-[3em] 2xl:text-[24.75px]">
          {/* Title (for screens >=1024px) */}
          <TitleLg />

          <p className="mb-[1em]">
            TECHCD was created to help Sri Lankans explore smarter ways to earn through technology. We guide people in freelancing, content creation, e-commerce, and digital skills, making online opportunities easier to understand and access.
          </p>

          <p>
            Today, our growing community learns and collaborates through tutorials, updates, and shared experiences. At TECHCD, we aim to inspire a new generation to use digital tools confidently and build stable income in the modern tech world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
