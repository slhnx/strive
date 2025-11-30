"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { PropsWithChildren, useState } from "react";
import { makeQueryClient } from "@/trpc/query-client";
import type { AppRouter } from "@/trpc/routers/_app";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  // For server create new client
  if (typeof window === "undefined") return makeQueryClient();
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  // Browser should always use relative URL
  if (typeof window !== "undefined") return "/api/trpc";

  // Vercel deployment (Edge / Server)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/trpc`;
  }

  // If you're deploying somewhere else and have your own domain
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}/api/trpc`;
  }

  // Fallback: local development
  return "http://localhost:3000/api/trpc";
}

export function TRPCProvider(props: PropsWithChildren) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );
}

export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <ClerkProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider>
  );
};
