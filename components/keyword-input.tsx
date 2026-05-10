"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface KeywordInputProps {
  keywords: string[]
  onKeywordsChange: (keywords: string[]) => void
  placeholder?: string
  className?: string
}

export function KeywordInput({
  keywords,
  onKeywordsChange,
  placeholder = "문구 입력 후 Enter",
  className,
}: KeywordInputProps) {
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!keywords.includes(inputValue.trim())) {
        onKeywordsChange([...keywords, inputValue.trim()])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
      onKeywordsChange(keywords.slice(0, -1))
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    onKeywordsChange(keywords.filter((k) => k !== keywordToRemove))
  }

  return (
    <div
      className={cn(
        "flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-input bg-card p-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        className
      )}
    >
      {keywords.map((keyword) => (
        <Badge
          key={keyword}
          variant="secondary"
          className="gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-primary hover:bg-primary/20"
        >
          {keyword}
          <button
            type="button"
            onClick={() => removeKeyword(keyword)}
            className="ml-0.5 rounded-full transition-colors hover:bg-primary/20"
          >
            <X className="size-3" />
            <span className="sr-only">{keyword} 삭제</span>
          </button>
        </Badge>
      ))}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
            onKeywordsChange([...keywords, inputValue.trim()])
            setInputValue("")
          }
        }}
        placeholder={keywords.length === 0 ? placeholder : ""}
        className="min-w-[120px] flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
      />
    </div>
  )
}
