"use client"

import { ProductCard } from "@/components/product-card"
import { TProductsWithVariants } from "@/types"
import { axios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import React from "react"

const Home = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["hom-products"],
    queryFn: async () => {
      const { data } = await axios.get("/product")
      return data as TProductsWithVariants[]
    },
  })
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="w-6 h-6 shrink-0 animate-spin" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center font-semibold">
          Something went wrong. Try again later.
        </p>
      </div>
    )
  }
  console.log({ data })
  return (
    <div className="max-w-4xl mx-auto">
      <div className="py-4 grid grid-cols-4 place-items-center gap-6">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
