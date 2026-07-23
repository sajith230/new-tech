"use client";

import React from "react";

import { useFormContext, useFormState } from "react-hook-form";

import { PaymentFormType } from "@/lib/validation";
import FormInput from "./FormInput";

const DeliverySubForm = () => {
  const { register } = useFormContext<PaymentFormType>();

  const { errors } = useFormState<PaymentFormType>({
    name: [
      "shippingInfo.firstName",
      "shippingInfo.lastName",
      "shippingInfo.address",
      "shippingInfo.apartment",
      "shippingInfo.city",
      "shippingInfo.zip",
      "shippingInfo.tel",
    ],
    exact: true,
  });

  return (
    <>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Delivery
      </p>

      <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
        <FormInput
          type="text"
          id="firstName"
          {...register("shippingInfo.firstName")}
          placeholder="First name"
          error={errors.shippingInfo?.firstName?.message}
        />
        <FormInput
          type="text"
          id="lastName"
          {...register("shippingInfo.lastName")}
          placeholder="Last name"
          error={errors.shippingInfo?.lastName?.message}
        />
      </div>

      <FormInput
        type="text"
        id="address"
        {...register("shippingInfo.address")}
        placeholder="Address"
        error={errors.shippingInfo?.address?.message}
      />

      <FormInput
        type="text"
        id="apartment"
        {...register("shippingInfo.apartment")}
        placeholder="Apartment, suite, etc. (optional)"
        error={errors.shippingInfo?.apartment?.message}
      />

      <FormInput
        type="text"
        id="city"
        {...register("shippingInfo.city")}
        placeholder="City"
        error={errors.shippingInfo?.city?.message}
      />

      <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
        <FormInput
          type="text"
          id="state"
          {...register("shippingInfo.state")}
          placeholder="State/Province"
          error={errors.shippingInfo?.state?.message}
        />
        <FormInput
          type="text"
          id="zip"
          {...register("shippingInfo.zip")}
          placeholder="Postal code"
          error={errors.shippingInfo?.zip?.message}
        />
      </div>

      <FormInput
        type="tel"
        id="tel"
        {...register("shippingInfo.tel")}
        placeholder="Phone"
        error={errors.shippingInfo?.tel?.message}
      />
    </>
  );
};

export default DeliverySubForm;
