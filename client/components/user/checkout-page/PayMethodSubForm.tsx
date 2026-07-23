"use client";

import React from "react";
import Link from "next/link";

import VisaIcon from "../icons/VisaIcon";
import MasterCardIcon from "../icons/MasterCardIcon";

import { useFormContext, useFormState } from "react-hook-form";

import { PaymentSettings } from "@/lib/types";
import { PaymentFormType } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "@/components/user/ui/RadioGroup";

type PayMethodSubFormProps = {
  error: boolean;
  loading: boolean;
  paymentSettings: PaymentSettings;
};

const PayMethodSubForm: React.FC<PayMethodSubFormProps> = ({
  error,
  loading,
  paymentSettings,
}) => {
  const { setValue, getValues } = useFormContext<PaymentFormType>();

  const { errors } = useFormState<PaymentFormType>({
    name: ["paymentMethod"],
    exact: true,
  });

  return (
    <div className="mb-[1em]">
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Payment
      </p>
      <p className="mb-[1em] font-light">
        All transactions are secure and encrypted.
      </p>

      {error && (
        <div className="border-foreground/15 mb-[2em] flex justify-between rounded-[0.5em] border p-[1em]">
          <div>
            <p className="text-destructive">Error</p>
            <p className="text-foreground/40">Failed to Load Payment Details</p>
          </div>
        </div>
      )}

      {!error && loading && (
        <div className="border-foreground/15 mb-[2em] flex animate-pulse justify-between rounded-[0.5em] border p-[1em]">
          <div>
            <p>Loading</p>
            <p className="text-foreground/40">Please wait</p>
          </div>
        </div>
      )}

      {!error && !loading && (
        <>
          <div className="relative pb-[1em]">
            <RadioGroup
              onValueChange={(
                value: "cod" | "card-payment" | "bank-transfer",
              ) => {
                setValue("paymentMethod", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                });
              }}
              className="mb-0"
            >
              {paymentSettings.cod.enabled && (
                <div className="not-last:border-b-foreground/15 p-[1em] not-last:border-b">
                  <div className="flex items-center gap-[0.5em]">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="cursor-pointer select-none">
                      Cash On Delivery
                    </label>
                  </div>
                </div>
              )}

              {paymentSettings.cardPayment.enabled && (
                <div className="not-last:border-b-foreground/15 flex items-center justify-between gap-[0.5em] p-[1em] not-last:border-b">
                  <div className="flex items-center gap-[0.5em]">
                    <RadioGroupItem value="card-payment" id="card-payment" />
                    <label
                      htmlFor="card-payment"
                      className="cursor-pointer select-none"
                    >
                      Card Payment
                    </label>
                  </div>

                  <div className="flex gap-[0.5em]">
                    <VisaIcon className="w-[2em]" />
                    <MasterCardIcon className="w-[2em]" />
                  </div>
                </div>
              )}

              {paymentSettings.bankTransfer.enabled && (
                <div className="not-last:border-b-foreground/15 p-[1em] not-last:border-b">
                  <div className="flex items-center gap-[0.5em]">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <label
                      htmlFor="bank-transfer"
                      className="cursor-pointer select-none"
                    >
                      Bank Transfer
                    </label>
                  </div>
                </div>
              )}
            </RadioGroup>

            {errors.paymentMethod && (
              <p className="text-destructive absolute bottom-0 left-0 mt-[0.2em] text-[0.8em] font-light">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {getValues("paymentMethod") === "bank-transfer" && (
            <>
              {paymentSettings.bankTransfer.availableAccounts.length > 0 && (
                <>
                  <p className="font-light">Available bank accounts</p>
                  <div className="border-foreground/15 mt-[1em] mb-[1em] rounded-[0.5em] border">
                    <div className="border-b-foreground/15 grid grid-cols-4 border-b p-[1em]">
                      <p>Name</p>
                      <p>Account No</p>
                      <p>Bank</p>
                      <p>Branch</p>
                    </div>

                    {paymentSettings.bankTransfer.availableAccounts.map((a) => (
                      <div
                        key={a.accountNumber}
                        className="not-last:border-b-foreground/15 grid grid-cols-4 p-[1em] not-last:border-b"
                      >
                        <p>{a.accountHolderName}</p>
                        <p>{a.accountNumber}</p>
                        <p>{a.bankName}</p>
                        <p>{a.branchName}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <p className="mb-[1em]">
                WhatsApp your payslip to confirm your order :{" "}
                <Link
                  target="_blank"
                  href="https://wa.me/+94717684126"
                  className="text-primary hover:text-foreground focus:text-foreground"
                >
                  +94717684126
                </Link>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PayMethodSubForm;
