import React from "react";
import Image from "next/image";

import { FaCheckCircle } from "react-icons/fa";

import RedirectToProfile from "./RedirectToProfile";
import eclipse from "@/public/images/eclipse.svg";

type HeaderProps = { firstName: string };

const Header: React.FC<HeaderProps> = ({ firstName }) => {
  return (
    <section className="relative pt-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />

      <div className="px-container relative container mx-auto flex flex-col items-center text-center text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
        <FaCheckCircle className="text-primary text-[3em]" />
        <p className="mt-[0.5em] font-medium">Thank you {firstName}!</p>
        <p className="text-foreground/70">
          Your order is completed successfully
        </p>

        <RedirectToProfile />
      </div>
    </section>
  );
};

export default Header;
