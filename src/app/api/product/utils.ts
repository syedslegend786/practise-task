import * as z from "zod"

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required"),
  variants: z.array(
    z.object({
      color: z.string(),
      tone: z.string(),
      image: z.string(),
    })
  ),
})
