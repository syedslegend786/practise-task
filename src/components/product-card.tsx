"use client"

import { useCart } from "@/hooks/useCart"
import { TProductsWithVariants } from "@/types"
import { URLS } from "@/utils/URLS"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"

type ProductCardProps = {
  product: TProductsWithVariants
}
export function ProductCard({ product }: ProductCardProps) {
  const { setItems } = useCart()
  const image = product.variants[0].image

  return (
    <Link
      href={URLS.PRODUCT_DETAIL_PAGE(product.id)}
      className="w-full rounded-md overflow-hidden shadow-md"
    >
      <div className="w-full">
        <div className="relative w-full h-28">
          <Image src={image} alt="" className="object-cover" fill />
        </div>
        <div className="px-2 h-28 py-4">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <p className="line-clamp-3 text-sm text-zinc-500">
            {product.description} adsf asd fasdf a asdfasdfasdfas adfasdf adf
            adfa df adfas asdf asdfadfasdf qerqwerqwerqwer qerqwer
          </p>
        </div>
      </div>
    </Link>
  )
}
