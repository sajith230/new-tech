"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/user/ui/Accordion";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const faqData = [
  {
    id: "001",
    title: "Is the TECHCD Forum beginner-friendly?",
    desc: "  Yes. The TECHCD Forum is designed for everyone — whether you're just starting your digital journey or already experienced in freelancing, content creation, or online business. Our community shares step-by-step guidance, practical tips, and real experiences to help beginners grow with confidence.",
  },
  {
    id: "002",
    title: "How do I join the TECHCD Forum?",
    desc: "  Simply create an account using the Sign Up option and complete your profile. Once registered, you can start participating in discussions, asking questions, and connecting with other members immediately.",
  },
  {
    id: "003",
    title: "What topics are discussed in the forum?",
    desc: "  We cover freelancing, affiliate marketing, content creation, e-commerce, digital tools, tech updates, and online income strategies. The goal is to provide practical knowledge that helps Sri Lankans earn smarter through technology.",
  },
];

const Content = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tween = gsap.from(".faq-item", {
        opacity: 0,
        y: "0.5em",
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <Accordion ref={container} type="single" collapsible className="mt-[2.5em]">
      {faqData.map(({ desc, id, title }) => (
        <AccordionItem key={id} value={id} className="faq-item">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
            {desc}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Content;
