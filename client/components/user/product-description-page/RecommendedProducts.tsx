"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import api from "@/lib/axios-instance";
import { Product } from "@/lib/types";

import Error from "./Error";
import Loading from "./Loading";
import Empty from "./Empty";
import BrandCarousel from "../home-page/about/BrandCarousel";

const RecommendedProducts = () => {
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
    <section className="relative mt-[2em] mb-[3em]">
      <div className="from-primary absolute right-0 bottom-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container container mx-auto mb-[3em]">
        <p className="text-[15px] font-medium uppercase sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
          YOU MIGHT ALSO LIKE
        </p>

        {error && <Error />}
        {!error && loading && <Loading />}

        {!error && !loading && (
          <>
            {fetchedProducts.length === 0 && <Empty />}
            {fetchedProducts.length > 0 && (
              <div className="mt-[1em] grid grid-cols-2 gap-[1.5em] lg:grid-cols-3">
                {fetchedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-foreground/5 border-foreground/20 relative flex h-[240px] flex-col gap-[0.5em] overflow-hidden rounded-[1em] border p-[1em] text-[13px] font-medium sm:h-[250px] sm:text-[15px] md:h-[300px] md:text-[17px] lg:h-[350px] lg:text-[19px] xl:h-[400px] xl:text-[20px] 2xl:h-[450px] 2xl:text-[21px]"
                  >
                    <p className="relative shrink-0 text-center sm:text-left">
                      {product.title}
                    </p>
                    <div className="relative mx-auto w-4/5 grow">
                      <Image
                        src={product.productImages[0]}
                        alt={product.title}
                        fill
                        className="object-contain object-center"
                      />
                    </div>

                    <div className="relative flex shrink-0 flex-col items-center gap-[0.5em] sm:flex-row sm:justify-between">
                      <div>
                        <div className="line-through">
                          Rs. {product.price.toFixed(2)}
                        </div>
                        <div className="text-primary">
                          Rs. {product.discountPrice.toFixed(2)}
                        </div>
                      </div>
                      <Link href={`/products/${product._id}`}>
                        <button
                          className="border-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background relative rounded-full border-2 px-[2.5em] py-[0.5em] transition-all duration-300 ease-in"
                          tabIndex={0}
                        >
                          Buy
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <BrandCarousel />
    </section>
  );
};

export default RecommendedProducts;
