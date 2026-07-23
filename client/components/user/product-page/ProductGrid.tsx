"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/types";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-foreground/5 border-foreground/20 relative flex h-[240px] flex-col gap-[0.5em] overflow-hidden rounded-[1em] border p-[1em] font-medium sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
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
              <div className="line-through">Rs. {product.price.toFixed(2)}</div>
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
  );
};

export default ProductGrid;
