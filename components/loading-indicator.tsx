"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LoadingIndicatorProps {
  progress?: number // 0-100
  className?: string
  showRandomText?: boolean
  loadingText?: string
}

export function LoadingIndicator({
  progress = -1, // -1 means indeterminate
  className,
  showRandomText = true,
  loadingText = "LOADING",
}: LoadingIndicatorProps) {
  const [randomText, setRandomText] = useState("")
  const [internalProgress, setInternalProgress] = useState(0)

  // Generate random alphanumeric text for the cyberpunk effect
  useEffect(() => {
    if (!showRandomText) return

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const textLength = 90 // Length of random text

    const generateText = () => {
      let result = ""
      for (let i = 0; i < textLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setRandomText(result)
    }

    // Initial generation
    generateText()

    // Periodically update the random text
    const interval = setInterval(generateText, 500)
    return () => clearInterval(interval)
  }, [showRandomText])

  // For indeterminate progress, animate internally
  useEffect(() => {
    if (progress >= 0) {
      setInternalProgress(progress)
      return
    }

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Loading text */}
      <div className="text-white font-display tracking-widest text-xl mb-4">{loadingText}</div>

      {/* Top thin bar */}
      <div className="w-full max-w-md h-[2px] bg-gray-800 mb-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-white" style={{ width: `${internalProgress}%` }}></div>
      </div>

      {/* Main progress bar */}
      <div className="w-full max-w-md h-6 bg-gray-900 border border-gray-800 mb-2 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-300 to-white transition-all duration-300"
          style={{ width: `${internalProgress}%` }}
        ></div>
      </div>

      {/* Bottom thin bar */}
      <div className="w-full max-w-md h-[2px] bg-gray-800 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full bg-white" style={{ width: `${100 - internalProgress}%` }}></div>
      </div>

      {/* Random text display */}
      {showRandomText && (
        <div className="w-full max-w-md overflow-hidden">
          <div className="text-[8px] font-mono text-gray-500 tracking-tighter leading-tight">{randomText}</div>
        </div>
      )}
    </div>
  )
}
