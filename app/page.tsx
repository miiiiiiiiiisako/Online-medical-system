import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <h1 className="text-4xl font-bold text-center">オンライン診療システムへようこそ</h1>
      <p className="text-xl text-center max-w-2xl">
        美容皮膚科と音楽療法のオンライン診療を提供しています。 ログインして予約を開始してください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
        <Card>
          <CardHeader>
            <CardTitle>ユーザーログイン</CardTitle>
            <CardDescription>患者様はこちらからログインしてください</CardDescription>
          </CardHeader>
          <CardContent>
            <p>予約の作成・確認、診療履歴の閲覧、処方薬の確認などができます。</p>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4 w-full">
              <Button asChild className="w-full">
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">新規登録</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>オーナーログイン</CardTitle>
            <CardDescription>医療スタッフはこちらからログインしてください</CardDescription>
          </CardHeader>
          <CardContent>
            <p>予約管理、患者情報の確認、診療時間の設定、処方薬の発送管理などができます。</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/login">オーナーログイン</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
