"use client";

import React from "react";
import Link from "next/link";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { useCartStore } from "@/store/cart-store";

const CartLink = () => {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <Link
      href="/cart"
      className="relative h-fit opacity-80 hover:opacity-100 focus:opacity-100"
    >
      {totalItems > 0 && (
        <div className="bg-foreground/70 absolute top-0 right-0 size-[1.6em] translate-x-1/2 -translate-y-1/2 rounded-full text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          <p className="text-background absolute inset-0 m-auto size-fit font-light">
            {totalItems}
          </p>
        </div>
      )}
      <LiaShoppingBagSolid className="text-[1.7em]" />
    </Link>
  );
};

export default CartLink;
