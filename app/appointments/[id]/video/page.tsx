"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SimpleVideoChat from "@/components/simple-video-chat"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function VideoAppointmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 実際の実装では、ここでTwilioのトークンを取得します
    const setupVideoRoom = async () => {
      try {
        // デモ用に少し待機
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setLoading(false)
      } catch (err) {
        console.error("Error setting up video:", err)
        setError("ビデオチャットの準備中にエラーが発生しました")
        setLoading(false)
      }
    }

    setupVideoRoom()
  }, [params.id])

  const handleEndCall = () => {
    toast({
      title: "通話終了",
      description: "オンライン診療が終了しました",
    })
    router.push(`/appointments/${params.id}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-semibold mb-4">ビデオチャットを準備中...</div>
        <div className="text-sm text-muted-foreground">安全な接続を確立しています</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-xl font-semibold mb-4 text-red-600">エラーが発生しました</div>
        <div className="text-gray-600 mb-6">{error}</div>
        <Button onClick={() => router.push(`/appointments/${params.id}`)}>予約詳細に戻る</Button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <SimpleVideoChat onEnd={handleEndCall} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-800 mb-2">診療中の注意事項</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>安定したインターネット接続を確保してください</li>
          <li>プライバシーが確保された静かな環境で受診してください</li>
          <li>必要な書類や資料を手元に準備してください</li>
          <li>接続に問題がある場合は、ブラウザを更新するか、別のデバイスを試してください</li>
          <li>診察終了後は必ず「通話終了」ボタンを押して終了してください</li>
        </ul>
      </div>
    </div>
  )
}
