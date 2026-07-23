import type { Metadata } from "next";
import { Tomorrow, Tektur, Oswald } from "next/font/google";

import { Toaster } from "@/components/user/ui/Sonner";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techcd",
  description: "Techcd Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lg:overflow-visible">
      <body
        className={`${tomorrow.variable} ${tektur.variable} ${oswald.variable} text-foreground font-primary bg-background text-[12px] antialiased transition-colors duration-500 sm:text-[14.4px] md:text-[16.8px] lg:text-[20.4px] xl:text-[24px] 2xl:text-[27.6px]`}
      >
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
