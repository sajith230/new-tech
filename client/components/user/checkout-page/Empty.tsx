import React from "react";
import Link from "next/link";

import { MdProductionQuantityLimits } from "react-icons/md";

const Empty = () => {
  return (
    <div className="bg-foreground/10 border-foreground/30 col-span-full flex h-[200px] flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
      <MdProductionQuantityLimits className="text-[3em]" />
      <p>No Products Selected</p>
      <p className="mt-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
        Please add some products to proceed to checkout.
      </p>
      <Link
        href="/products"
        className="border-foreground hover:bg-foreground hover:text-background mt-[0.5em] rounded-full border-2 px-[1em] py-[0.4em] text-[12px] transition-all duration-300 ease-in sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
      >
        Add Products
      </Link>
    </div>
  );
};

export default Empty;
