import React from "react";
import SectionTitle from "./SectionTitle";
import TextCards from "./TextCards";
import BrandCarousel from "../../home-page/about/BrandCarousel";

const Why = () => {
  return (
    <section className="relative mt-[3em] pb-[3em]">
      <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mb-[3em]">
        <SectionTitle />
        <p className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
          At TECHCD, we’re more than just a tech platform — we’re your digital growth partner. Trusted by thousands across Sri Lanka, we help individuals learn, earn, and grow confidently in the digital world.
        </p>

        <TextCards />
      </div>

      <BrandCarousel />
    </section>
  );
};

export default Why;
