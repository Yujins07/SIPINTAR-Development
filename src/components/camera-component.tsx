'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, CameraOff, Users } from 'lucide-react'

interface CameraComponentProps {
  onCapture?: (imageData: ImageData) => void
  onFaceDetected?: (faces: unknown[]) => void
  isActive?: boolean
}

export function CameraComponent({ onCapture, onFaceDetected, isActive = false }: CameraComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isActive && !isCameraActive) {
      startCamera()
    } else if (!isActive && isCameraActive) {
      stopCamera()
    }
  }, [isActive])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setIsCameraActive(true)
        setError(null)
      }
    } catch (err) {
      setError('Failed to access camera. Please ensure camera permissions are granted.')
      console.error('Camera access error:', err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCameraActive(false)
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    onCapture?.(imageData)

    // Convert to blob for preview
    canvas.toBlob((blob) => {
      if (blob) {
        URL.createObjectURL(blob)
        // You can use this URL for preview
      }
    })
  }

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera()
    } else {
      startCamera()
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Face Recognition Camera
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          {isCameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto"
              onLoadedMetadata={() => {
                // Start face detection if needed
                if (onFaceDetected) {
                  // Implement face detection logic here
                }
              }}
            />
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gray-200">
              <div className="text-center text-gray-500">
                <CameraOff className="h-12 w-12 mx-auto mb-2" />
                <p>Camera is off</p>
              </div>
            </div>
          )}
        </div>

        <canvas
          ref={canvasRef}
          className="hidden"
        />

        <div className="flex gap-2 justify-center">
          <Button
            onClick={toggleCamera}
            variant={isCameraActive ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isCameraActive ? (
              <>
                <CameraOff className="h-4 w-4" />
                Stop Camera
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                Start Camera
              </>
            )}
          </Button>

          {isCameraActive && (
            <Button
              onClick={captureImage}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Capture
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}