import React from "react";
import Link from "next/link";

import { navLinks } from "@/lib/constants";
import logo from "@/public/images/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="relative pb-[3em]">
      <hr className="mx-auto mb-[3em] w-4/5 border-t-[#4F4F4FCC]" />

      <div className="px-container container mx-auto">
        <div className="grid grid-cols-1 gap-[2em] lg:grid-cols-10">
          
          {/* Logo Section */}
          <div className="flex flex-col lg:col-span-4">
            <Image src={logo} alt="TecHCD Logo" className="w-[3em]" />
          </div>

          {/* Links Section */}
          <div className="flex justify-between text-[12px] uppercase sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
            <ul className="space-y-[1em]">
              {navLinks.map(({ href, placeholder }) => (
                <li key={href}>
                  <Link href={href}>{placeholder}</Link>
                </li>
              ))}
            </ul>

            <ul className="space-y-[1em]">
              <li>Facebook</li>
              <li>YouTube</li>
              <li>TikTok</li>
              <li>Instagram</li>
            </ul>

            <ul className="space-y-[1em]">
                <li>
                  <Link href="/terms" className="">Terms of Use</Link>
                </li>
              <li>Privacy Policy</li>
              <li>About Cookies</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-[2em] flex flex-col items-center gap-2 border-t pt-4 text-center text-[11px] text-[#686868] sm:flex-row sm:justify-between sm:text-left sm:text-[12.5px] dark:text-[#BDBDBD]">
          
          {/* Left Side */}
          <p>
            Copyright © {new Date().getFullYear()} TecHCD. All rights reserved.
          </p>

          {/* Right Side */}
          <p>
            Designed by{" "}
            <Link
              href="https://sphiriadigital.com/"
              target="_blank"
              className="font-medium hover:underline"
            >
              Sphiria Digital
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Footer;
