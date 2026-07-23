import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import TextReveal from "./TextReveal";

import eclipse from "@/public/images/eclipse.svg";
import ImageArea from "./ImageArea";

const Header = () => {
  return (
    <section id="about-page-header" className="pt-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto">
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              About Us
            </p>
            <SectionTitle />
            <p className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              At TECHCD, we believe every Sri Lankan deserves the opportunity to unlock the full potential of technology. Our goal is to inspire creativity, strengthen digital knowledge, and provide access to tools that help individuals build meaningful online income and grow in the digital world. From learning emerging trends to applying real-world tech skills, we bring innovation closer to your everyday life. Together, we aim to build a smarter, more connected, and future-ready community.
            </p>
          </div>

          <ImageArea />
        </div>

        <TextReveal />
      </div>
    </section>
  );
};

export default Header;
