"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Retro base
const retroBase =
  "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white rounded-none";

// Retro hard shadow
const retroShadow =
  "shadow-[4px_4px_0_0_black] dark:shadow-[4px_4px_0_0_white]";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        retroBase,
        retroShadow,
        "w-full min-h-20 px-3 py-2 text-sm resize-none",

        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
