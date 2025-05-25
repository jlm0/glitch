// components/LoadingIndicator/LoadingIndicator.tsx
"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { TextScramble } from "@/components/effects/TextScramble/TextScramble"
import { GlitchText } from "@/components/effects/GlitchText/GlitchText"
import { NoiseLayer } from "@/components/effects/NoiseLayer"
import { ScanlineLayer } from "@/components/effects/ScanlineLayer/ScanlineLayer"
import "./LoadingIndicator.css"

interface LoadingIndicatorProps {
  progress?: number // 0-100, -1 for indeterminate
  className?: string
  variant?: "default" | "matrix" | "terminal" | "neural"
  showDataStream?: boolean
  loadingText?: string
  statusText?: string
  onComplete?: () => void
  animated?: boolean
  size?: "sm" | "md" | "lg"
}

const LOADING_MESSAGES = [
  "INITIALIZING SYSTEMS",
  "CONNECTING TO NEURAL NETWORK",
  "DECRYPTING DATA STREAMS",
  "LOADING QUANTUM PROTOCOLS",
  "ESTABLISHING SECURE CONNECTION",
  "PARSING NEURAL PATHWAYS",
  "SYNCHRONIZING DATABASES",
]

const DATA_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?"

export function LoadingIndicator({
  progress = -1,
  className,
  variant = "default",
  showDataStream = true,
  loadingText,
  statusText,
  onComplete,
  animated = true,
  size = "md",
}: LoadingIndicatorProps) {
  const [dataStream, setDataStream] = useState("")
  const [internalProgress, setInternalProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(loadingText || LOADING_MESSAGES[0])
  const [isComplete, setIsComplete] = useState(false)
  const progressRef = useRef<number>(progress >= 0 ? progress : 0)
  const animationRef = useRef<number>()

  // Generate flowing data stream
  useEffect(() => {
    if (!showDataStream) return

    const streamLength = size === "sm" ? 60 : size === "lg" ? 120 : 90

    const generateStream = () => {
      let result = ""
      for (let i = 0; i < streamLength; i++) {
        // Higher chance of binary and hex characters for more "data" feel
        const charSet = Math.random() < 0.7 ? "01" : DATA_CHARS
        result += charSet.charAt(Math.floor(Math.random() * charSet.length))
      }
      setDataStream(result)
    }

    generateStream()
    const interval = setInterval(generateStream, animated ? 200 : 1000)
    return () => clearInterval(interval)
  }, [showDataStream, animated, size])

  // Smooth progress animation using RAF
  const animateProgress = useCallback(
    (targetProgress: number) => {
      const animate = () => {
        const current = progressRef.current
        const diff = targetProgress - current

        if (Math.abs(diff) < 0.1) {
          progressRef.current = targetProgress
          setInternalProgress(targetProgress)

          if (targetProgress >= 100 && !isComplete) {
            setIsComplete(true)
            setTimeout(() => onComplete?.(), 500)
          }
          return
        }

        progressRef.current += diff * 0.1
        setInternalProgress(progressRef.current)
        animationRef.current = requestAnimationFrame(animate)
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animate()
    },
    [onComplete, isComplete],
  )

  // Handle progress changes
  useEffect(() => {
    if (progress >= 0) {
      animateProgress(progress)
    } else {
      // Indeterminate progress
      const interval = setInterval(() => {
        setInternalProgress((prev) => {
          const next = prev >= 100 ? 0 : prev + 0.5
          return next
        })
      }, 16)
      return () => clearInterval(interval)
    }
  }, [progress, animateProgress])

  // Rotate loading messages
  useEffect(() => {
    if (loadingText) return

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length)
      setCurrentMessage(LOADING_MESSAGES[randomIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [loadingText])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "matrix":
        return "loading-matrix"
      case "terminal":
        return "loading-terminal"
      case "neural":
        return "loading-neural"
      default:
        return "loading-default"
    }
  }

  return (
    <div className={cn("loading-indicator relative flex flex-col items-center p-6", getVariantClasses(), className)}>
      {/* Background effects */}
      {animated && (
        <>
          <NoiseLayer opacity={0.05} />
          <ScanlineLayer opacity={0.03} />
        </>
      )}

      {/* Loading text with effects */}
      <div className={cn("font-display tracking-widest mb-6 text-center", textSizeClasses[size])}>
        {animated ? (
          <TextScramble text={currentMessage} scrambleInterval={5000} scrambleDuration={800} glitchIntensity={0.2} />
        ) : (
          <GlitchText intensity="subtle">{currentMessage}</GlitchText>
        )}
      </div>

      {/* Progress section */}
      <div className={cn("w-full", sizeClasses[size])}>
        {/* Top indicator line */}
        <div className="progress-line-top mb-2">
          <div className="progress-fill-top" style={{ width: `${internalProgress}%` }} />
        </div>

        {/* Main progress bar */}
        <div className="progress-bar-main mb-2 relative overflow-hidden">
          <div className="progress-fill-main" style={{ width: `${internalProgress}%` }} />

          {/* Animated scanner line */}
          {animated && <div className="progress-scanner" />}
        </div>

        {/* Bottom indicator line */}
        <div className="progress-line-bottom mb-6">
          <div className="progress-fill-bottom" style={{ width: `${100 - internalProgress}%` }} />
        </div>

        {/* Progress percentage */}
        {progress >= 0 && (
          <div className="text-center mb-4">
            <span className="font-mono text-lg">{Math.round(internalProgress)}%</span>
          </div>
        )}
      </div>

      {/* Status text */}
      {statusText && <div className="text-sm text-gray-400 mb-4 text-center">{statusText}</div>}

      {/* Data stream */}
      {showDataStream && (
        <div className={cn("w-full overflow-hidden", sizeClasses[size])}>
          <div className="data-stream">{dataStream}</div>
        </div>
      )}

      {/* Completion effect */}
      {isComplete && animated && <div className="completion-flash" />}
    </div>
  )
}
