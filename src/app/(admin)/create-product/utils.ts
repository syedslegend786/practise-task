import * as z from "zod"

export const createProductSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(3, "Minimum length should be 3 characters."),
  description: z
    .string({ required_error: "Description is required." })
    .min(10, "Minimum length should be 10 characters."),

  numberOfColors: z.string().min(1, "Numbers of color is required."),
})

export type TCreateProductSchema = z.infer<typeof createProductSchema>

export type TPallet = {
  shade: string
  images: string[]
}
