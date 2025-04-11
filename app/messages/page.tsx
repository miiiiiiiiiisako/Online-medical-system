"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"

export default function MessagesPage() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">メッセージ</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <ChatInterface doctorName="佐藤 医師" userName="山田 太郎" />
    </div>
  )
}
