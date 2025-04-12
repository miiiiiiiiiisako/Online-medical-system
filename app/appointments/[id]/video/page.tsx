"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TwilioVideoChat } from "@/components/twilio-video-chat"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function VideoAppointmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState("山田 太郎") // 実際のアプリではユーザー情報から取得

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true)

        // APIからトークンを取得
        const response = await fetch("/api/video-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: userName, // ユーザー名をIDとして使用
            roomName: `appointment-${params.id}`, // 予約IDをルーム名として使用
          }),
        })

        if (!response.ok) {
          throw new Error("トークンの取得に失敗しました")
        }

        const data = await response.json()
        setToken(data.token)
      } catch (err) {
        console.error("Error fetching token:", err)
        setError("ビデオチャットの準備中にエラーが発生しました")

        // デモ用 - 実際の実装では削除します
        // ダミートークンを設定
        setTimeout(() => {
          setToken("dummy_token")
        }, 1000)
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [params.id, userName])

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
        <div className="text-xl font-semibold mb-4">ビデオチャットを準備中...</div>
        <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
      </div>
    )
  }

  if (error || !token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-xl font-semibold mb-4 text-red-600">エラーが発生しました</div>
        <div className="text-gray-600 mb-6">{error || "ビデオチャットを開始できません"}</div>
        <Button onClick={() => router.push(`/appointments/${params.id}`)}>予約詳細に戻る</Button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <TwilioVideoChat 
        roomName={`予約 #${params.id}`} 
        token={token} 
        userName={userName}
        doctorName="佐藤 医師"
        onEnd={handleEndCall} 
      />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-800 mb-2">診療中の注意事項</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>安定したインターネット接続を確保してください</li>
          <li>プライバシーが確保された静かな環境で受診してください</li>
          <li>必要な書類や資料を手元に準備してください</li>
          <li>接続に問題がある場合は、ブラウザを更新するか、別のデバイスを試してください</li>
        </ul>
      </div>
    </div>
  )
}
