import React from "react";

const LoadingPage = () => {
  return (
    <div className="from-background dark:to-background fixed inset-0 z-[100] flex h-screen flex-col items-center justify-center bg-gradient-to-br to-[#0A2A4A] text-white dark:from-[#0A2A4A]">
      <p className="animate-pulse text-[2em] tracking-wider uppercase">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;
