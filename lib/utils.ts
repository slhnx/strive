import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(clsx(classes));
}

export const colors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-fuchsia-500",
  "bg-red-400",
  "bg-indigo-500",
];
