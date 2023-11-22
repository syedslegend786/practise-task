import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from "@/provider/query-client-provider"
import { SheetProvider } from "@/provider/sheet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <Toaster />
          <SheetProvider />
          <Navbar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
