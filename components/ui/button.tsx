"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import RetroSpinner from "./retro-loader";

const baseBg =
  "bg-primary text-black dark:text-white dark:hover:text-white border border-black dark:border-white rounded-sm";

// Primary highlight (hover/focus/active)
const primaryHover = "hover:bg-primary hover:text-black dark:hover:bg-primary";

const activeBg =
  "data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-black";

// TRUE retro-press shadow
const retroShadow =
  "shadow-[4px_4px_0_0_black] dark:shadow-[4px_4px_0_0_white] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_0_0_black] dark:active:shadow-[0_0_0_0_white] transition-all duration-75 ease-in";

const buttonVariants = cva(
  [
    // Base layout
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-sm",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "outline-none transition-none",

    // Retro theme base + pressed shadow behavior
    baseBg,
    retroShadow,

    // Primary interactions
    primaryHover,
    activeBg,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-400",
        outline:
          "bg-transparent text-black hover:text-black dark:text-white border border-black dark:border-white hover:bg-primary dark:hover:bg-primary dark:hover:text-black",
        secondary:
          "bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-black",
        ghost:
          "bg-transparent border-none hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black shadow-none active:shadow-none active:translate-x-0 active:translate-y-0",
        link: "bg-transparent text-primary underline-offset-4 hover:underline border-none p-0 h-auto shadow-none active:shadow-none active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading ? <RetroSpinner /> : props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
