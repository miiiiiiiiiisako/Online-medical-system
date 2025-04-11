"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // ユーザー情報の状態
  const [name, setName] = useState("山田 太郎")
  const [email, setEmail] = useState("example@email.com")
  const [phone, setPhone] = useState("090-1234-5678")
  const [birthdate, setBirthdate] = useState("1980-01-01")
  const [gender, setGender] = useState("male")
  const [address, setAddress] = useState("東京都渋谷区〇〇 1-2-3")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [allergies, setAllergies] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "プロフィール更新完了",
        description: "プロフィール情報が正常に更新されました",
      })
    } catch (error) {
      toast({
        title: "エラー",
        description: "プロフィールの更新中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">プロフィール設定</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>個人情報</CardTitle>
          <CardDescription>アカウント情報と医療情報を管理します</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">基本情報</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">氏名</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate">生年月日</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>性別</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">男性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">女性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">その他</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">医療情報</h3>

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
                <Label htmlFor="allergies">アレルギー</Label>
                <Textarea
                  id="allergies"
                  placeholder="薬や食品のアレルギーがあれば記入してください"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "保存中..." : "変更を保存"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
