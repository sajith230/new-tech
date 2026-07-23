import React from "react";
import Image from "next/image";

import { CartItem } from "@/lib/types";

const OrderItem: React.FC<{ data: CartItem }> = ({ data }) => {
  const { title, productImage, price, attributes, quantity } = { ...data };

  return (
    <div className="flex items-center gap-[1em]">
      <div className="relative">
        <div className="bg-foreground/10 relative h-[5em] w-[4.5em] rounded-[0.3em]">
          <Image
            src={productImage}
            alt={title}
            className="object-contain object-bottom"
            fill
          />
        </div>
        <div className="bg-foreground/50 absolute top-0 right-0 size-[1.7em] translate-x-1/2 -translate-y-1/2 rounded-full text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          <p className="text-background absolute inset-0 m-auto size-fit">
            {quantity}
          </p>
        </div>
      </div>

      <div className="flex grow justify-between">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-foreground/60 mt-[0.3em] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
            {attributes.map(({ selectedVariation }, i) => (
              <span key={selectedVariation}>
                {selectedVariation}
                {i + 1 !== attributes.length && "/"}
              </span>
            ))}
          </p>
        </div>
        <p>Rs {(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
