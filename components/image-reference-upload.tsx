"use client"

import * as React from "react"
import { ImageIcon, Upload, X, Sparkles, LayoutGrid, Palette, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AIAnalysis {
  layout: string
  colorPalette: string[]
  tone: string
}

const extractColors = (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(["#4F46E5", "#F59E0B", "#FFFFFF", "#1E293B"])
        return
      }
      
      const maxW = 100
      const maxH = 100
      const ratio = Math.min(maxW / img.width, maxH / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      
      const colorCounts: Record<string, number> = {}
      
      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i]
        const g = imageData[i + 1]
        const b = imageData[i + 2]
        const a = imageData[i + 3]
        
        if (a < 128) continue
        
        const rr = Math.round(r / 32) * 32
        const gg = Math.round(g / 32) * 32
        const bb = Math.round(b / 32) * 32
        const key = `${Math.min(255, rr)},${Math.min(255, gg)},${Math.min(255, bb)}`
        
        colorCounts[key] = (colorCounts[key] || 0) + 1
      }
      
      const sortedColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([key]) => {
          const [r, g, b] = key.split(',').map(Number)
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        })
      
      resolve(sortedColors.length > 0 ? sortedColors : ["#4F46E5", "#F59E0B", "#FFFFFF", "#1E293B"])
    }
    img.onerror = () => {
      resolve(["#4F46E5", "#F59E0B", "#FFFFFF", "#1E293B"])
    }
    img.src = imageUrl
  })
}

interface ImageReferenceUploadProps {
  onAnalysisComplete?: (analysis: AIAnalysis) => void
  className?: string
}

export function ImageReferenceUpload({
  onAnalysisComplete,
  className,
}: ImageReferenceUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [analysis, setAnalysis] = React.useState<AIAnalysis | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      processFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      analyzeImage(result)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true)
    
    // 캔버스를 이용해 실제 색상 추출
    const colors = await extractColors(imageUrl)
    
    // 약간의 딜레이를 주어 AI 분석 느낌 부여
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const mockAnalysis: AIAnalysis = {
      layout: "중앙 정렬형 (제품 중심)",
      colorPalette: colors.length === 4 ? colors : [...colors, ...["#4F46E5", "#F59E0B", "#FFFFFF", "#1E293B"]].slice(0, 4),
      tone: "신뢰감 있는 전문적 톤",
    }
    
    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    onAnalysisComplete?.(mockAnalysis)
  }

  const clearImage = () => {
    setPreview(null)
    setAnalysis(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className={cn("overflow-hidden border-0 shadow-xl", className)}>
      <CardContent className="p-4">
        {/* Upload Area */}
        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/20 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="size-6 text-primary" />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              레퍼런스 이미지 업로드
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              클릭 또는 드래그 앤 드롭
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative">
              <div className="relative flex justify-center overflow-hidden rounded-xl bg-muted/10">
                <img
                  src={preview}
                  alt="레퍼런스 이미지"
                  className="max-h-[400px] w-auto object-contain"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
                    <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-lg">
                      <Sparkles className="size-4 animate-pulse text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        스타일 분석 중...
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={clearImage}
                className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* AI Analysis Result */}
            {analysis && (
              <div className="space-y-3 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    AI 분석 결과
                  </span>
                </div>

                {/* Layout */}
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <LayoutGrid className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      레이아웃 감지
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {analysis.layout}
                    </p>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      컬러 팔레트
                    </p>
                    <div className="mt-1.5 flex gap-1.5">
                      {analysis.colorPalette.map((color, idx) => (
                        <div
                          key={idx}
                          className="size-6 rounded-full border border-border shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tone */}
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      광고 톤
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 rounded-full bg-primary/10 text-primary"
                    >
                      {analysis.tone}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
