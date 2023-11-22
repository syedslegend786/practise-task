/* eslint-disable @next/next/no-img-element */
"use client"

import { createProductSchema as ProductDTO } from "@/app/api/product/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { axios } from "@/utils/axios"
import { fileToBase64 } from "@/utils/file-to-base64"
import { generateShades } from "@/utils/generateShades"
import { handleApiError } from "@/utils/handleApiError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import { HelpCircle, Loader, PlusCircle, Trash, Upload } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createProductSchema, TCreateProductSchema, TPallet } from "./utils"

const CreateProduct = () => {
  const { toast } = useToast()
  const [loadingStockColors, setloadingStockColors] = useState(false)
  const [backendGeneratedColors, setbackendGeneratedColors] = useState<
    string[]
  >([])
  const [pallete, setpallete] = useState<TPallet[]>([])
  const form = useForm<TCreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      description: "",
      title: "",
      numberOfColors: "0",
    },
  })
  const onSubmit = useCallback(
    async (values: TCreateProductSchema) => {
      let variants: z.infer<typeof ProductDTO>["variants"] = []
      for (let i = 0; i < pallete.length; i++) {
        const current = pallete[i]
        for (let j = 0; j < backendGeneratedColors.length; j++) {
          if (!current.images[j]) {
            continue
          }
          const tone = generateShades(
            backendGeneratedColors[i],
            Number(current.shade)
          )
          variants.push({
            color: backendGeneratedColors[j],
            image: current.images[j],
            tone: tone,
          })
        }
      }
      if (variants.length === 0) {
        return toast({
          title: "Kindly add colors and images",
          variant: "destructive",
        })
      }
      try {
        const dto: z.infer<typeof ProductDTO> = {
          description: values.description,
          title: values.title,
          variants,
        }
        await axios.post(`/product`, dto)
        toast({
          title: "Product created successfully",
        })
        form.reset()
        setpallete([])
        setbackendGeneratedColors([])
      } catch (error) {
        const err = handleApiError(error)
        toast({
          title: err,
          variant: "destructive",
        })
      }
    },
    [backendGeneratedColors, form, pallete, toast]
  )
  const deletePallet = useCallback(
    (index: number) => {
      const newPallet = [...pallete].filter((_, pi) => index !== pi)
      setpallete(newPallet)
    },
    [pallete]
  )
  const handleChangeShade = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
      e.preventDefault()
      const value = e.target.value
      const newPallet = [...pallete].map((item, index) =>
        index === currentIndex ? { ...item, shade: value } : item
      )
      setpallete(newPallet)
    },
    [pallete]
  )
  const handleChangeFile = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      parentIndex: number,
      fileIndex: number
    ) => {
      e.preventDefault()
      if (!e.target.files) {
        return
      }
      try {
        const newPallet = [...pallete]
        let toChange = newPallet[parentIndex]
        const dataUri = await fileToBase64(e.target.files[0])
        toChange.images[fileIndex] = dataUri
        setpallete(newPallet)
      } catch (error) {
        console.error("selecting files:", error)
      }
    },
    [pallete]
  )

  const handleAddition = useCallback(() => {
    let newPallet: TPallet = {
      images: new Array(backendGeneratedColors.length).fill(""),
      shade: "0",
    }
    setpallete((prev) => [...prev, newPallet])
  }, [backendGeneratedColors.length])
  const fetchStockColors = useCallback(
    async (numberOfColors: string) => {
      try {
        setloadingStockColors(true)
        if (Number(numberOfColors) <= 0) {
          setbackendGeneratedColors([])
          return
        }
        const response = await axios(`/colors?numberOfColors=${numberOfColors}`)
        const data = response.data as Color[]
        if (data.length === 0) {
          return toast({
            title: "No stock colors available.",
          })
        }
        const stockColors = data.map((item) => item.name)
        setbackendGeneratedColors(stockColors)
      } catch (error) {
      } finally {
        setloadingStockColors(false)
      }
    },
    [toast]
  )
  const isSubmittingForm = form.formState.isSubmitting
  return (
    <div className="container mx-auto pt-3 pb-20">
      <div>
        <div className="flex items-center">
          <h1 className="text-gray-900 font-bold text-2xl">Add Product</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="ml-3 h-4 w-4 shrink-0 cursor-pointer text-gray-900 hover:text-gray-900/50" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">
                <p className="text-center">
                  Add new product by providing the below information.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-900/70 text-sm">
          When adding products here, do not ignore to fill in all the required
          fields completely and follow the product adding rules.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          {/* heading section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={9} placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <img
                alt=""
                src={"/market.jpeg"}
                className="w-full h-auto object-contain rounded-md"
              />
            </div>
          </div>
          {/* colors section */}
          <div className="mt-10">
            <FormField
              control={form.control}
              name="numberOfColors"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <div className="flex items-center h-5">
                    <FormLabel>Number of colors</FormLabel>
                    {loadingStockColors && (
                      <Loader className="h-4 w-4 ml-2 animate-spin" />
                    )}
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of colors"
                      {...rest}
                      onChange={(e) => {
                        fetchStockColors(e.target.value)
                        onChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ml-72 flex items-center gap-3 flex-wrap my-4">
              {backendGeneratedColors.map((item, index) => (
                <Input
                  className="w-40"
                  style={{ color: item === "white" ? "black" : item }}
                  value={item}
                  key={index}
                />
              ))}
            </div>
            {/* pallet */}
            {pallete.map((item, index) => (
              <div key={index} className="flex items-center mt-5 ">
                <div className="flex items-center w-72 pr-5">
                  <Button
                    type="button"
                    onClick={() => deletePallet(index)}
                    variant={"ghost"}
                    size={"icon"}
                    className="mr-2 shrink-0"
                  >
                    <Trash className="text-rose-500 w-4 h-4 shrink-0" />
                  </Button>
                  <Input
                    value={item.shade}
                    onChange={(e) => handleChangeShade(e, index)}
                    type="number"
                    className=""
                  />
                </div>
                <div className="flex-1 flex items-center flex-wrap gap-3">
                  {item.images.map((file, fileIndex) => (
                    <div key={fileIndex} className="w-40">
                      <Input
                        onChange={(e) => handleChangeFile(e, index, fileIndex)}
                        type="file"
                        className="text-sm"
                      />
                      <div className="w-full h-10 border mt-2 relative">
                        <Image
                          src={file}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              disabled={isSubmittingForm}
              type="button"
              variant={"outline"}
              size={"sm"}
              className="border-gray-900 my-5"
              onClick={handleAddition}
            >
              addition <PlusCircle className="text-gray-900 ml-2 h-4 w-4" />
            </Button>
          </div>
          <Button disabled={isSubmittingForm} className="mt-4" type="submit">
            Submit <Upload className="h-4 w-4 ml-2 shrink-0" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateProduct
