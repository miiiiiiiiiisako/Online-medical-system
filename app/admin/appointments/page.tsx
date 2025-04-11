"use client"

import type React from "react"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// ダミー予約データ
const appointments = [
  {
    id: 1,
    patientName: "山田 太郎",
    department: "美容皮膚科",
    date: "2023-04-15",
    time: "10:00",
    status: "pending",
    preferredDates: [
      { date: "2023-04-15", time: "10:00" },
      { date: "2023-04-16", time: "14:00" },
      { date: "2023-04-17", time: "11:00" },
    ],
  },
  {
    id: 2,
    patientName: "佐藤 花子",
    department: "音楽療法",
    date: "2023-04-20",
    time: "15:30",
    status: "confirmed",
    preferredDates: [
      { date: "2023-04-20", time: "15:30" },
      { date: "2023-04-21", time: "16:00" },
      { date: "2023-04-22", time: "14:00" },
    ],
  },
]

export default function AdminAppointmentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "エラー",
        description: "日時を選択してください",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "予約承認",
      description: `${selectedAppointment.patientName}さんの予約を承認しました`,
    })

    setSelectedAppointment(null)
  }

  const handleReject = () => {
    toast({
      title: "予約拒否",
      description: `${selectedAppointment.patientName}さんの予約を拒否しました`,
    })

    setSelectedAppointment(null)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">予約管理</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">承認待ち</TabsTrigger>
          <TabsTrigger value="upcoming">今後の予約</TabsTrigger>
          <TabsTrigger value="past">過去の予約</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>承認待ちの予約</CardTitle>
              <CardDescription>承認または拒否が必要な予約リクエスト</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="患者名、診療科で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>患者名</TableHead>
                    <TableHead>診療科</TableHead>
                    <TableHead>希望日時</TableHead>
                    <TableHead>状態</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments
                    .filter((a) => a.status === "pending")
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}さん</TableCell>
                        <TableCell>{appointment.department}</TableCell>
                        <TableCell>
                          {appointment.preferredDates.map((pref, index) => (
                            <div key={index} className="text-sm">
                              第{index + 1}希望: {pref.date} {pref.time}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            承認待ち
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                            確認
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {selectedAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>予約リクエストの確認</CardTitle>
                      <CardDescription>{selectedAppointment.patientName}さんの予約リクエスト</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium">診療科:</p>
                        <p>{selectedAppointment.department}</p>
                      </div>

                      <div>
                        <p className="font-medium">希望日時:</p>
                        {selectedAppointment.preferredDates.map((pref: any, index: number) => (
                          <div key={index} className="text-sm mt-1">
                            第{index + 1}希望: {pref.date} {pref.time}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label>予約日時を選択</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Select value={selectedDate} onValueChange={setSelectedDate}>
                            <SelectTrigger>
                              <SelectValue placeholder="日付を選択" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedAppointment.preferredDates.map((pref: any, index: number) => (
                                <SelectItem key={index} value={pref.date}>
                                  {pref.date}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="時間を選択" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedAppointment.preferredDates.map((pref: any, index: number) => (
                                <SelectItem key={index} value={pref.time}>
                                  {pref.time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                          キャンセル
                        </Button>
                        <Button variant="destructive" onClick={handleReject}>
                          拒否
                        </Button>
                      </div>
                      <Button onClick={handleApprove}>承認</Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>今後の予約</CardTitle>
              <CardDescription>確定済みの今後の予約</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="患者名、診療科で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>患者名</TableHead>
                    <TableHead>診療科</TableHead>
                    <TableHead>日時</TableHead>
                    <TableHead>状態</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments
                    .filter((a) => a.status === "confirmed")
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}さん</TableCell>
                        <TableCell>{appointment.department}</TableCell>
                        <TableCell>
                          {appointment.date} {appointment.time}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            確定済み
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/appointments/${appointment.id}`)}
                          >
                            詳細
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>過去の予約</CardTitle>
              <CardDescription>完了した過去の予約</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-muted-foreground">過去の予約はありません</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}
