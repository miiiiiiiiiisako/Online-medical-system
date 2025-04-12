
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface TwilioVideoChatProps {
  roomName: string
  token: string
  userName: string
  doctorName?: string
  onEnd: () => void
}

export function TwilioVideoChat({ roomName, token, userName, doctorName = "医師", onEnd }: TwilioVideoChatProps) {
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [participants, setParticipants] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const roomRef = useRef<any>(null)
  const localTracksRef = useRef<any[]>([])

  useEffect(() => {
    // Twilioのビデオライブラリをロード
    const loadTwilioVideo = async () => {
      try {
        // 実際の実装では、ここでTwilioのビデオSDKをインポート
        // const Video = await import('twilio-video');
        
        setIsConnecting(true)
        
        // ローカルのビデオとオーディオトラックを取得
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(async (mediaStream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = mediaStream
              
              // 実際の実装では、ここでTwilioのルームに接続
              // const localTracks = mediaStream.getTracks().map(track => 
              //   new Video.LocalTrack(track));
              // localTracksRef.current = localTracks;
              
              // const room = await Video.connect(token, {
              //   name: roomName,
              //   tracks: localTracks,
              // });
              // roomRef.current = room;
              
              // デモ用のタイマー - 実際の実装では削除
              setTimeout(() => {
                setIsConnecting(false)
                setIsConnected(true)
                toast({
                  title: "接続完了",
                  description: "ビデオチャットに接続しました",
                })
              }, 2000)
            }
          })
          .catch((err) => {
            console.error("メディアデバイスへのアクセスエラー:", err)
            setError("カメラまたはマイクへのアクセスが拒否されました。デバイスの権限を確認してください。")
            setIsConnecting(false)
          })
      } catch (err) {
        console.error("Twilioの初期化エラー:", err)
        setError("ビデオチャットの初期化中にエラーが発生しました。ネットワーク接続を確認してください。")
        setIsConnecting(false)
      }
    }

    loadTwilioVideo()

    // クリーンアップ関数
    return () => {
      // ルームから切断
      if (roomRef.current) {
        roomRef.current.disconnect()
      }
      
      // ローカルトラックを停止
      localTracksRef.current.forEach(track => {
        track.stop()
      })
      
      // メディアストリームを停止
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [roomName, token, toast])

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted)
    
    // 実際の実装では、Twilioのオーディオトラックを有効/無効にする
    localTracksRef.current.forEach(track => {
      if (track.kind === 'audio') {
        if (isMicMuted) {
          track.enable()
        } else {
          track.disable()
        }
      }
    })
    
    // ローカルのオーディオトラックを有効/無効にする（デモ用）
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getAudioTracks().forEach(track => {
        track.enabled = isMicMuted
      })
    }
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    
    // 実際の実装では、Twilioのビデオトラックを有効/無効にする
    localTracksRef.current.forEach(track => {
      if (track.kind === 'video') {
        if (isVideoOff) {
          track.enable()
        } else {
          track.disable()
        }
      }
    })
    
    // ローカルのビデオトラックを有効/無効にする（デモ用）
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getVideoTracks().forEach(track => {
        track.enabled = isVideoOff
      })
    }
  }

  const endCall = () => {
    // ルームから切断
    if (roomRef.current) {
      roomRef.current.disconnect()
    }
    
    // ローカルトラックを停止
    localTracksRef.current.forEach(track => {
      track.stop()
    })
    
    // メディアストリームを停止
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    
    toast({
      title: "通話終了",
      description: "ビデオ通話を終了しました",
    })
    
    onEnd()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>オンライン診療 - {roomName}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              isConnecting 
                ? "bg-amber-100 text-amber-800" 
                : isConnected 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
            }`}
          >
            {isConnecting ? "接続中..." : isConnected ? "接続済み" : "未接続"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
            <p className="font-medium">エラーが発生しました</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
              />
              {isVideoOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">カメラオフ</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {userName} (あなた)
              </div>
            </div>

            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
              />
              {isConnecting ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <span className="text-gray-500">接続中...</span>
                  </div>
                </div>
              ) : !isConnected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">{doctorName}の接続を待っています...</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {doctorName}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button
          variant={isMicMuted ? "outline" : "default"}
          size="icon"
          onClick={toggleMic}
          className="rounded-full h-12 w-12"
          disabled={!isConnected || !!error}
        >
          {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button
          variant={isVideoOff ? "outline" : "default"}
          size="icon"
          onClick={toggleVideo}
          className="rounded-full h-12 w-12"
          disabled={!isConnected || !!error}
        >
          {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={endCall}
          className="rounded-full h-12 w-12"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={() => {
            toast({
              title: "設定",
              description: "ビデオ設定は現在利用できません",
            })
          }}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
