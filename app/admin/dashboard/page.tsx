"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.push("/admin/login")
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
        <h1 className="text-3xl font-bold">オーナーダッシュボード</h1>
        <Button
          onClick={() => {
            localStorage.removeItem("adminLoggedIn")
            router.push("/admin/login")
          }}
        >
          ログアウト
        </Button>
      </div>

      <Tabs defaultValue="appointments">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appointments">予約管理</TabsTrigger>
          <TabsTrigger value="users">ユーザー管理</TabsTrigger>
          <TabsTrigger value="schedule">診療時間設定</TabsTrigger>
          <TabsTrigger value="prescriptions">処方薬管理</TabsTrigger>
          <TabsTrigger value="messages">メッセージ</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">予約管理</h2>
            <Button asChild>
              <Link href="/admin/appointments">すべての予約を表示</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>新規予約リクエスト</CardTitle>
                <CardDescription>承認待ちの予約</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">新しい予約リクエストはありません</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/appointments/pending">詳細を見る</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>今日の予約</CardTitle>
                <CardDescription>本日の診療予定</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">本日の予約はありません</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/appointments/today">詳細を見る</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">ユーザー管理</h2>
            <Button asChild>
              <Link href="/admin/users">すべてのユーザーを表示</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>登録ユーザー</CardTitle>
              <CardDescription>システムに登録されているユーザー</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">登録ユーザー: 0人</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/users">ユーザー一覧を見る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">診療時間設定</h2>
            <Button asChild>
              <Link href="/admin/schedule">詳細設定</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>診療可能時間</CardTitle>
              <CardDescription>ユーザーが予約できる時間帯</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">診療日: 月曜日〜金曜日</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">診療時間: 9:00〜17:00</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/schedule">時間を編集</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">処方薬管理</h2>
            <Button asChild>
              <Link href="/admin/prescriptions">すべての処方を表示</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>発送待ち</CardTitle>
              <CardDescription>発送準備が必要な処方薬</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">発送待ちの処方薬はありません</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/prescriptions/pending">詳細を見る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">メッセージ</h2>
            <Button asChild>
              <Link href="/admin/messages">すべてのメッセージを表示</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>未読メッセージ</CardTitle>
              <CardDescription>返信が必要なメッセージ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">未読メッセージはありません</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/messages">メッセージを見る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
