import { NextResponse } from "next/server"
import twilio from "twilio"

// 環境変数から認証情報を取得
const accountSid = process.env.TWILIO_ACCOUNT_SID
const apiKey = process.env.TWILIO_API_KEY
const apiSecret = process.env.TWILIO_API_SECRET

export async function POST(request: Request) {
  try {
    const { identity, roomName } = await request.json()

    if (!accountSid || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Twilio credentials are not configured" }, { status: 500 })
    }

    // Twilioのアクセストークンを生成
    const AccessToken = twilio.jwt.AccessToken
    const VideoGrant = AccessToken.VideoGrant

    // 新しいアクセストークンを作成
    const token = new AccessToken(accountSid, apiKey, apiSecret, {
      identity,
      ttl: 3600, // トークンの有効期限（秒）
    })

    // ビデオグラントを作成し、特定のルームへのアクセスを許可
    const videoGrant = new VideoGrant({ room: roomName })

    // トークンにビデオグラントを追加
    token.addGrant(videoGrant)

    // トークンを文字列として返す
    return NextResponse.json({
      token: token.toJwt(),
      identity,
      roomName,
    })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
