"use client";

import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/user/ui/RadioGroup";
import { useFormContext, useFormState } from "react-hook-form";

import { PaymentFormType } from "@/lib/validation";
import FormInput from "./FormInput";

const BillingSubForm = () => {
  const { register, setValue, getValues } = useFormContext<PaymentFormType>();

  const { errors } = useFormState<PaymentFormType>({
    name: [
      "differentBillingAddress",
      "billingInfo.firstName",
      "billingInfo.lastName",
      "billingInfo.address",
      "billingInfo.apartment",
      "billingInfo.city",
      "billingInfo.zip",
      "billingInfo.tel",
    ],
    exact: true,
  });

  return (
    <div>
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Billing Address
      </p>

      <div className="relative pb-[1em]">
        <RadioGroup
          onValueChange={(value) => {
            let bool = true;
            if (value === "same-billing-address") {
              bool = false;
              setValue("billingInfo", undefined);
            }

            setValue("differentBillingAddress", bool, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
          className="mb-0"
          defaultValue={
            getValues("differentBillingAddress") === true
              ? "different-billing-address"
              : undefined
          }
        >
          <div className="not-last:border-b-foreground/15 flex items-center gap-[0.5em] p-[1em] not-last:border-b">
            <RadioGroupItem
              value="same-billing-address"
              id="same-billing-address"
            />
            <label
              htmlFor="same-billing-address"
              className="cursor-pointer select-none"
            >
              Same as shipping address
            </label>
          </div>
          <div className="flex items-center gap-[0.5em] p-[1em]">
            <RadioGroupItem
              value="different-billing-address"
              id="different-billing-address"
            />
            <label
              htmlFor="different-billing-address"
              className="cursor-pointer select-none"
            >
              Use a different billing address
            </label>
          </div>
        </RadioGroup>

        {errors.differentBillingAddress && (
          <p className="text-destructive absolute bottom-0 left-0 mt-[0.2em] text-[0.8em] font-light">
            {errors.differentBillingAddress.message}
          </p>
        )}
      </div>

      {getValues("differentBillingAddress") && (
        <>
          <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
            <FormInput
              type="text"
              id="firstName"
              {...register("billingInfo.firstName")}
              placeholder="First name"
              error={errors.billingInfo?.firstName?.message}
            />
            <FormInput
              type="text"
              id="lastName"
              {...register("billingInfo.lastName")}
              placeholder="Last name"
              error={errors.billingInfo?.lastName?.message}
            />
          </div>

          <FormInput
            type="text"
            id="address"
            {...register("billingInfo.address")}
            placeholder="Address"
            error={errors.billingInfo?.address?.message}
          />

          <FormInput
            type="text"
            id="apartment"
            {...register("billingInfo.apartment")}
            placeholder="Apartment, suite, etc. (optional)"
            error={errors.billingInfo?.apartment?.message}
          />

          <FormInput
            type="text"
            id="city"
            {...register("billingInfo.city")}
            placeholder="City"
            error={errors.billingInfo?.city?.message}
          />

          <div className="col-span-full grid grid-cols-2 gap-[1.5em]">
            <FormInput
              type="text"
              id="state"
              {...register("billingInfo.state")}
              placeholder="State/Province"
              error={errors.billingInfo?.state?.message}
            />
            <FormInput
              type="text"
              id="zip"
              {...register("billingInfo.zip")}
              placeholder="Postal code"
              error={errors.billingInfo?.zip?.message}
            />
          </div>

          <FormInput
            type="tel"
            id="tel"
            {...register("billingInfo.tel")}
            placeholder="Phone"
            error={errors.billingInfo?.tel?.message}
          />
        </>
      )}
    </div>
  );
};

export default BillingSubForm;
