import { db } from "@/lib/db"
import { handleBackendErrors } from "@/utils/handleBackendError"
import { NextResponse } from "next/server"
import { createProductSchema } from "./utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const args = await createProductSchema.parseAsync(body)
    const newProduct = await db.product.create({
      data: {
        description: args.description,
        title: args.title,
      },
    })
    for (const variant of args.variants) {
      await db.productVariant.create({
        data: {
          color: variant.color,
          image: variant.image,
          tone: variant.tone,
          productId: newProduct.id,
        },
      })
    }
    return new NextResponse("success", { status: 200 })
  } catch (error: any) {
    return handleBackendErrors(error)
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        variants: true,
      },
    })
    return Response.json(products, { status: 200 })
  } catch (error: any) {
    return handleBackendErrors(error)
  }
}
