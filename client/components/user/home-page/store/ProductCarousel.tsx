"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Product } from "@/lib/types";

const ProductCarousel: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          pauseOnMouseEnter: true,
        }}
        speed={2000}
        modules={[Autoplay]}
      >
        {products.map((p, i) => (
          <SwiperSlide key={i}>
            <div className="relative mx-auto flex aspect-square w-3/4 flex-col rounded-[1em] bg-[#dfdfdf]/30 p-[1em] text-[12px] backdrop-blur-sm sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] dark:bg-white">
              <div className="text-background font-tertiary flex shrink-0 items-center justify-between font-medium">
                <p>{p.title}</p>
                <p>Rs {p.price}</p>
              </div>

              <div className="relative grow">
                <Image
                  src={p.productImages[0]}
                  alt={p.title}
                  className="object-contain"
                  fill
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
