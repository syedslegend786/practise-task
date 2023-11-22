"use client"

import { useCart } from "@/hooks/useCart"
import { URLS } from "@/utils/URLS"
import { Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Navbar() {
  const { items, toggleSidebar } = useCart()
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b">
      <Link href={URLS.HOME}>
        <h1 className="font-bold text-base">Salleh Assessment</h1>
      </Link>
      <div className="flex items-center gap-3">
        <Link href={URLS.CREATE_PRODUCT}>
          <Button>
            Add product <Plus className="h-4 w-4 ml-2 shrink-0" />
          </Button>
        </Link>
        <Button
          onClick={toggleSidebar}
          size={"icon"}
          variant={"outline"}
          className="flex-shrink-0 relative"
        >
          <ShoppingCart className="h-4 w-4 shrink-0" />
          <p className="text-sm font-semibold absolute -right-2 -top-2 bg-rose-500 text-white rounded-full h-5 w-5 text-center">
            {items.length}
          </p>
        </Button>
      </div>
    </div>
  )
}
