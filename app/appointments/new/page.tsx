"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function NewAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [department, setDepartment] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Preferred dates
  const [date1, setDate1] = useState("")
  const [time1, setTime1] = useState("")
  const [date2, setDate2] = useState("")
  const [time2, setTime2] = useState("")
  const [date3, setDate3] = useState("")
  const [time3, setTime3] = useState("")

  // Questionnaire
  const [symptoms, setSymptoms] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [medications, setMedications] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to submit the appointment request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "予約リクエスト送信完了",
        description: "医師が予約リクエストを確認し、連絡します",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "エラー",
        description: "予約リクエストの送信中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">新規予約</h1>

      <Card>
        <CardHeader>
          <CardTitle>オンライン診療予約</CardTitle>
          <CardDescription>
            {step === 1 && "ステップ 1: 診療科を選択してください"}
            {step === 2 && "ステップ 2: 希望日時を選択してください"}
            {step === 3 && "ステップ 3: 問診票に回答してください"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            {step === 1 && (
              <RadioGroup value={department} onValueChange={setDepartment} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skin" id="skin" />
                  <Label htmlFor="skin" className="cursor-pointer">
                    美容皮膚科
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="music" id="music" />
                  <Label htmlFor="music" className="cursor-pointer">
                    音楽療法
                  </Label>
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>第一希望</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date1">日付</Label>
                      <Input id="date1" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time1">時間</Label>
                      <Input id="time1" type="time" value={time1} onChange={(e) => setTime1(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>第二希望</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date2">日付</Label>
                      <Input id="date2" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time2">時間</Label>
                      <Input id="time2" type="time" value={time2} onChange={(e) => setTime2(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>第三希望</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date3">日付</Label>
                      <Input id="date3" type="date" value={date3} onChange={(e) => setDate3(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time3">時間</Label>
                      <Input id="time3" type="time" value={time3} onChange={(e) => setTime3(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">現在の症状</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="現在の症状や気になることを詳しく教えてください"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">既往歴</Label>
                  <Textarea
                    id="medicalHistory"
                    placeholder="過去の病歴や手術歴などがあれば記入してください"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">現在服用中の薬</Label>
                  <Textarea
                    id="medications"
                    placeholder="現在服用中の薬があれば記入してください"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                戻る
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                キャンセル
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={() => {
                  if (step === 1 && !department) {
                    toast({
                      title: "エラー",
                      description: "診療科を選択してください",
                      variant: "destructive",
                    })
                    return
                  }
                  if (step === 2 && (!date1 || !time1 || !date2 || !time2 || !date3 || !time3)) {
                    toast({
                      title: "エラー",
                      description: "すべての希望日時を入力してください",
                      variant: "destructive",
                    })
                    return
                  }
                  setStep(step + 1)
                }}
                disabled={step === 1 && !department}
              >
                次へ
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "送信中..." : "予約リクエストを送信"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
