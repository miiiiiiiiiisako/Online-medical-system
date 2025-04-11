"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, FileText, AlertCircle } from "lucide-react"

// 処方薬のリスト
const medications = [
  { id: 1, name: "トラネキサム酸", description: "抗プラスミン薬。肌の炎症を抑える効果があります。" },
  { id: 2, name: "タチオン", description: "グルタチオン製剤。抗酸化作用があります。" },
  { id: 3, name: "ユベラ", description: "ビタミンE製剤。抗酸化作用があります。" },
  { id: 4, name: "ビタミンD", description: "ビタミンD3製剤。骨の形成を助けます。" },
  { id: 5, name: "ミノマイシン", description: "テトラサイクリン系抗生物質。ニキビなどの皮膚感染症に効果があります。" },
  { id: 6, name: "イソトレチノイン", description: "レチノイド製剤。重症のニキビに効果があります。" },
  { id: 7, name: "デュタステリド", description: "5α還元酵素阻害薬。AGA（男性型脱毛症）の治療に使用されます。" },
  { id: 8, name: "十味敗毒湯", description: "漢方薬。皮膚の炎症を抑える効果があります。" },
  { id: 9, name: "防風通聖散", description: "漢方薬。肥満症や便秘などに効果があります。" },
]

export default function PrescriptionsPage() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">処方薬情報</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">現在の処方薬</TabsTrigger>
          <TabsTrigger value="history">処方履歴</TabsTrigger>
          <TabsTrigger value="info">薬の情報</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>現在処方されている薬</CardTitle>
              <CardDescription>現在処方されている薬と発送状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">処方薬はありません</h3>
                <p className="text-sm text-muted-foreground mt-2">現在処方されている薬はありません</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>処方履歴</CardTitle>
              <CardDescription>過去に処方された薬の履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">処方履歴はありません</h3>
                <p className="text-sm text-muted-foreground mt-2">過去の処方履歴はありません</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>処方薬一覧</CardTitle>
              <CardDescription>当院で取り扱っている処方薬の情報</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>薬剤名</TableHead>
                    <TableHead>説明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center gap-2 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <p className="text-sm text-amber-700">薬の詳細情報や副作用については、診察時に医師にご相談ください。</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
