"use client";

import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "../../ui/PrimaryButton";
import Steps from "./Steps";
import ComingSoon from "../../ui/ComingSoon";

const Join = () => {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <section className="relative">
      <div className="from-primary absolute top-0 right-0 aspect-square w-2/5 translate-x-1/2 -translate-y-1/3 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mt-[4em]">
        <SectionTitle />
        <p className="text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[24px] 2xl:text-[26px]">
          The TECHCD Forum connects Sri Lankans who are passionate 
          about technology and online earning. Ask questions, share 
          insights, and explore freelancing, e-commerce, content 
          creation, and digital skills — all within a supportive 
          community focused on growing smarter through technology.
        </p>
        <PrimaryButton
          text="Enter Forum"
          onClick={() => setComingSoon(true)}
          className="my-[2em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]"
        />

        <Steps />
      </div>

      <ComingSoon open={comingSoon} onOpenChange={setComingSoon} />
    </section>
  );
};

export default Join;
