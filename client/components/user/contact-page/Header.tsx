import React from "react";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import SocialLinks from "./SocialLinks";

import eclipse from "@/public/images/eclipse.svg";

const Header = () => {
  return (
    <section>
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="px-container relative container mx-auto flex flex-col items-center pt-[8em] text-center lg:items-start lg:text-left">
        <p className="bg-primary text-foreground w-fit rounded-full px-[1em] py-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
          Contact Us
        </p>

        <div className="mt-[1em] grid grid-cols-1 gap-[1.5em] lg:mt-[0.5em] lg:grid-cols-11 lg:gap-0">
          <div className="lg:col-span-6">
            <SectionTitle />
            <SocialLinks />
          </div>

          <p className="text-foreground/40 mx-auto max-w-9/10 text-center text-[12px] uppercase sm:text-[13px] md:text-[15px] lg:col-span-5 lg:mx-0 lg:mt-[0.5em] lg:max-w-none lg:text-left lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            Have questions about our products, services, or community programs? We’re always happy to help. Whether you need technical support, want to explore partnership opportunities, or simply have a general inquiry, the TECHCD team is just a message away. We value every connection and aim to respond promptly with clear, helpful guidance to ensure you get the support you need. Your feedback, ideas, and collaborations help us grow stronger every day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
