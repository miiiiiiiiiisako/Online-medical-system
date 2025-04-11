"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

interface PaymentFormProps {
  amount: number
  description: string
  onSuccess: () => void
  onCancel: () => void
}

export function PaymentForm({ amount, description, onSuccess, onCancel }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would integrate with PayPal API here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "支払い完了",
        description: "支払いが正常に処理されました",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "支払いエラー",
        description: "支払い処理中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>お支払い</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>支払い金額</Label>
            <div className="text-2xl font-bold">¥{amount.toLocaleString()}</div>
          </div>

          <div className="space-y-2">
            <Label>支払い方法</Label>
            <RadioGroup defaultValue="paypal">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="your@email.com" required />
            <p className="text-sm text-muted-foreground">
              PayPalアカウントに関連付けられたメールアドレスを入力してください
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "処理中..." : "支払いを完了する"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
