"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { format, addDays, isSameDay } from "date-fns"
import { ja } from "date-fns/locale"
import { Plus, Trash2 } from "lucide-react"

type DaySchedule = {
  enabled: boolean
  startTime: string
  endTime: string
}

type WeekSchedule = {
  [key: string]: DaySchedule
}

type SpecificDateSchedule = {
  date: Date
  enabled: boolean
  startTime: string
  endTime: string
}

export default function SchedulePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("weekly")

  // 曜日ごとのスケジュール
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>({
    monday: { enabled: true, startTime: "09:00", endTime: "17:00" },
    tuesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
    wednesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
    thursday: { enabled: true, startTime: "09:00", endTime: "17:00" },
    friday: { enabled: true, startTime: "09:00", endTime: "17:00" },
    saturday: { enabled: false, startTime: "09:00", endTime: "13:00" },
    sunday: { enabled: false, startTime: "09:00", endTime: "13:00" },
  })

  // 特定の日付のスケジュール
  const [specificDates, setSpecificDates] = useState<SpecificDateSchedule[]>([
    {
      date: addDays(new Date(), 5),
      enabled: true,
      startTime: "10:00",
      endTime: "15:00",
    },
    {
      date: addDays(new Date(), 10),
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
  ])

  // 新しい特定日の設定
  const [newDate, setNewDate] = useState<Date | undefined>(undefined)
  const [newDateEnabled, setNewDateEnabled] = useState(true)
  const [newDateStartTime, setNewDateStartTime] = useState("09:00")
  const [newDateEndTime, setNewDateEndTime] = useState("17:00")

  const handleDayToggle = (day: string) => {
    setWeekSchedule({
      ...weekSchedule,
      [day]: {
        ...weekSchedule[day],
        enabled: !weekSchedule[day].enabled,
      },
    })
  }

  const handleTimeChange = (day: string, field: "startTime" | "endTime", value: string) => {
    setWeekSchedule({
      ...weekSchedule,
      [day]: {
        ...weekSchedule[day],
        [field]: value,
      },
    })
  }

  const handleSpecificDateToggle = (index: number) => {
    const updatedDates = [...specificDates]
    updatedDates[index].enabled = !updatedDates[index].enabled
    setSpecificDates(updatedDates)
  }

  const handleSpecificDateTimeChange = (index: number, field: "startTime" | "endTime", value: string) => {
    const updatedDates = [...specificDates]
    updatedDates[index][field] = value
    setSpecificDates(updatedDates)
  }

  const handleAddSpecificDate = () => {
    if (!newDate) {
      toast({
        title: "エラー",
        description: "日付を選択してください",
        variant: "destructive",
      })
      return
    }

    // 既に同じ日付が存在するかチェック
    const dateExists = specificDates.some((item) => isSameDay(item.date, newDate))
    if (dateExists) {
      toast({
        title: "エラー",
        description: "選択した日付は既に設定されています",
        variant: "destructive",
      })
      return
    }

    setSpecificDates([
      ...specificDates,
      {
        date: newDate,
        enabled: newDateEnabled,
        startTime: newDateStartTime,
        endTime: newDateEndTime,
      },
    ])

    // フォームをリセット
    setNewDate(undefined)
    setNewDateEnabled(true)
    setNewDateStartTime("09:00")
    setNewDateEndTime("17:00")

    toast({
      title: "日付追加",
      description: `${format(newDate, "yyyy年MM月dd日")}の設定を追加しました`,
    })
  }

  const handleRemoveSpecificDate = (index: number) => {
    const updatedDates = [...specificDates]
    updatedDates.splice(index, 1)
    setSpecificDates(updatedDates)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to save the schedule
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "スケジュール更新完了",
        description: "診療時間が正常に更新されました",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "エラー",
        description: "スケジュールの更新中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const days = [
    { id: "monday", label: "月曜日" },
    { id: "tuesday", label: "火曜日" },
    { id: "wednesday", label: "水曜日" },
    { id: "thursday", label: "木曜日" },
    { id: "friday", label: "金曜日" },
    { id: "saturday", label: "土曜日" },
    { id: "sunday", label: "日曜日" },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">診療時間設定</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">曜日ごとの設定</TabsTrigger>
          <TabsTrigger value="specific">特定日の設定</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>曜日ごとの診療時間設定</CardTitle>
              <CardDescription>通常の診療時間を曜日ごとに設定します</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {days.map((day) => (
                  <div key={day.id} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={day.id}
                        checked={weekSchedule[day.id].enabled}
                        onCheckedChange={() => handleDayToggle(day.id)}
                      />
                      <Label htmlFor={day.id} className="w-24">
                        {day.label}
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 flex-1">
                      <Input
                        type="time"
                        value={weekSchedule[day.id].startTime}
                        onChange={(e) => handleTimeChange(day.id, "startTime", e.target.value)}
                        disabled={!weekSchedule[day.id].enabled}
                        className="w-32"
                      />
                      <span>〜</span>
                      <Input
                        type="time"
                        value={weekSchedule[day.id].endTime}
                        onChange={(e) => handleTimeChange(day.id, "endTime", e.target.value)}
                        disabled={!weekSchedule[day.id].enabled}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "保存中..." : "変更を保存"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="specific">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>特定日の診療時間設定</CardTitle>
              <CardDescription>特定の日付の診療時間を個別に設定します</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>日付を選択</Label>
                  <div className="mt-2">
                    <Calendar
                      mode="single"
                      selected={newDate}
                      onSelect={setNewDate}
                      locale={ja}
                      className="border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newDateEnabled" checked={newDateEnabled} onCheckedChange={setNewDateEnabled} />
                      <Label htmlFor="newDateEnabled">診療可能</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      チェックを外すと、この日は診療不可として設定されます
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>診療時間</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={newDateStartTime}
                        onChange={(e) => setNewDateStartTime(e.target.value)}
                        disabled={!newDateEnabled}
                        className="w-32"
                      />
                      <span>〜</span>
                      <Input
                        type="time"
                        value={newDateEndTime}
                        onChange={(e) => setNewDateEndTime(e.target.value)}
                        disabled={!newDateEnabled}
                        className="w-32"
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={handleAddSpecificDate} disabled={!newDate} className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" /> 日付を追加
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>設定済みの特定日</CardTitle>
              <CardDescription>個別に設定された診療日の一覧</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent>
                {specificDates.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">設定された特定日はありません</p>
                ) : (
                  <div className="space-y-4">
                    {specificDates
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((dateItem, index) => (
                        <div key={index} className="flex items-center space-x-4 border-b pb-4">
                          <div className="flex-shrink-0 w-32">
                            <div className="font-medium">{format(dateItem.date, "yyyy年MM月dd日")}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(dateItem.date, "EEEE", { locale: ja })}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`date-${index}`}
                              checked={dateItem.enabled}
                              onCheckedChange={() => handleSpecificDateToggle(index)}
                            />
                            <Label htmlFor={`date-${index}`} className="w-20">
                              {dateItem.enabled ? "診療可能" : "診療不可"}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 flex-1">
                            <Input
                              type="time"
                              value={dateItem.startTime}
                              onChange={(e) => handleSpecificDateTimeChange(index, "startTime", e.target.value)}
                              disabled={!dateItem.enabled}
                              className="w-32"
                            />
                            <span>〜</span>
                            <Input
                              type="time"
                              value={dateItem.endTime}
                              onChange={(e) => handleSpecificDateTimeChange(index, "endTime", e.target.value)}
                              disabled={!dateItem.enabled}
                              className="w-32"
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSpecificDate(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "保存中..." : "変更を保存"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
