"use client"

import { CartSheet } from "@/components/sheets/cart-sheet"
import { useIsMounted } from "@/hooks/useIsMounted"

export function SheetProvider() {
  const { isMounted } = useIsMounted()
  if (!isMounted) {
    return null
  }
  return (
    <>
      <CartSheet />
    </>
  )
}
