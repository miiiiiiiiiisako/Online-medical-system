"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Search } from "lucide-react"

// 処方薬のリスト
const medications = [
  { id: 1, name: "トラネキサム酸", description: "抗プラスミン薬。肌の炎症を抑える効果があります。", stock: 120 },
  { id: 2, name: "タチオン", description: "グルタチオン製剤。抗酸化作用があります。", stock: 85 },
  { id: 3, name: "ユベラ", description: "ビタミンE製剤。抗酸化作用があります。", stock: 95 },
  { id: 4, name: "ビタミンD", description: "ビタミンD3製剤。骨の形成を助けます。", stock: 150 },
  {
    id: 5,
    name: "ミノマイシン",
    description: "テトラサイクリン系抗生物質。ニキビなどの皮膚感染症に効果があります。",
    stock: 75,
  },
  { id: 6, name: "イソトレチノイン", description: "レチノイド製剤。重症のニキビに効果があります。", stock: 40 },
  {
    id: 7,
    name: "デュタステリド",
    description: "5α還元酵素阻害薬。AGA（男性型脱毛症）の治療に使用されます。",
    stock: 60,
  },
  { id: 8, name: "十味敗毒湯", description: "漢方薬。皮膚の炎症を抑える効果があります。", stock: 80 },
  { id: 9, name: "防風通聖散", description: "漢方薬。肥満症や便秘などに効果があります。", stock: 70 },
]

export default function AdminPrescriptionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">処方薬管理</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">在庫管理</TabsTrigger>
          <TabsTrigger value="pending">発送待ち</TabsTrigger>
          <TabsTrigger value="history">発送履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>薬剤在庫</CardTitle>
              <CardDescription>処方薬の在庫状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="薬剤名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>薬剤名</TableHead>
                    <TableHead>説明</TableHead>
                    <TableHead>在庫数</TableHead>
                    <TableHead>状態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.description}</TableCell>
                      <TableCell>{med.stock}</TableCell>
                      <TableCell>
                        {med.stock > 50 ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            十分
                          </Badge>
                        ) : med.stock > 20 ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            注意
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            不足
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>発送待ち</CardTitle>
              <CardDescription>発送準備が必要な処方薬</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">発送待ちの処方薬はありません</h3>
                <p className="text-sm text-muted-foreground mt-2">現在、発送待ちの処方薬はありません</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>発送履歴</CardTitle>
              <CardDescription>過去の発送記録</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">発送履歴はありません</h3>
                <p className="text-sm text-muted-foreground mt-2">過去の発送履歴はありません</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
