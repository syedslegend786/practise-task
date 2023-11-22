import { Product, ProductVariant } from "@prisma/client"

export type TProductsWithVariants = Product & {
  variants: ProductVariant[]
}
