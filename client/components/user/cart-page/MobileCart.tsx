"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/store/cart-store";
import { MdProductionQuantityLimits } from "react-icons/md";

const MobileCart = () => {
  const cartItems = useCartStore((state) => state.items);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="px-container relative container mx-auto lg:hidden">
      {cartItems.length === 0 && (
        <div className="bg-foreground/10 border-foreground/30 flex h-[200px] flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
          <MdProductionQuantityLimits className="text-[3em]" />
          <p>Your Cart is Empty</p>
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
      )}

      {cartItems.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Product List - Left Panel */}
          <div className="bg-foreground/10 overflow-hidden rounded-[0.6em] p-[1em] lg:col-span-2">
            {/* Product Items */}
            {cartItems.map(
              ({ _id, productImage, title, attributes, price, quantity }) => {
                const key =
                  _id + attributes.map((a) => a.selectedVariation).join();

                return (
                  <div
                    key={key}
                    className="relative flex flex-col gap-[1em] p-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
                  >
                    {/* Product Details */}
                    <div className="flex items-center gap-[1em]">
                      <div className="bg-foreground/10 relative size-[5em] flex-shrink-0 rounded-[0.5em]">
                        <Image
                          src={productImage}
                          alt={title}
                          fill
                          className="object-contain object-bottom"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{title}</h3>
                        <p className="text-foreground/60">
                          {attributes.map(({ selectedVariation }, i) => (
                            <span key={selectedVariation} className="uppercase">
                              {selectedVariation}
                              {i + 1 !== attributes.length && "/"}
                            </span>
                          ))}
                        </p>
                        <button
                          onClick={() => removeItem(_id, attributes)}
                          className="mt-[1em] text-[13px] text-red-400 transition-colors hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span>Price</span>
                      <span>Rs {price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                      <span>Quantity</span>
                      <div className="border-foreground flex items-center rounded border">
                        <button
                          onClick={() => decrementQuantity(_id, attributes)}
                          className="px-2 py-1 transition-opacity duration-300 hover:opacity-80 focus:opacity-80"
                        >
                          -
                        </button>
                        <p className="w-12 border-none bg-transparent text-center focus:outline-none">
                          {quantity}
                        </p>
                        <button
                          onClick={() => incrementQuantity(_id, attributes)}
                          className="px-2 py-1 transition-opacity duration-300 hover:opacity-80 focus:opacity-80"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>Rs {(price * quantity).toFixed(2)}</span>
                    </div>

                    <div className="via-foreground absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
                  </div>
                );
              },
            )}
          </div>

          {/* Cart Totals - Right Panel */}
          <div className="bg-foreground/10 overflow-hidden rounded-[0.6em] p-[1em] lg:col-span-1">
            <h2 className="pb-[1em] text-[17px] font-light uppercase sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px]">
              Cart Totals
            </h2>

            <div className="border-b-foreground/30 flex items-center justify-between border-b-2 pb-[1em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              <span className="text-foreground/80">Subtotal</span>
              <span className="font-semibold">
                Rs {totalPrice().toFixed(2)}
              </span>
            </div>

            <Link href="/checkout">
              <button className="bg-foreground/20 border-foreground hover:bg-foreground/40 focus:bg-foreground/40 mt-[1em] w-full rounded-[0.6em] border px-[2em] py-[0.6em] text-[12px] transition-all duration-300 sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCart;
