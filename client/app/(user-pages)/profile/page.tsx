"use client";

import React from "react";
import Image from "next/image";

import UserRouteGuard from "@/components/UserRouteGuard";
import Header from "@/components/user/profile-page/header/Header";
import FormTabs from "@/components/user/profile-page/form-tabs/FormTabs";
import eclipse from "@/public/images/eclipse.svg";

const ProfilePage = () => {
  return (
    <UserRouteGuard>
      <section className="relative py-[8em]">
        <Image src={eclipse} alt="" className="absolute inset-0 w-full" />
        <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

        <div className="px-container relative container mx-auto">
          <Header />
          <FormTabs />
        </div>
      </section>
    </UserRouteGuard>
  );
};

export default ProfilePage;
