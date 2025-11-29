"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

// Base background per theme
const baseBg = "bg-white text-black dark:bg-black dark:text-white";

// Hover/Focus uses primary always
const hoverBg = "hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white";
const focusBg = "focus:bg-primary focus:text-white dark:focus:bg-primary dark:focus:text-black";

// Active state uses primary always
const activeBg =
  "data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit items-center justify-center gap-0",
        baseBg,
        "border-2 border-black dark:border-white rounded-none p-0",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        baseBg,
        "px-3 py-1.5 text-sm font-medium cursor-pointer select-none",
        "border border-black dark:border-white rounded-none",
        hoverBg,
        focusBg,
        activeBg,
        "disabled:opacity-50 disabled:pointer-events-none transition-none",
        "whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        baseBg,
        "border-2 border-black dark:border-white rounded-none p-4",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
