"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  onType?: () => void // Callback for each character typed (for sound effects)
  variableSpeed?: boolean // Add natural typing variations
  pauseOnPunctuation?: boolean // Pause longer on punctuation
  cursorChar?: string
  showCursor?: boolean
  startDelay?: number // Delay before starting to type
  resetTrigger?: boolean // Prop to trigger restart
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className, 
  onComplete,
  onType,
  variableSpeed = true,
  pauseOnPunctuation = true,
  cursorChar = "_",
  showCursor = true,
  startDelay = 0,
  resetTrigger = false
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset function
  const reset = useCallback(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setCursorVisible(true)
    setIsTyping(false)
    setIsComplete(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current)
  }, [])

  // Reset when trigger changes
  useEffect(() => {
    if (resetTrigger) {
      reset()
    }
  }, [resetTrigger, reset])

  // Calculate dynamic speed based on character
  const getTypingSpeed = useCallback((char: string, baseSpeed: number) => {
    let finalSpeed = baseSpeed
    
    if (variableSpeed) {
      // Add random variation (±20%)
      const variation = (Math.random() - 0.5) * 0.4
      finalSpeed = baseSpeed * (1 + variation)
    }
    
    if (pauseOnPunctuation) {
      // Longer pauses for punctuation
      if (['.', '!', '?'].includes(char)) {
        finalSpeed *= 4 // 4x longer pause
      } else if ([',', ';', ':'].includes(char)) {
        finalSpeed *= 2 // 2x longer pause
      } else if (char === ' ') {
        finalSpeed *= 0.8 // Slightly faster for spaces
      }
    }
    
    return finalSpeed
  }, [variableSpeed, pauseOnPunctuation])

  // Main typing effect
  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsTyping(false)
      setIsComplete(true)
      if (onComplete) onComplete()
      return
    }

    const startTyping = () => {
      setIsTyping(true)
      
      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex]
          const typingSpeed = getTypingSpeed(char, speed)
          
          timeoutRef.current = setTimeout(() => {
            setDisplayedText(prev => prev + char)
            setCurrentIndex(prev => prev + 1)
            
            // Trigger onType callback for sound effects
            if (onType) onType()
          }, typingSpeed)
        }
      }

      // Start typing immediately or after delay
      if (currentIndex === 0 && startDelay > 0) {
        timeoutRef.current = setTimeout(typeNextCharacter, startDelay)
      } else {
        typeNextCharacter()
      }
    }

    startTyping()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, text, speed, getTypingSpeed, onType, onComplete, startDelay])

  // Cursor blinking effect - only blinks when not typing
  useEffect(() => {
    if (!showCursor) return

    const blinkCursor = () => {
      // If typing, keep cursor solid, otherwise blink
      if (isTyping && !isComplete) {
        setCursorVisible(true)
        cursorTimeoutRef.current = setTimeout(blinkCursor, 50)
      } else {
        setCursorVisible(prev => !prev)
        cursorTimeoutRef.current = setTimeout(blinkCursor, 500)
      }
    }

    blinkCursor()

    return () => {
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current)
    }
  }, [isTyping, isComplete, showCursor])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current)
    }
  }, [])

  return (
    <div 
      className={cn("font-mono", className)}
      style={{
        minHeight: '1.2em' // Prevent layout shift
      }}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <span 
          className={cn(
            "ml-1 transition-opacity duration-100",
            cursorVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {cursorChar}
        </span>
      )}
    </div>
  )
}
