"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      closeButton
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          success: "bg-green-500 text-white border-2 border-black",
          info: "bg-blue-500 text-white border-2 border-black",
          warning: "bg-yellow-500 text-black border-2 border-black",
          error: "bg-red-500 text-white border-2 border-black",
          loading: "bg-white text-black border-2 border-black",
        },
        className:
          "border-2 border-black dark:border-white rounded-none shadow-[4px_4px_0_0_black] dark:shadow-[4px_4px_0_0_white] font-medium",
        style: { padding: "12px 16px" },
      }}
      style={
        {
          // DEFAULT
          "--normal-bg": "white",
          "--normal-text": "black",
          "--normal-border": "black",

          "--dark-normal-bg": "black",
          "--dark-normal-text": "white",
          "--dark-normal-border": "white",

          // SUCCESS
          "--success-bg": "#C8F7C5",
          "--success-text": "black",
          "--success-border": "black",

          "--dark-success-bg": "#1B3D1F",
          "--dark-success-text": "white",
          "--dark-success-border": "white",

          // INFO
          "--info-bg": "#CBE3FF",
          "--info-text": "black",
          "--info-border": "black",

          "--dark-info-bg": "#052D57",
          "--dark-info-text": "white",
          "--dark-info-border": "white",

          // WARNING
          "--warning-bg": "#FFF3BF",
          "--warning-text": "black",
          "--warning-border": "black",

          "--dark-warning-bg": "#7A5B00",
          "--dark-warning-text": "white",
          "--dark-warning-border": "white",

          // ERROR
          "--error-bg": "#FFD1D1",
          "--error-text": "black",
          "--error-border": "black",

          "--dark-error-bg": "#5A1414",
          "--dark-error-text": "white",
          "--dark-error-border": "white",

          // LOADING
          "--loading-bg": "#EDEDED",
          "--loading-text": "black",
          "--loading-border": "black",

          "--dark-loading-bg": "#333333",
          "--dark-loading-text": "white",
          "--dark-loading-border": "white",

          // Square corners
          "--border-radius": "0px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
