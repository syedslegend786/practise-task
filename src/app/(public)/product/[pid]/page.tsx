"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"
import { TProductsWithVariants } from "@/types"
import { axios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { Loader, ShoppingCart } from "lucide-react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import React, { useEffect } from "react"
import Slider from "./components/slider"
import { Variants } from "./components/variants"

const SingleProduct = () => {
  const { toast } = useToast()
  const { addItem } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedVariant = searchParams.get("variant")
  const params = useParams()
  const productId = params.pid as string
  const { isLoading, data, error } = useQuery({
    queryKey: ["single-product", productId],
    queryFn: async () => {
      const { data } = await axios.get(`/product/${productId}`)
      return data as TProductsWithVariants
    },
    enabled: !!productId,
  })
  useEffect(() => {
    if (data && data.variants && data.variants.length > 0) {
      if (!selectedVariant) {
        router.push(`${pathname}?variant=${data.variants[0].id}`)
      }
    }
  }, [data, pathname, router, selectedVariant])
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="w-6 h-6 shrink-0 animate-spin" />
      </div>
    )
  }
  if (!data) {
    return <div>No Product found</div>
  }
  function handleAddToCart() {
    if (!selectedVariant) {
      return
    }
    const selected = data?.variants.find((item) => item.id === selectedVariant)
    if (!selected || !data) {
      return
    }

    addItem({
      variantId: selected.id,
      color: selected.color,
      description: data.description,
      image: selected.image,
      productId: data.id,
      inStock: selected.inStock,
      title: data.title,
      tone: selected.tone,
    })
    toast({
      title: "Item added to cart",
    })
  }
  return (
    <div className="grid grid-cols-2 divide-x-2 container mx-auto">
      <div className="p-5">{data && <Slider data={data} />}</div>
      <div className="p-5 ">
        <div className="mt-10 space-y-4">
          <h1 className="text-5xl font-bold">{data?.title}</h1>
          <p className="text-base text-zinc-500">{data?.description}</p>
          <div>
            <Variants data={data} />
          </div>
          <div className="pt-5">
            <Button size={"sm"} onClick={handleAddToCart}>
              Add to cart <ShoppingCart className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
