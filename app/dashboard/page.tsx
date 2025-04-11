"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, User } from "lucide-react"

export default function UserDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (!userLoggedIn) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">読み込み中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ユーザーダッシュボード</h1>
        <Button
          onClick={() => {
            localStorage.removeItem("userLoggedIn")
            router.push("/login")
          }}
        >
          ログアウト
        </Button>
      </div>

      <Tabs defaultValue="appointments">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">予約</TabsTrigger>
          <TabsTrigger value="prescriptions">処方薬</TabsTrigger>
          <TabsTrigger value="messages">メッセージ</TabsTrigger>
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">予約管理</h2>
            <Button asChild>
              <Link href="/appointments/new">新規予約</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>次回の予約</CardTitle>
                <CardDescription>予約はまだありません</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">新しい予約を作成してください</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/appointments/new">予約を作成</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>予約履歴</CardTitle>
                <CardDescription>過去の予約記録</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">過去の予約はありません</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/appointments/history">履歴を見る</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">処方薬情報</h2>

          <Card>
            <CardHeader>
              <CardTitle>処方薬一覧</CardTitle>
              <CardDescription>現在処方されている薬</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">現在処方されている薬はありません</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/prescriptions">詳細を見る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">メッセージ</h2>

          <Card>
            <CardHeader>
              <CardTitle>メッセージ</CardTitle>
              <CardDescription>医師とのメッセージ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">新しいメッセージはありません</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/messages">メッセージを見る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">プロフィール</h2>

          <Card>
            <CardHeader>
              <CardTitle>個人情報</CardTitle>
              <CardDescription>アカウント情報の管理</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">山田 太郎</p>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">example@email.com</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">プロフィールを編集</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
