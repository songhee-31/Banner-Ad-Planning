"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Category {
  value: string
  label: string
  icon?: string
}

interface CategoryChipsProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function CategoryChips({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryChipsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="flex flex-wrap gap-2 pb-2"
      >
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
              selectedCategory === category.value
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            {category.icon && <span>{category.icon}</span>}
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
