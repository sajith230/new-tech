"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function RedirectToProfile() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) {
      const link = user ? "/profile" : "/";
      router.replace(link);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, router, user]);

  return (
    <>
      <div className="mt-[1em] flex flex-col items-center justify-center gap-[1em] text-center text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        <p className="text-foreground/70">
          You will be redirected to {user ? "your profile" : "home"} in{" "}
          <span className="font-semibold">{countdown}</span> seconds.
        </p>
      </div>
    </>
  );
}
