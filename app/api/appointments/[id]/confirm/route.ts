import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { paymentId, paymentStatus, paymentAmount } = await request.json()

    // バリデーション
    if (!paymentId || !paymentStatus || !paymentAmount) {
      return NextResponse.json({ error: "必須パラメータが不足しています" }, { status: 400 })
    }

    // 予約IDの取得
    const appointmentId = params.id

    // 実際の実装では、ここでデータベースの予約情報を更新します
    /*
    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'confirmed',
        paymentId,
        paymentStatus,
        paymentAmount,
        updatedAt: new Date()
      }
    });
    */

    console.log("Appointment confirmed:", {
      appointmentId,
      paymentId,
      paymentStatus,
      paymentAmount,
      confirmedAt: new Date().toISOString(),
    })

    // 予約確定メールの送信など、追加のビジネスロジックを実行
    // await sendConfirmationEmail(appointmentId);

    return NextResponse.json({
      success: true,
      message: "予約が正常に確定されました",
      appointmentId,
      confirmedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error confirming appointment:", error)
    return NextResponse.json({ error: "予約の確定中にエラーが発生しました" }, { status: 500 })
  }
}
