"use client";

import React, { useState } from "react";

import axios from "axios";

import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { CreateCouponData } from "@/lib/types";

type FindCouponProps = {
  loading: boolean;
  error: boolean;
  setCoupon: (value: CreateCouponData | null) => void;
};

const FindCoupon: React.FC<FindCouponProps> = ({
  loading,
  error,
  setCoupon,
}) => {
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  async function applyCoupon() {
    if (!couponCode.trim()) {
      setCouponError("Coupon code cannot be empty.");
      return;
    }
    if (!/^[A-Z0-9]+$/.test(couponCode)) {
      setCouponError("Only uppercase letters, numbers are allowed.");
      return;
    }
    setCouponError("");

    try {
      setCouponLoading(true);
      const res = await api.get(`/coupon/code/${couponCode}`);
      const data = res.data;

      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const now = new Date();

      if (start > now) throw new Error("Coupon is not active yet");
      if (end < now) throw new Error("Coupon has already expired");

      setCoupon({
        title: data.title,
        code: data.code,
        couponType: data.couponType,
        value: data.value,
        startDate: data.startDate,
        endDate: data.endDate,
      });

      toast.success("Coupon applied!");
      setCouponCode("");
    } catch (err: unknown) {
      let errorMessage = "The coupon does not exist";

      if (axios.isAxiosError(err) && err.response?.status === 400) {
        errorMessage = err.response.data.message;
      } else if (axios.isAxiosError(err) && err.response?.status === 404) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setCouponLoading(false);
    }
  }

  if (error || loading) return null;

  return (
    <div className="relative pb-[1.1em]">
      <div className="mt-[1.5em] flex gap-[0.5em]">
        <input
          type="text"
          placeholder="Discount Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          onFocus={() => setCouponError("")}
          className="border-foreground/15 focus:border-foreground/30 placeholder:text-foreground/80 h-[2.5em] grow rounded-[0.5em] border px-[1em] transition-colors focus:outline-none"
        />

        <button
          type="button"
          className="border-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background h-[2.5em] rounded-[0.5em] border px-[1em] transition-all duration-300 ease-in disabled:pointer-events-none disabled:animate-pulse"
          onClick={applyCoupon}
          disabled={couponLoading}
        >
          {couponLoading ? "Applying" : "Apply"}
        </button>
      </div>

      {couponError && (
        <p className="text-destructive absolute bottom-0 left-0 text-[11px] font-light sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          {couponError}
        </p>
      )}
    </div>
  );
};

export default FindCoupon;
