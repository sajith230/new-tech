import React from "react";

import SectionTitle from "./SectionTitle";
import ImageArea from "./ImageArea";
import Banner from "./Banner";

const Story = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto">
        <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
        <SectionTitle className="lg:hidden" />

        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10 lg:items-end">
          <div className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
            <SectionTitle className="mb-[0.5em] hidden lg:flex" />
            <p>
              Every strong vision begins with a simple idea. For us, it was the belief that technology should be understandable and accessible to every Sri Lankan. What started as a small initiative has grown into a platform dedicated to sharing practical digital knowledge, tools, and opportunities for anyone eager to learn and move forward.
            </p>
            <br />
            <p>
              Today, TECHCD connects creators, learners, and entrepreneurs by providing clear guidance on online earning, new technologies, and real digital skills. Our mission is to inspire growth, spark creativity, and help individuals turn their ideas into meaningful opportunities in the digital world.
            </p>
          </div>

          <ImageArea />
        </div>

        <Banner />
      </div>
    </section>
  );
};

export default Story;
