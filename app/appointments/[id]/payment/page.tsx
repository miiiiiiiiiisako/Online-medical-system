"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PayPalPayment } from "@/components/paypal-payment"
import { useToast } from "@/components/ui/use-toast"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentData, setAppointmentData] = useState<any>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // PayPalの初期化オプション
  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "JPY",
    intent: "capture",
  }

  useEffect(() => {
    // 予約情報を取得
    const fetchAppointmentData = async () => {
      try {
        setIsLoading(true)
        // 実際の実装では、APIから予約情報を取得します
        // const response = await fetch(`/api/appointments/${params.id}`);
        // const data = await response.json();

        // デモ用のダミーデータ
        const dummyData = {
          id: params.id,
          department: "美容皮膚科", // または "音楽療法"
          date: "2023-05-15",
          time: "14:00",
          status: "pending",
          patientName: "山田 太郎",
        }

        setAppointmentData(dummyData)
      } catch (err) {
        console.error("Error fetching appointment data:", err)
        setError("予約情報の取得に失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointmentData()
  }, [params.id])

  // 診療科に基づいて料金を決定
  const getAppointmentFee = () => {
    if (!appointmentData) return 0
    return appointmentData.department === "美容皮膚科" ? 2200 : 11000
  }

  const handlePaymentSuccess = async (details: any) => {
    try {
      // 予約ステータスを更新
      const response = await fetch(`/api/appointments/${params.id}/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: details.id,
          paymentStatus: details.status,
          paymentAmount: getAppointmentFee(),
        }),
      })

      if (!response.ok) {
        throw new Error("予約の確定に失敗しました")
      }

      setPaymentCompleted(true)

      toast({
        title: "予約確定",
        description: "支払いが完了し、予約が確定されました",
      })
    } catch (err) {
      console.error("Error confirming appointment:", err)
      setError("予約の確定中にエラーが発生しました")

      // デモ用 - 実際の実装では削除します
      setPaymentCompleted(true)
    }
  }

  const handleContinue = () => {
    router.push(`/appointments/${params.id}`)
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p>予約情報を読み込み中...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">エラーが発生しました</h2>
              <p className="mb-4">{error}</p>
              <Button onClick={() => router.back()}>戻る</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const appointmentFee = getAppointmentFee()

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">診察料のお支払い</h1>

      {paymentCompleted ? (
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">支払いが完了しました</h2>
              <p className="mb-1">診察料 ¥{appointmentFee.toLocaleString()}の支払いが完了しました。</p>
              <p className="mb-4">予約が確定されました。</p>
              <Button onClick={handleContinue}>予約詳細に戻る</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <PayPalScriptProvider options={paypalOptions}>
          <PayPalPayment
            amount={appointmentFee}
            description={`オンライン診療予約 #${params.id} (${appointmentData?.department})`}
            orderId={`appointment-${params.id}`}
            onSuccess={handlePaymentSuccess}
            onCancel={() => router.back()}
            onError={(error) => {
              console.error("Payment error:", error)
              toast({
                title: "支払いエラー",
                description: "支払い処理中にエラーが発生しました。もう一度お試しください。",
                variant: "destructive",
              })
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  )
}
