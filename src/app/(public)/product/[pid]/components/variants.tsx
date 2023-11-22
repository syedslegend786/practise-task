"use client"

import { cn } from "@/lib/utils"
import { TProductsWithVariants } from "@/types"
import { ProductVariant } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useMemo } from "react"

export function Variants({ data }: { data: TProductsWithVariants }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedVariantId = searchParams.get("variant")
  const variantsData = useMemo(() => {
    let variantMap = {} as Record<string, ProductVariant[]>
    data.variants.forEach((item) => {
      if (variantMap[item.color]) {
        variantMap[item.color] = [...variantMap[item.color], item]
      } else {
        variantMap[item.color] = [item]
      }
    })
    return variantMap
  }, [data.variants])
  function handleSelectVariant(variantId: string) {
    router.push(`${pathname}?variant=${variantId}`)
  }
  console.log({ variantsData })
  return (
    <div>
      {Object.entries(variantsData).map(([key, value], index) => (
        <div key={index}>
          <h3 className="text-sm font-semibold mt-3">Color: {key}</h3>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            {value.map((item) => {
              return (
                <div
                  onClick={() => handleSelectVariant(item.id)}
                  role="button"
                  key={item.id}
                  style={{ backgroundColor: item.tone }}
                  className={cn(`h-5 w-5 rounded-full`, {
                    "ring-2 ring-gray-900 ring-offset-2":
                      item.id === selectedVariantId,
                  })}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
