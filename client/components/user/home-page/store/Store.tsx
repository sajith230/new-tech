"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Title from "./Title";
import TitleLg from "./TitleLg";
import ProductCarousel from "./ProductCarousel";
import PrimaryButton from "../../ui/PrimaryButton";

import { Product } from "@/lib/types";
import api from "@/lib/axios-instance";

import bg from "@/public/images/home-page/store/bg.svg";
import store from "@/public/images/home-page/store/store.png";
import tShirt from "@/public/images/home-page/store/t-shirt.png";

const Store = () => {
  const [loading, setLoading] = useState(true);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/product?status=public&isFeatured=true");
        const data = res.data;

        setFetchedProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative mb-[3em]">
      {/* Square layout */}
      <Image
        src={bg}
        alt="Vector"
        className="absolute inset-0 w-full object-cover object-center"
      />

      <div className="px-container container mx-auto grid grid-cols-1 gap-[1em] lg:grid-cols-11">
        <div className="lg:col-span-6">
          {/* Title (for screens <640px) */}
          <Title />

          <div className="relative mt-[1.5em] aspect-square">
            {/* Leaklight */}
            <div className="to-primary absolute inset-0 mx-auto size-full w-3/5 -translate-x-[10%] bg-gradient-to-br from-transparent from-40% to-40% blur-[20px]"></div>

            {/* Store image */}
            <div className="absolute inset-0 mx-auto w-9/10">
              <Image
                src={store}
                alt="Store"
                className="rotate-y-180 object-contain object-bottom"
                fill
              />
            </div>

            {/* Carousel container */}
            <div className="relative mx-auto flex h-full w-56/100 items-end pb-[2em]">
              {!error && loading && (
                <div className="dark:bg-foreground/30 relative mx-auto aspect-square w-3/4 animate-pulse rounded-[1em] bg-[#dfdfdf]/30 p-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]"></div>
              )}
              {!error && !loading && fetchedProducts.length > 0 && (
                <ProductCarousel products={fetchedProducts} />
              )}

              <svg
                viewBox="0 0 180 322"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute inset-0 z-[1]"
              >
                <path
                  d="M11.0254 1.78613H118.045C123.419 1.78613 127.775 6.14285 127.775 11.5166V48.6123C127.775 54.8816 132.858 59.9638 139.127 59.9639H168.733C174.107 59.9641 178.463 64.3207 178.463 69.6943V311.121C178.463 316.495 174.107 320.85 168.733 320.851H11.0254C5.65177 320.851 1.29514 316.495 1.29492 311.121V11.5166C1.29492 6.14285 5.65164 1.78613 11.0254 1.78613Z"
                  strokeWidth="1.62167"
                  className="dark:stroke-foreground stroke-[#dfdfdf]"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-11 items-end gap-[1em] lg:col-span-5">
          {/* Title (for screens >=640px) */}
          <TitleLg />

          <div className="relative col-span-5 aspect-[10/13]">
            <svg
              viewBox="0 0 140 129"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 bottom-0 left-0 w-full"
            >
              <path
                d="M0.117188 15.8986C0.117188 7.2626 7.11807 0.261719 15.7541 0.261719H90.3086C98.9446 0.261719 105.946 7.2626 105.946 15.8986V24.834C105.946 33.47 112.946 40.4709 121.582 40.4709H124.095C132.731 40.4709 139.732 47.4718 139.732 56.1078V113.071C139.732 121.707 132.732 128.708 124.095 128.708H15.7541C7.11807 128.708 0.117188 121.707 0.117188 113.071V15.8986Z"
                className="dark:fill-foreground fill-[#dfdfdf]"
              />
            </svg>

            <Image
              src={tShirt}
              alt="T Shirt"
              className="object-contain object-bottom"
              fill
            />
          </div>
          <div className="col-span-6">
            <p className="mb-[1em] text-[14px] font-light uppercase sm:text-[16.5px] md:text-[19px] lg:text-[21.5px] xl:text-[24px] 2xl:text-[26.5px]">
              Join the exclusive fan community and grab official merch.
            </p>

            <Link href="/products">
              <PrimaryButton
                text="Shop now"
                className="gap-[1.5em] ps-[3em] text-[12px] sm:text-[14px] md:text-[16px] lg:hidden lg:text-[18px] xl:text-[20px] 2xl:text-[22px]"
                iconStyles="bg-foreground"
              />
            </Link>
          </div>

          <Link href="/products" className="lg:col-span-full">
            <PrimaryButton
              text="Shop now"
              className="hidden gap-[1.5em] ps-[3em] text-[12px] sm:text-[14px] md:text-[16px] lg:flex lg:w-fit lg:text-[18px] xl:text-[20px] 2xl:text-[22px]"
              iconStyles="bg-foreground"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Store;
