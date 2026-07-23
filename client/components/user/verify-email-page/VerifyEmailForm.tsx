"use client";

import React, { useState } from "react";
import Image from "next/image";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios-instance";
import { EmailResetFormSchema, EmailResetType } from "@/lib/validation";
import FormInput from "./FormInput";

import eclipse from "@/public/images/eclipse.svg";
import logo from "@/public/images/logo.png";

const VerifyEmailForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EmailResetType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(EmailResetFormSchema),
  });

  const onSubmit = async (data: EmailResetType) => {
    try {
      await api.post("/user/reset-password", { email: data.email });

      setEmailSent(true);
      toast.success("Reset email sent");
    } catch (err: unknown) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <section className="relative py-[8em]">
      <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
      <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto">
        {emailSent && (
          <div className="bg-foreground/5 border-foreground/30 mx-auto max-w-[40ch] rounded-[1em] border p-[1.5em] text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            <Image
              src={logo}
              alt="TecHCD logo"
              className="mx-auto mb-[1.5em] size-[5em] object-contain"
            />
            <p className="mb-[0.5em] text-[1.5em] font-medium">
              Reset Email Sent
            </p>
            <p>
              If an account exists with this email, we&apos;ve sent a reset
              link. Check your inbox and spam folder.
            </p>
          </div>
        )}

        {!emailSent && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-foreground/5 border-foreground/30 mx-auto max-w-[40ch] rounded-[1em] border p-[1.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
          >
            <Image
              src={logo}
              alt="TecHCD logo"
              className="mx-auto mb-[1.5em] size-[5em] object-contain"
            />

            <p className="mb-[0.5em] text-center">
              Enter your email to continue
            </p>

            <FormInput
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />

            <button
              type="submit"
              className="bg-foreground text-background hover:text-primary w-full rounded-[0.5em] px-[1em] py-[0.8em] text-center uppercase transition-colors duration-300 ease-in disabled:pointer-events-none disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading" : "Proceed"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default VerifyEmailForm;
