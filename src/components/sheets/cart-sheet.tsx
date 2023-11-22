"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/hooks/useCart"
import { Bird } from "lucide-react"
import { CartItem } from "../cart-item"

export function CartSheet() {
  const { isOpenSideBar, toggleSidebar, items } = useCart()
  return (
    <Sheet
      open={isOpenSideBar}
      onOpenChange={() => {
        toggleSidebar()
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {items.length === 0 && (
          <div className="mt-20 flex items-center flex-col justify-center gap-2">
            <Bird className="h-10 w-10 text-rose-500" />
            <p className="text-sm font-semibold text-rose-500">Empty Cart.</p>
          </div>
        )}
        <ScrollArea className=" h-[90%] w-full space-y-4">
          <div className="h-full space-y-4 mr-6 my-6">
            {items.map((item) => (
              // <div>
              <CartItem item={item} key={item.variantId} />
              // </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
