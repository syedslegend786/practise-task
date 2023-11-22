import { db } from "@/lib/db"
import { handleBackendErrors } from "@/utils/handleBackendError"
import { NextResponse } from "next/server"

type Params = {
  params: {
    productId: string
  }
}
export async function GET(request: Request, { params }: Params) {
  try {
    const dbProduct = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        variants: true,
      },
    })
    return NextResponse.json(dbProduct, { status: 200 })
  } catch (error: any) {
    return handleBackendErrors(error)
  }
}
