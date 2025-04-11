"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface PayPalButtonProps {
  amount: number
  currency?: string
  description: string
  onSuccess: (details: any) => void
  onError?: (error: any) => void
}

declare global {
  interface Window {
    paypal?: any
  }
}

export function PayPalButton({ amount, currency = "JPY", description, onSuccess, onError }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [buttonRendered, setButtonRendered] = useState(false)
  const { toast } = useToast()

  // PayPal SDKをロード
  useEffect(() => {
    const addPayPalScript = () => {
      if (window.paypal) {
        setScriptLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${currency}`
      script.async = true
      script.onload = () => setScriptLoaded(true)
      script.onerror = () => {
        toast({
          title: "エラー",
          description: "PayPalの読み込みに失敗しました",
          variant: "destructive",
        })
      }

      document.body.appendChild(script)
    }

    addPayPalScript()
  }, [currency, toast])

  // PayPalボタンをレンダリング
  useEffect(() => {
    if (scriptLoaded && paypalRef.current && !buttonRendered) {
      try {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description,
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
            },
            onApprove: async (data: any, actions: any) => {
              const order = await actions.order.capture()
              onSuccess(order)
            },
            onError: (err: any) => {
              toast({
                title: "支払いエラー",
                description: "支払い処理中にエラーが発生しました",
                variant: "destructive",
              })
              if (onError) onError(err)
            },
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
            },
          })
          .render(paypalRef.current)

        setButtonRendered(true)
      } catch (error) {
        console.error("PayPal button render error:", error)
        toast({
          title: "エラー",
          description: "PayPalボタンの表示に失敗しました",
          variant: "destructive",
        })
      }
    }
  }, [scriptLoaded, amount, currency, description, onSuccess, onError, buttonRendered, toast])

  return (
    <div className="w-full">
      {!scriptLoaded && (
        <div className="flex justify-center py-4">
          <div className="animate-pulse bg-gray-200 h-10 w-full rounded"></div>
        </div>
      )}
      <div ref={paypalRef} />
    </div>
  )
}
