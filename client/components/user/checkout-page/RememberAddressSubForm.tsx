"use client";

import React from "react";

import { useFormContext } from "react-hook-form";

import { PaymentFormType } from "@/lib/validation";
import { Checkbox } from "../ui/Checkbox";

const RememberAddressSubForm = () => {
  const { register, setValue } = useFormContext<PaymentFormType>();

  return (
    <div className="flex items-center gap-[0.5em]">
      <Checkbox
        id="remember-address-info"
        {...register("remeberAddressInfo")}
        onCheckedChange={(checked) =>
          setValue("remeberAddressInfo", checked === true ? true : false)
        }
      />
      <label
        htmlFor="remember-address-info"
        className="cursor-pointer select-none"
      >
        Remember my address details for future purchases
      </label>
    </div>
  );
};

export default RememberAddressSubForm;
