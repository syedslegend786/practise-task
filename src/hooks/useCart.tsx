import { Product, ProductVariant } from "@prisma/client"
import { create } from "zustand"

export type TCartItems = Omit<Product, "id"> &
  Omit<ProductVariant, "id"> & {
    variantId: string
  }
type Cart = {
  items: TCartItems[]
  addItem: (cartItem: TCartItems) => void
  removeItem: (variantId: string) => void
  isOpenSideBar: boolean
  toggleSidebar: () => void
}
export const useCart = create<Cart>((set, get) => ({
  items: [],
  addItem: (newItem) => {
    const isAlreadyExists = get().items.find(
      (item) => item.variantId === newItem.variantId
    )
    if (isAlreadyExists) {
      return
    }
    set({ items: [...get().items, newItem] })
  },
  removeItem: (variantId: string) => {
    const newItem = get().items.filter((item) => item.variantId !== variantId)
    set({ items: newItem })
  },
  isOpenSideBar: false,
  toggleSidebar: () => set({ isOpenSideBar: !get().isOpenSideBar }),
}))
