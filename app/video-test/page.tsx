"use client"

import { useRouter } from "next/navigation"
import SimpleVideoChat from "@/components/simple-video-chat"
import { Button } from "@/components/ui/button"

export default function VideoTestPage() {
  const router = useRouter()

  const handleEndCall = () => {
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">ビデオチャットテスト</h1>
      <SimpleVideoChat onEnd={handleEndCall} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-800 mb-2">テスト用ページについて</h3>
        <p className="text-blue-700 text-sm mb-4">
          このページはビデオチャット機能のテスト用です。カメラとマイクへのアクセスを許可すると、
          自分のビデオが表示されます。実際のTwilio統合では、相手のビデオも表示されます。
        </p>
        <Button variant="outline" onClick={handleEndCall} className="w-full">
          テストを終了
        </Button>
      </div>
    </div>
  )
}
