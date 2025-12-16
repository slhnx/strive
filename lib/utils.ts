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
      buttonColor: "bg-red-500",
      buttonHoverColor: "hover:bg-red-600",
      progress: {
        one: "bg-red-100",
        three: "bg-red-300/70",
        five: "bg-red-500/70",
        seven: "bg-red-700",
      },
    },
    blue: {
      bgColor: "bg-blue-300",
      textColor: "text-blue-900",
      borderColor: "border-blue-900",
      accentColor: "bg-blue-500",
      buttonColor: "bg-blue-500",
      buttonHoverColor: "hover:bg-blue-600",
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
      buttonColor: "bg-green-500",
      buttonHoverColor: "hover:bg-green-600",
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
      buttonColor: "bg-yellow-500",
      buttonHoverColor: "hover:bg-yellow-600",
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
      buttonColor: "bg-purple-500",
      buttonHoverColor: "hover:bg-purple-600",
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
      buttonColor: "bg-pink-500",
      buttonHoverColor: "hover:bg-pink-600",
      progress: {
        one: "bg-pink-100",
        three: "bg-pink-300",
        five: "bg-pink-500",
        seven: "bg-pink-700",
      },
    },
    cyan: {
      bgColor: "bg-cyan-200",
      textColor: "text-cyan-900",
      borderColor: "border-cyan-900",
      accentColor: "bg-cyan-400",
      buttonColor: "bg-cyan-400",
      buttonHoverColor: "hover:bg-cyan-600",
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
      buttonColor: "bg-orange-500",
      buttonHoverColor: "hover:bg-orange-600",
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

export const getHabitProgressColor = (
  count: number,
  habitFrequency: number,
  habitColor: string
) => {
  const color = getHabitColor(habitColor);
  if (count === 0) return "bg-white";
  const ratio = count / habitFrequency;
  if (ratio < 0.25) return color.progress.one;
  if (ratio < 0.5) return color.progress.three;
  if (ratio < 0.75) return color.progress.five;
  return color.progress.seven;
};

export const getDescendingDateStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);

    // Normalize to UTC midnight to avoid timezone bugs
    prev.setUTCHours(0, 0, 0, 0);
    curr.setUTCHours(0, 0, 0, 0);

    const diffInDays =
      (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
