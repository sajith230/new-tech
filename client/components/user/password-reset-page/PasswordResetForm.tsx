"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyPasswordResetCode } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import api from "@/lib/axios-instance";
import { auth } from "@/lib/firebase";
import { PasswordResetFormSchema, PasswordResetType } from "@/lib/validation";
import PasswordInput from "./PasswordInput";

import eclipse from "@/public/images/eclipse.svg";
import logo from "@/public/images/logo.png";

const PasswordResetForm = () => {
  const params = useSearchParams();
  const oobCode = params.get("oobCode");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PasswordResetType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(PasswordResetFormSchema),
  });

  const onSubmit = async (data: PasswordResetType) => {
    try {
      if (!oobCode) throw new Error("Invalid or missing reset code");
      const email = await verifyPasswordResetCode(auth, oobCode);

      if (!email) throw new Error("Invalid or missing reset code");
      await api.patch(`/user/reset-password/${email}`, {
        newPassword: data.password,
      });

      toast.success("Password reset successful");
      router.push("/sign-in");
    } catch (err: unknown) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err instanceof FirebaseError) {
        errorMessage = err.message;
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-foreground/5 border-foreground/30 mx-auto max-w-[40ch] rounded-[1em] border p-[1.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
        >
          <Image
            src={logo}
            alt="TecHCD logo"
            className="mx-auto mb-[1.5em] size-[5em] object-contain"
          />

          <p className="mb-[0.5em] text-center">Enter new password</p>

          <PasswordInput
            id="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <PasswordInput
            id="confirm-password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="bg-foreground text-background hover:text-primary mt-[0.2em] w-full rounded-[0.5em] px-[1em] py-[0.8em] text-center uppercase transition-colors duration-300 ease-in disabled:pointer-events-none disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "Confirm"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PasswordResetForm;
