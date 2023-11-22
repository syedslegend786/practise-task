"use client"

import { TCartItems, useCart } from "@/hooks/useCart"
import { cn } from "@/lib/utils"
import { Trash } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

export function CartItem({ item }: { item: TCartItems }) {
  const { removeItem } = useCart()
  function handleDeleteItem() {
    removeItem(item.variantId)
  }
  return (
    <div className="p-3 rounded border w-full relative flex gap-3">
      <Button
        onClick={handleDeleteItem}
        variant={"outline"}
        size={"icon"}
        className="absolute -right-3 -top-3 bg-rose-200"
      >
        <Trash className="h-4 w-4 shrink-0 text-rose-500" />
      </Button>
      <div className="w-20 h-20 bg-red-500 rounded relative overflow-hidden">
        <Image src={item.image} fill alt="" className="object-cover" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold line-clamp-1">{item.title}</h3>
        <p className="text-xs font-semibold">Color: {item.color}</p>
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold">Variant:</p>
          <div
            role="button"
            style={{ backgroundColor: item.tone }}
            className={cn(`h-3 w-3 rounded-full`, {
              "ring-2 ring-gray-900 ring-offset-2": true,
            })}
          />
        </div>
      </div>
    </div>
  )
}
