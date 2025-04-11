import { NextResponse } from "next/server"
import twilio from "twilio"

// 環境変数から認証情報を取得
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN || process.env.TWILIO_API_SECRET // Auth TokenまたはAPI Secretを使用

export async function POST(request: Request) {
  try {
    const { roomName, type = "group" } = await request.json()

    if (!accountSid || !authToken) {
      return NextResponse.json({ error: "Twilio credentials are not configured" }, { status: 500 })
    }

    // Twilioクライアントを初期化
    const client = twilio(accountSid, authToken)

    // ルームが既に存在するか確認
    let room
    try {
      room = await client.video.v1.rooms(roomName).fetch()
    } catch (error) {
      // ルームが存在しない場合は新しく作成
      room = await client.video.v1.rooms.create({
        uniqueName: roomName,
        type, // 'peer-to-peer', 'group', 'group-small'
        maxParticipants: 2, // オンライン診療では通常2人（医師と患者）
      })
    }

    return NextResponse.json({
      roomName: room.uniqueName,
      roomSid: room.sid,
      status: room.status,
    })
  } catch (error) {
    console.error("Error creating Twilio room:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}
