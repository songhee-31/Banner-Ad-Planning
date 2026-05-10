"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lightbulb, Palette, TrendingUp, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AdStrategy {
  id: string
  platform: "gfa" | "meta"
  title: string
  style: "정보전달형" | "후킹형" | "감성형" | "직접반응형"
  copyPreview: string
  visualConcept: string
  ctrTip: string
}

interface AdStrategyCardProps {
  strategy: AdStrategy
  className?: string
}

const styleColors: Record<AdStrategy["style"], string> = {
  "정보전달형": "bg-blue-100 text-blue-700 border-blue-200",
  "후킹형": "bg-amber-100 text-amber-700 border-amber-200",
  "감성형": "bg-rose-100 text-rose-700 border-rose-200",
  "직접반응형": "bg-emerald-100 text-emerald-700 border-emerald-200",
}

const platformBadges = {
  gfa: {
    label: "신뢰도 98%",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  meta: {
    label: "클릭 유도",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
}

export function AdStrategyCard({ strategy, className }: AdStrategyCardProps) {
  return (
    <Card className={cn("overflow-hidden border-0 shadow-lg", className)}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              styleColors[strategy.style]
            )}
          >
            {strategy.style}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              platformBadges[strategy.platform].className
            )}
          >
            <CheckCircle2 className="mr-1 size-3" />
            {platformBadges[strategy.platform].label}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-lg font-bold text-foreground">
          {strategy.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {strategy.platform === "gfa" ? "네이버 GFA" : "메타"} 광고 전략
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copy Preview */}
        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Lightbulb className="size-4" />
            광고 카피
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {strategy.copyPreview}
          </p>
        </div>

        {/* Visual Concept */}
        <div className="rounded-xl bg-muted/50 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Palette className="size-4" />
            이미지 구성 제안
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            {strategy.visualConcept}
          </p>
        </div>

        {/* CTR Strategy Tip */}
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            <TrendingUp className="size-4" />
            클릭 유도 전략
          </div>
          <p className="text-sm leading-relaxed text-accent-foreground/90">
            {strategy.ctrTip}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
