"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Play, Pause, RefreshCw, Save, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MADCreator() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedStory, setSelectedStory] = useState<string>("youth")

  // サンプル画像（実際のアプリではユーザーがアップロード）
  const sampleImages = [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ]

  // ストーリータイプごとのテキスト
  const storyTexts = {
    youth: [
      "青春は一瞬の煌めき",
      "明日への希望を胸に",
      "限界を超えろ",
      "君と見た空の向こう",
      "終わらない夢を追いかけて",
    ],
    challenge: [
      "立ち向かえ、運命に",
      "強さとは立ち上がる勇気",
      "諦めなければ道は開ける",
      "一歩先の自分へ",
      "不可能を可能にする瞬間",
    ],
    emotional: [
      "心に刻まれた記憶",
      "言葉にできない想い",
      "涙の向こうに見える光",
      "二度と戻れない日々",
      "永遠に続く絆の物語",
    ],
  }

  // アニメーション効果のバリエーション
  const textAnimations = [
    {
      initial: { x: -300, opacity: 0, scale: 0.5 },
      animate: { x: 0, opacity: 1, scale: 1 },
      exit: { x: 300, opacity: 0, scale: 0.5 },
      transition: { duration: 0.5 },
    },
    {
      initial: { y: -100, opacity: 0, rotate: -10 },
      animate: { y: 0, opacity: 1, rotate: 0 },
      exit: { y: 100, opacity: 0, rotate: 10 },
      transition: { duration: 0.4 },
    },
    {
      initial: { scale: 2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      transition: { duration: 0.6 },
    },
    {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(10px)" },
      transition: { duration: 0.5 },
    },
  ]

  const imageAnimations = [
    {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
      transition: { duration: 0.7 },
    },
    {
      initial: { rotate: -5, scale: 1.1, x: -50 },
      animate: { rotate: 0, scale: 1, x: 0 },
      exit: { rotate: 5, scale: 0.9, x: 50 },
      transition: { duration: 0.6 },
    },
    {
      initial: { filter: "brightness(0)", scale: 1.1 },
      animate: { filter: "brightness(1)", scale: 1 },
      exit: { filter: "brightness(2)", scale: 0.9 },
      transition: { duration: 0.5 },
    },
  ]

  // ファイルアップロードハンドラー
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setUploadedImages(newImages)
    }
  }

  // 再生/停止の切り替え
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // アニメーションの自動再生
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (uploadedImages.length || sampleImages.length))
      }, 1500) // 1.5秒ごとに切り替え
    }

    return () => clearInterval(interval)
  }, [isPlaying, uploadedImages, sampleImages.length])

  // ランダムなアニメーション効果を選択
  const getRandomAnimation = (animations: any[]) => {
    const randomIndex = Math.floor(Math.random() * animations.length)
    return animations[randomIndex]
  }

  const images = uploadedImages.length > 0 ? uploadedImages : sampleImages
  const texts = storyTexts[selectedStory as keyof typeof storyTexts] || storyTexts.youth

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <header className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-purple-900 to-blue-900">
        <h1 className="text-2xl font-bold">MAD Creator</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 w-full max-w-4xl p-4 flex flex-col items-center">
        {/* プレビューエリア */}
        <div className="relative w-full aspect-video bg-black overflow-hidden rounded-lg border border-gray-800 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentIndex}`}
              className="absolute inset-0 flex items-center justify-center"
              {...getRandomAnimation(imageAnimations)}
            >
              <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt="MAD scene"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              className="absolute inset-0 flex items-center justify-center"
              {...getRandomAnimation(textAnimations)}
            >
              <div className="bg-black/50 px-6 py-3 rounded-md text-center">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">{texts[currentIndex % texts.length]}</h2>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* フラッシュ効果 */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.2 }}
            />
          )}
        </div>

        {/* コントロールエリア */}
        <div className="w-full grid grid-cols-3 gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-4 w-4" />
            画像アップロード
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>

          <Button
            variant={isPlaying ? "destructive" : "default"}
            className="flex items-center gap-2"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "停止" : "再生"}
          </Button>

          <Button variant="outline" className="flex items-center gap-2" onClick={() => setCurrentIndex(0)}>
            <RefreshCw className="h-4 w-4" />
            リセット
          </Button>
        </div>

        {/* ストーリー選択 */}
        <div className="w-full mb-6">
          <h3 className="text-lg font-medium mb-2">ストーリータイプを選択</h3>
          <Tabs defaultValue="youth" value={selectedStory} onValueChange={setSelectedStory} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="youth">青春</TabsTrigger>
              <TabsTrigger value="challenge">挑戦</TabsTrigger>
              <TabsTrigger value="emotional">感動</TabsTrigger>
            </TabsList>

            <TabsContent value="youth" className="text-sm text-gray-400">
              青春をテーマにした爽やかで希望に満ちたストーリー展開
            </TabsContent>
            <TabsContent value="challenge" className="text-sm text-gray-400">
              困難に立ち向かう勇気と成長を描いたストーリー展開
            </TabsContent>
            <TabsContent value="emotional" className="text-sm text-gray-400">
              心に響く感動と深い絆を描いたストーリー展開
            </TabsContent>
          </Tabs>
        </div>

        {/* サムネイルプレビュー */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {images.map((src, index) => (
              <div
                key={index}
                className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden cursor-pointer border-2 ${
                  index === currentIndex ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Thumbnail ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

