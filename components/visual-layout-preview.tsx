"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Type, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AdStrategy } from "./ad-strategy-card"

interface VisualLayoutPreviewProps {
  strategy: AdStrategy
  className?: string
}

export function VisualLayoutPreview({
  strategy,
  className,
}: VisualLayoutPreviewProps) {
  const isGFA = strategy.platform === "gfa"

  return (
    <Card className={cn("overflow-hidden border-0 shadow-lg", className)}>
      <CardContent className="p-0">
        {/* Ad Preview Frame */}
        <div
          className={cn(
            "relative overflow-hidden",
            isGFA ? "aspect-[4/5]" : "aspect-[1.91/1]"
          )}
        >
          {/* Background Gradient */}
          <div
            className={cn(
              "absolute inset-0",
              isGFA
                ? "bg-gradient-to-br from-green-50 via-green-100 to-emerald-100"
                : "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100"
            )}
          />

          {/* Platform Badge */}
          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                isGFA
                  ? "bg-green-600 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              )}
            >
              {isGFA ? "GFA 배너" : "메타 배너"}
            </Badge>
          </div>

          {/* Ad Layout Structure */}
          <div className="absolute inset-0 flex flex-col p-4 pt-12">
            {/* Image Placeholder */}
            <div
              className={cn(
                "relative flex flex-1 items-center justify-center rounded-xl border-2 border-dashed",
                isGFA ? "border-green-300 bg-green-50/50" : "border-blue-300 bg-blue-50/50"
              )}
            >
              <div className="text-center">
                <ImageIcon
                  className={cn(
                    "mx-auto mb-2 size-8",
                    isGFA ? "text-green-400" : "text-blue-400"
                  )}
                />
                <p
                  className={cn(
                    "text-xs font-medium",
                    isGFA ? "text-green-600" : "text-blue-600"
                  )}
                >
                  이미지 영역
                </p>
              </div>
            </div>

            {/* Copy Area */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <Type
                  className={cn(
                    "size-3.5",
                    isGFA ? "text-green-500" : "text-blue-500"
                  )}
                />
                <div
                  className={cn(
                    "h-2.5 flex-1 rounded-full",
                    isGFA ? "bg-green-300" : "bg-blue-300"
                  )}
                />
              </div>
              <div
                className={cn(
                  "ml-5 h-2 w-3/4 rounded-full",
                  isGFA ? "bg-green-200" : "bg-blue-200"
                )}
              />
            </div>

            {/* CTA Button */}
            <div className="mt-3 flex items-center gap-2">
              <MousePointerClick
                className={cn(
                  "size-3.5",
                  isGFA ? "text-green-500" : "text-blue-500"
                )}
              />
              <div
                className={cn(
                  "h-8 w-24 rounded-lg",
                  isGFA
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                )}
              />
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="border-t bg-card p-4">
          <p className="mb-1 text-sm font-semibold text-foreground">
            {strategy.title}
          </p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {strategy.copyPreview}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full text-[10px] font-medium"
            >
              {isGFA ? "320×480" : "1200×628"}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full text-[10px] font-medium"
            >
              {strategy.style}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
