"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="mt-[1em] grid grid-cols-2 gap-[1.5em] lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-foreground/10 border-foreground/30 h-[200px] animate-pulse rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
        ></div>
      ))}
    </div>
  );
};

export default Loading;
