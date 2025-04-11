"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  startAt: string
  status: string
  department: string
  patientName: string
}

export default function AppointmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 実際の実装では、APIから予約情報を取得します
    // ここではデモ用のダミーデータを使用
    const fetchAppointment = async () => {
      try {
        // APIリクエストの代わりにダミーデータを使用
        const dummyAppointment: Appointment = {
          id: params.id,
          startAt: new Date().toISOString(),
          status: "confirmed", // または "pending", "cancelled" など
          department: "美容皮膚科",
          patientName: "山田 太郎",
        }

        setAppointment(dummyAppointment)
      } catch (error) {
        console.error("Error fetching appointment:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointment()
  }, [params.id])

  if (loading) {
    return <div>読み込み中...</div>
  }

  if (!appointment) {
    return <div>予約が見つかりません</div>
  }

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
    }).format(date)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>予約詳細</CardTitle>
          <CardDescription>予約の詳細情報です</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">予約ID</p>
            <p className="text-lg">{appointment.id}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">予約日時</p>
            <p className="text-lg">{formatDate(appointment.startAt)}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">診療科</p>
            <p className="text-lg">{appointment.department}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">患者名</p>
            <p className="text-lg">{appointment.patientName}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">ステータス</p>
            <p className="text-lg">{appointment.status}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {appointment.status === "confirmed" && (
            <Button asChild className="w-full">
              <Link href={`/appointments/${params.id}/video`} className="flex items-center justify-center gap-2">
                <Video className="h-5 w-5" />
                ビデオ診療を開始
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
