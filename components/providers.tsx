"use client";

import {
  ClerkProvider
} from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ClerkProvider>
  );
};
