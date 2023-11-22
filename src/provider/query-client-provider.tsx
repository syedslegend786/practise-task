"use client"

import {
  QueryClient,
  QueryClientProvider as QueryClientRoolProvider,
} from "@tanstack/react-query"
import React from "react"

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientRoolProvider client={queryClient}>
      {children}
    </QueryClientRoolProvider>
  )
}
