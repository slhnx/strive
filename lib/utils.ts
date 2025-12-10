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
      progress: {
        one: "bg-red-100",
        three: "bg-red-300",
        five: "bg-red-500",
        seven: "bg-red-700",
      },
    },
    blue: {
      bgColor: "bg-blue-300",
      textColor: "text-blue-900",
      borderColor: "border-blue-900",
      accentColor: "bg-blue-500",
      progress: {
        one: "bg-blue-100",
        three: "bg-blue-300",
        five: "bg-blue-500",
        seven: "bg-blue-700",
      },
    },
    green: {
      bgColor: "bg-green-300",
      textColor: "text-green-900",
      borderColor: "border-green-900",
      accentColor: "bg-green-500",
      progress: {
        one: "bg-green-100",
        three: "bg-green-300",
        five: "bg-green-500",
        seven: "bg-green-700",
      },
    },
    yellow: {
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-900",
      borderColor: "border-yellow-900",
      accentColor: "bg-yellow-400",
      progress: {
        one: "bg-yellow-100",
        three: "bg-yellow-300",
        five: "bg-yellow-500",
        seven: "bg-yellow-700",
      },
    },
    purple: {
      bgColor: "bg-purple-300",
      textColor: "text-purple-900",
      borderColor: "border-purple-900",
      accentColor: "bg-purple-500",
      progress: {
        one: "bg-purple-100",
        three: "bg-purple-300",
        five: "bg-purple-500",
        seven: "bg-purple-700",
      },
    },
    pink: {
      bgColor: "bg-pink-300",
      textColor: "text-pink-900",
      borderColor: "border-pink-900",
      accentColor: "bg-pink-500",
      progress: {
        one: "bg-pink-100",
        three: "bg-pink-300",
        five: "bg-pink-500",
        seven: 'bg-pink-700',
      },
    },
    cyan: {
      bgColor: "bg-cyan-200",
      textColor: "text-cyan-900",
      borderColor: "border-cyan-900",
      accentColor: "bg-cyan-400",
      progress: {
        one: "bg-cyan-100",
        three: "bg-cyan-300",
        five: "bg-cyan-500",
        seven: "bg-cyan-700",
      },
    },
    orange: {
      bgColor: "bg-orange-300",
      textColor: "text-orange-900",
      borderColor: "border-orange-900",
      accentColor: "bg-orange-500",
      progress: {
        one: "bg-orange-100",
        three: "bg-orange-300",
        five: "bg-orange-500",
        seven: "bg-orange-700",
      },
    },
  };

  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
}
