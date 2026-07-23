"use client";

import React from "react";

import { useFormState } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import { CartItem, CreateCouponData } from "@/lib/types";
import { PaymentFormType } from "@/lib/validation";

import OrderItem from "./OrderItem";
import FindCoupon from "./FindCoupon";

type OrderSummaryProps = {
  loading: boolean;
  error: boolean;
  items: CartItem[];
  coupon: CreateCouponData | null;
  shippingFee: number;
  totalPrice: number;
  setCoupon: (value: CreateCouponData | null) => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  loading,
  error,
  items,
  totalPrice,
  shippingFee,
  coupon,
  setCoupon,
}) => {
  const { isSubmitting } = useFormState<PaymentFormType>();

  let discountPrice = 0;

  if (coupon && coupon.couponType === "exact") discountPrice = coupon.value;
  if (coupon && coupon.couponType === "percentage")
    discountPrice = Math.round(totalPrice * (coupon.value / 100));

  return (
    <>
      <div className="flex flex-col gap-[1em]">
        {items.map((i) => {
          const key =
            i._id + i.attributes.map((a) => a.selectedVariation).join();

          return <OrderItem key={key} data={i} />;
        })}
      </div>

      <FindCoupon error={error} loading={loading} setCoupon={setCoupon} />

      <div className="mt-[1em] space-y-[0.8em]">
        <div className="flex justify-between">
          <p>
            Subtotal: {items.reduce((a, b) => a + b.quantity, 0)} item
            {items.reduce((a, b) => a + b.quantity, 0) > 1 && "s"}
          </p>
          <p>Rs {totalPrice.toFixed(2)}</p>
        </div>

        {discountPrice > 0 && (
          <div className="flex items-center justify-between">
            <p>Discount</p>
            <div className="bg-foreground text-background flex items-center gap-[0.5em] rounded-[0.5em] py-[0.2em] ps-[0.5em] pe-[0.2em]">
              <p>Rs {discountPrice.toFixed(2)}</p>
              <button
                type="button"
                className="text-[1.5em] hover:opacity-70 focus:opacity-70"
                onClick={() => setCoupon(null)}
              >
                <IoClose />
              </button>
            </div>
          </div>
        )}

        {!error && !loading && (
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Rs {shippingFee.toFixed(2)}</p>
          </div>
        )}

        {!error && !loading && (
          <div className="mt-[1.5em] flex justify-between">
            <p className="font-medium">Total</p>
            <p>Rs {(totalPrice - discountPrice + shippingFee).toFixed(2)}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-destructive mt-[1.5em] text-[11px] font-light sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          Cannot place orders at this moment. Please try again later.
        </p>
      )}

      {!error && loading && (
        <button
          type="button"
          className="border-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background mt-[1.5em] w-full rounded-[0.5em] border py-[0.5em] transition-all duration-300 ease-in disabled:pointer-events-none disabled:animate-pulse"
          disabled
        >
          Loading...
        </button>
      )}

      {!error && !loading && (
        <button
          type="submit"
          className="border-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background mt-[1.5em] w-full rounded-[0.5em] border py-[0.5em] transition-all duration-300 ease-in disabled:pointer-events-none disabled:animate-pulse"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order" : "Place Order"}
        </button>
      )}
    </>
  );
};

export default OrderSummary;
