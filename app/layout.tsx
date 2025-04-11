import type React from "react"
import { Inter } from "next/font/google"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "オンライン診療システム",
  description: "美容皮膚科と音楽療法のオンライン診療予約システム",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container flex h-16 items-center justify-between">
                <h1 className="text-xl font-bold">オンライン診療システム</h1>
                <LanguageSwitcher />
              </div>
            </header>
            <main className="container py-6">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'