"use client"

import * as React from "react"
import {
  Megaphone,
  Sparkles,
  Target,
  Layers,
  LayoutGrid,
  FileText,
  Loader2,
  Newspaper,
  Instagram,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeywordInput } from "./keyword-input"
import { AdStrategyCard, type AdStrategy } from "./ad-strategy-card"
import { VisualLayoutPreview } from "./visual-layout-preview"
import { ImageReferenceUpload } from "./image-reference-upload"
import { CategoryChips } from "./category-chips"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { value: "food", label: "식품/밀키트", icon: "🍱" },
  { value: "pet", label: "반려동물", icon: "🐾" },
  { value: "beauty", label: "뷰티", icon: "💄" },
  { value: "living", label: "생활용품", icon: "🏠" },
  { value: "furniture", label: "가구", icon: "🪑" },
  { value: "fashion", label: "패션", icon: "👗" },
  { value: "kitchen", label: "주방용품", icon: "🍳" },
  { value: "parenting", label: "출산/육아", icon: "👶" },
  { value: "appliances", label: "가전", icon: "📺" },
  { value: "interior", label: "인테리어", icon: "🪴" },
  { value: "sports", label: "스포츠/레저", icon: "⚽" },
  { value: "instrument", label: "악기", icon: "🎸" },
  { value: "travel", label: "여행", icon: "✈️" },
  { value: "health", label: "건강식품", icon: "💊" },
  { value: "tech", label: "IT/테크", icon: "💻" },
  { value: "other", label: "기타", icon: "📦" },
]

const MOCK_GFA_STRATEGIES: AdStrategy[] = [
  {
    id: "gfa-1",
    platform: "gfa",
    title: "정보/신뢰 중심 (Information-Driven)",
    style: "정보전달형",
    copyPreview:
      "매일 아침, 신선한 재료로 완성되는 건강한 한 끼. 전문 영양사가 설계한 맞춤 밀키트로 바쁜 일상 속에서도 균형 잡힌 식사를 시작하세요.",
    visualConcept:
      "좌측에 제품 이미지, 우측에 핵심 정보 텍스트 배치. 신뢰도를 높이는 인증 마크와 수치 강조",
    ctrTip:
      "구체적인 수치와 전문성 강조로 신뢰도 98% 달성. 정보성 콘텐츠로 검색 의도에 부합.",
  },
  {
    id: "gfa-2",
    platform: "gfa",
    title: "혜택 강조형 (Benefit-Focused)",
    style: "후킹형",
    copyPreview:
      "첫 주문 50% 할인! 지금 가입하면 무료 배송까지. 3만 가정이 선택한 프리미엄 밀키트.",
    visualConcept:
      "눈에 띄는 할인율 배너와 함께 제품 구성 이미지 배치. 숫자 강조와 긴급성 표현",
    ctrTip:
      "명확한 혜택과 사회적 증거를 결합하여 클릭 유도. 시간 제한 요소로 전환율 상승.",
  },
  {
    id: "gfa-3",
    platform: "gfa",
    title: "호기심 유발형 (Curiosity-Driven)",
    style: "궁금증 유발",
    copyPreview: "대체 왜 다들 이것만 찾을까요? 숨겨진 비법 대공개!",
    visualConcept: "제품의 일부분만 보여주거나 물음표를 활용해 클릭을 유도하는 디자인.",
    ctrTip: "질문형 카피를 사용하여 사용자의 자발적인 클릭을 유도하세요.",
  },
  {
    id: "gfa-4",
    platform: "gfa",
    title: "상황/공감형 (Context-Focused)",
    style: "공감형",
    copyPreview: "오늘 저녁 뭐 먹지? 고민될 때 딱 맞는 솔루션!",
    visualConcept: "타겟 고객이 자주 겪는 일상적인 문제 상황을 시각화.",
    ctrTip: "고객의 페인포인트(Pain-point)를 정확히 짚어주어 공감대를 형성하세요.",
  },
]

const MOCK_META_STRATEGIES: AdStrategy[] = [
  {
    id: "meta-1",
    platform: "meta",
    title: "공감/후킹 중심 (Interaction-Driven)",
    style: "감성형",
    copyPreview:
      "퇴근 후 30분, 셰프급 요리가 완성되는 마법 ✨ 요리 스트레스 없이 가족과 함께하는 저녁 시간을 되찾으세요.",
    visualConcept:
      "실제 사용자의 일상적인 요리 장면 (UGC 스타일). 따뜻한 조명과 자연스러운 구도로 공감대 형성",
    ctrTip:
      "감성적 스토리텔링으로 공감 유도. 이모지 활용과 대화체로 친근감 상승.",
  },
  {
    id: "meta-2",
    platform: "meta",
    title: "트렌디 숏폼 스타일",
    style: "후킹형",
    copyPreview:
      "이거 실화? 😱 3분 만에 레스토랑급 파스타 완성! 요즘 MZ세대가 열광하는 밀키트의 정체",
    visualConcept:
      "세로형 숏폼 영상 스타일의 다이나믹한 구성. 빠른 전환과 임팩트 있는 첫 장면으로 스크롤 멈춤 유도",
    ctrTip:
      "후킹 문구와 호기심 유발로 클릭률 극대화. 트렌디한 표현으로 젊은 타겟 공략.",
  },
  {
    id: "meta-3",
    platform: "meta",
    title: "리뷰/UGC 중심형 (Review-Driven)",
    style: "리뷰형",
    copyPreview: "⭐⭐⭐⭐⭐ 평점 4.9! 실제 구매자들이 극찬하는 이유",
    visualConcept: "실제 고객의 리뷰 텍스트와 인증샷 스타일의 이미지를 결합.",
    ctrTip: "별점과 리얼 후기 텍스트를 통해 신뢰도를 높여 전환율을 극대화하세요.",
  },
  {
    id: "meta-4",
    platform: "meta",
    title: "비포&애프터형 (Before & After)",
    style: "결과강조형",
    copyPreview: "사용 전후가 이렇게 다르다고? 놀라운 변화를 확인하세요.",
    visualConcept: "사용 전의 불편함과 사용 후의 만족감을 대비시키는 스플릿 레이아웃.",
    ctrTip: "시각적 대비 효과가 뛰어난 제품의 경우 가장 직관적인 성과를 냅니다.",
  },
]

interface FormData {
  brandName: string
  category: string
  coreValue: string
  keywords: string[]
}

export function AdPlanningDashboard() {
  const [formData, setFormData] = React.useState<FormData>({
    brandName: "",
    category: "",
    coreValue: "",
    keywords: [],
  })
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [strategies, setStrategies] = React.useState<AdStrategy[]>([])
  const [activeTab, setActiveTab] = React.useState("brief")
  const [platformTab, setPlatformTab] = React.useState("gfa")
  const [hasAnalysis, setHasAnalysis] = React.useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const bName = formData.brandName || "우리 브랜드"
    const usp = formData.coreValue || "최고의 경험"
    const keys = formData.keywords.length > 0 ? formData.keywords : ["필수템", "추천"]
    const keyStr = keys.join(", ")
    const hashTags = keys.map(k => `#${k}`).join(" ")

    const gfaCopies = [
      [
        `[${bName}] 전문 연구진이 검증한 ${usp}.\n누적 판매 100만 돌파, 확실한 ${keyStr} 정보를 지금 확인하세요.`,
        `깐깐하게 고른 ${keyStr}! ${bName}만의 독보적인 기술력으로 완성한 ${usp}의 압도적 차이.`,
        `실구매자 만족도 99%! ${bName}이 제안하는 프리미엄 ${keyStr}. 지금 바로 ${usp}의 비밀을 알아보세요.`
      ],
      [
        `🚨단 7일 한정 특가🚨 ${bName} 파격 혜택 진행 중!\n${usp}은 기본, 지금 클릭하면 특별한 ${keyStr} 혜택까지!`,
        `선착순 500명 한정 ${keyStr} 0원 이벤트! 🎁\n${bName} 가입하고 ${usp} 100% 무료로 받아가세요.`,
        `오늘 밤 자정 마감⏰ 역대급 ${bName} 세일!\n망설이면 품절! 파격적인 ${usp} 기회, 지금 바로 접속하세요.`
      ],
      [
        `대체 왜 다들 ${bName}만 찾을까요?\n나만 몰랐던 ${usp}의 비밀. ${keyStr} 유목민 정착템 대공개!`,
        `혹시 아직도 ${keyStr} 아무거나 쓰시나요? 🤫\n${bName} 하나 바꿨을 뿐인데 일어난 ${usp}의 기적!`,
        `"이걸 왜 이제 알았지?" 😲 10명 중 9명이 극찬한 ${bName}.\n상상도 못했던 ${usp} 결과, 지금 확인해 보세요.`
      ],
      [
        `매번 ${keyStr} 때문에 스트레스 받으셨죠? 😭\n이제 ${bName} 하나로 ${usp} 완벽 해결!`,
        `"바쁘다 바빠 현대사회" 🏃‍♂️ 시간 없는 직장인을 위한 ${keyStr}!\n${bName} 단 3분 투자로 ${usp} 경험하기.`,
        `남들은 다 쉽게 하던데, 나만 어려운 ${keyStr}? 🤔\n초보자도 뚝딱! ${bName}으로 ${usp} 마스터하세요.`
      ]
    ]

    const gfaVisuals = [
      `[모바일 이미지형 DA: 1250 x 560px]\n좌측 제품, 우측 텍스트 배치. 단, 상하좌우 Safe Area(40px)를 반드시 준수하고 우측 상단 AD Mute(X) 영역과 겹치지 않게 주의하세요.`,
      `[스마트채널: 1250 x 370px]\n핵심 혜택 강조 배너. 여백 위반 반려가 잦으므로 텍스트를 가급적 중앙으로 모아 배치하세요. 식품 업종은 필수 고지 사항 랜딩 반영 필수!`,
      `[모바일 이미지형 DA: 1250 x 560px]\n제품의 일부분만 보여주거나 물음표(?)를 크게 배치해 클릭을 유도. (우측 상단 112x112px AD Mute 영역 피하기 필수)`,
      `[웹툰/웹소설 배너: 1200 x 1200px]\n타겟 고객이 공감할 만한 일상적인 고민 상황 텍스트를 상단에 배치. 하단에는 제품 이미지. 여백 40px 준수.`
    ]

    const gfaCtrTips = [
      `M 피드 광고가 클릭수(Volume)가 많고 CPC가 낮아 효율적입니다. 여백 준수 반려에 특히 유의하세요.`,
      `스마트채널 160/200 사용 시 반드시 배경이 투명한 PNG(누끼 이미지)를 사용해야 반려되지 않습니다. 랜딩페이지 푸터(Footer) 상호명 일치도 필수입니다.`,
      `의문형/질문형 카피를 사용하여 사용자의 호기심을 자극하고 자발적인 클릭을 유도하세요.`,
      `고객의 페인포인트(Pain-point)를 정확히 짚어주어 공감대를 형성하는 것이 전환율 상승의 핵심입니다.`
    ]

    const getCopy = (copies: string[][], idx: number) => {
      const arr = copies[idx] || copies[0]
      return arr[Math.floor(Math.random() * arr.length)]
    }

    const dynamicGFA = MOCK_GFA_STRATEGIES.map((s, idx) => ({
      ...s,
      copyPreview: getCopy(gfaCopies, idx),
      visualConcept: gfaVisuals[idx] || gfaVisuals[0],
      ctrTip: gfaCtrTips[idx] || gfaCtrTips[0],
    }))

    const metaCopies = [
      [
        `✨요즘 제 최애템 등극한 ${bName} 리얼 후기✨\n써보니까 "${usp}" 이거 진짜 찐이네요ㅠㅠ\n${hashTags}`,
        `내돈내산 찐리뷰! 이거 쓰고 광명 찾았습니다 🙏\n${bName} 하나로 ${keyStr} 종결! "${usp}" 진짜 최고예요👍\n${hashTags}`,
        `친구들이 다 어디꺼냐고 물어봐요 🤭\n나만 알고 싶은 ${bName}의 ${usp} 효과!\n${hashTags}`
      ],
      [
        `이거 실화? 😱 요즘 난리난 ${bName}!\n진짜 ${usp} 대박적... 당장 쟁여두러 갑니다 🏃‍♀️💨\n${hashTags}`,
        `🚨품절주의🚨 안 본 사람 없게 해주세요!\n3초 만에 보여드리는 ${bName}의 미친 ${usp} 폼 미쳤다 🔥\n${hashTags}`,
        `요즘 틱톡/릴스 휩쓴 바로 그 ${keyStr}! 😎\n직접 써본 ${bName} 리얼타임 ${usp} 체감 썰 푼다.\n${hashTags}`
      ],
      [
        `⭐⭐⭐⭐⭐ (평점 4.9)\n"드디어 정착했습니다!" 실제 구매자들이 극찬하는 ${bName}.\n직접 경험한 ${usp}의 차이, 지금 확인하세요.`,
        `재구매율 1위에는 이유가 있습니다 🥇\n"한 번 쓰면 못 돌아가요" 10,000개의 찐리뷰가 증명하는 ${bName}의 ${usp}.\n${hashTags}`,
        `평점 5.0 만점 행진! 🔥\n까다로운 소비자들도 인정한 ${keyStr} 끝판왕.\n${bName}이 선사하는 완벽한 ${usp}.`
      ],
      [
        `사용 전후가 이렇게 다르다고? 😱\n${bName} 쓰기 전엔 몰랐던 놀라운 변화!\n단 한 번의 선택으로 ${keyStr} 고민 끝! 압도적인 ${usp} 경험하기.`,
        `[Before & After] 눈으로 직접 확인하세요 👀\n${keyStr} 스트레스 받던 과거는 안녕👋\n${bName}과 함께 찾은 ${usp} 라이프!`,
        `"저도 안 믿겼는데, 진짜 변하더라고요" 😲\n확실한 결과가 증명하는 ${bName}의 클래스!\n한 달 만에 달라진 ${usp} 리얼 후기.`
      ]
    ]

    const dynamicMeta = MOCK_META_STRATEGIES.map((s, idx) => ({
      ...s,
      copyPreview: metaCopies[idx] || metaCopies[0],
    }))

    setStrategies([...dynamicGFA, ...dynamicMeta])
    setIsGenerating(false)
  }

  const isFormComplete = formData.brandName && formData.category

  const gfaStrategies = strategies.filter((s) => s.platform === "gfa")
  const metaStrategies = strategies.filter((s) => s.platform === "meta")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Megaphone className="size-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">
              AI 광고 기획 도구
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>Vision AI</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {/* Reference Image Upload Section */}
        <section className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <ImageIcon className="size-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">
              레퍼런스 분석
            </h2>
          </div>
          <ImageReferenceUpload
            onAnalysisComplete={() => setHasAnalysis(true)}
          />
        </section>

        {/* Input Section */}
        <Card className="mb-6 overflow-hidden border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="size-5 text-primary" />
              캠페인 브리프
            </CardTitle>
            <CardDescription>
              광고 전략 생성을 위한 정보를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Category Chips */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">
                카테고리
              </Label>
              <CategoryChips
                categories={CATEGORIES}
                selectedCategory={formData.category}
                onCategoryChange={(category) =>
                  setFormData({ ...formData, category })
                }
              />
            </div>

            {/* Brand Name */}
            <div className="space-y-2">
              <Label
                htmlFor="brandName"
                className="text-sm font-semibold text-foreground"
              >
                브랜드 이름 (Brand Name)
              </Label>
              <Input
                id="brandName"
                placeholder="브랜드 이름을 입력하세요"
                value={formData.brandName}
                onChange={(e) =>
                  setFormData({ ...formData, brandName: e.target.value })
                }
                className="h-12 rounded-xl border-input bg-card shadow-sm transition-all focus:shadow-md"
              />
            </div>

            {/* Core Value (USP) */}
            <div className="space-y-2">
              <Label
                htmlFor="coreValue"
                className="text-sm font-semibold text-foreground"
              >
                핵심 소구점 (USP)
              </Label>
              <Textarea
                id="coreValue"
                placeholder="브랜드의 핵심 가치와 차별점을 설명해주세요..."
                value={formData.coreValue}
                onChange={(e) =>
                  setFormData({ ...formData, coreValue: e.target.value })
                }
                className="min-h-[100px] rounded-xl border-input bg-card shadow-sm transition-all focus:shadow-md"
              />
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">
                필수 키워드 (Must-have Keywords)
              </Label>
              <KeywordInput
                keywords={formData.keywords}
                onKeywordsChange={(keywords) =>
                  setFormData({ ...formData, keywords })
                }
                placeholder="키워드 입력 후 Enter"
              />
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        {strategies.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                광고 전략 결과
              </h2>
            </div>

            {/* Platform Tabs */}
            <Tabs
              value={platformTab}
              onValueChange={setPlatformTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/50 p-1">
                <TabsTrigger
                  value="gfa"
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  <Newspaper className="size-4" />
                  <span className="text-sm">네이버 GFA</span>
                </TabsTrigger>
                <TabsTrigger
                  value="meta"
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  <Instagram className="size-4" />
                  <span className="text-sm">메타 광고</span>
                </TabsTrigger>
              </TabsList>

              {/* View Toggle Tabs */}
              <div className="mt-4">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted/30 p-0.5">
                    <TabsTrigger
                      value="brief"
                      className="flex items-center gap-1.5 rounded-md py-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
                    >
                      <FileText className="size-3.5" />
                      기본 보기
                    </TabsTrigger>
                    <TabsTrigger
                      value="visual"
                      className="flex items-center gap-1.5 rounded-md py-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
                    >
                      <LayoutGrid className="size-3.5" />
                      레이아웃 미리보기
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="brief" className="mt-4 space-y-4">
                    {platformTab === "gfa" &&
                      gfaStrategies.map((strategy) => (
                        <AdStrategyCard
                          key={strategy.id}
                          strategy={strategy}
                        />
                      ))}
                    {platformTab === "meta" &&
                      metaStrategies.map((strategy) => (
                        <AdStrategyCard
                          key={strategy.id}
                          strategy={strategy}
                        />
                      ))}
                  </TabsContent>

                  <TabsContent value="visual" className="mt-4">
                    <div className="space-y-4">
                      {platformTab === "gfa" &&
                        gfaStrategies.map((strategy) => (
                          <VisualLayoutPreview
                            key={strategy.id}
                            strategy={strategy}
                          />
                        ))}
                      {platformTab === "meta" &&
                        metaStrategies.map((strategy) => (
                          <VisualLayoutPreview
                            key={strategy.id}
                            strategy={strategy}
                          />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Tabs>
          </div>
        )}

        {/* Loading Skeleton */}
        {isGenerating && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                광고 전략 생성 중...
              </h2>
            </div>
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                      <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                    </div>
                    <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-20 w-full animate-pulse rounded-xl bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {strategies.length === 0 && !isGenerating && (
          <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 p-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-6 text-primary" />
            </div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              AI 기획안 생성 준비 완료
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              레퍼런스 이미지와 브리프를 입력하면
              <br />
              네이버 GFA와 메타 광고에 최적화된
              <br />
              AI 전략을 생성합니다.
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-background via-background to-transparent pb-6 pt-8">
        <div className="mx-auto max-w-lg px-4">
          <Button
            onClick={handleGenerate}
            disabled={!isFormComplete || isGenerating}
            className={cn(
              "w-full rounded-2xl py-7 text-base font-bold shadow-2xl transition-all",
              isFormComplete && !isGenerating
                ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-accent/25"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                AI 기획안 생성 중...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-5" />
                기획안 생성하기
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
