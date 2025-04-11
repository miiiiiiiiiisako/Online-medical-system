import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { appointmentId, amount, paymentDetails } = await request.json()

    // 実際の実装では、ここでデータベースに支払い情報を保存します
    // また、必要に応じて予約ステータスを更新します

    console.log("Payment received:", {
      appointmentId,
      amount,
      paymentDetails,
    })

    return NextResponse.json({
      success: true,
      message: "支払いが正常に処理されました",
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "支払い処理中にエラーが発生しました" }, { status: 500 })
  }
}
