import { NextResponse } from "next/server"
import * as z from "zod"
import { handleZodErrors } from "./handleZodErrors"

export function handleBackendErrors(error: Error) {
  if (error instanceof z.ZodError) {
    const zodError = handleZodErrors(error)
    return new NextResponse(zodError, { status: 400 })
  }
  return new NextResponse(error.message, { status: 500 })
}
