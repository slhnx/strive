"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Retro base theme
const retroBase =
  "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white rounded-none";

// Hard retro shadow
const retroShadow =
  "shadow-[4px_4px_0_0_black] dark:shadow-[4px_4px_0_0_white]";


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base retro styling
        retroBase,
        retroShadow,
        "h-9 w-full px-3 py-1 text-sm",

        // Remove default browser stuff
        "outline-none transition-all duration-75",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}

export { Input };
