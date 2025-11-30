import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(clsx(classes));
}

export const HABIT_COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "cyan",
  "orange",
];

export function getHabitColor(color: string) {
  const colorMap = {
    red: {
      bgColor: "bg-red-300",
      textColor: "text-red-900",
      borderColor: "border-red-900",
      accentColor: "bg-red-500",
    },
    blue: {
      bgColor: "bg-blue-300",
      textColor: "text-blue-900",
      borderColor: "border-blue-900",
      accentColor: "bg-blue-500",
    },
    green: {
      bgColor: "bg-green-300",
      textColor: "text-green-900",
      borderColor: "border-green-900",
      accentColor: "bg-green-500",
    },
    yellow: {
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-900",
      borderColor: "border-yellow-900",
      accentColor: "bg-yellow-400",
    },
    purple: {
      bgColor: "bg-purple-300",
      textColor: "text-purple-900",
      borderColor: "border-purple-900",
      accentColor: "bg-purple-500",
    },
    pink: {
      bgColor: "bg-pink-300",
      textColor: "text-pink-900",
      borderColor: "border-pink-900",
      accentColor: "bg-pink-500",
    },
    cyan: {
      bgColor: "bg-cyan-200",
      textColor: "text-cyan-900",
      borderColor: "border-cyan-900",
      accentColor: "bg-cyan-400",
    },
    orange: {
      bgColor: "bg-orange-300",
      textColor: "text-orange-900",
      borderColor: "border-orange-900",
      accentColor: "bg-orange-500",
    },
  };

  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
}
