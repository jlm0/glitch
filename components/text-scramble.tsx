"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
  text: string
  className?: string
  scrambleInterval?: number // How often to trigger the scramble effect (ms)
  scrambleDuration?: number // How long the scramble effect lasts (ms)
  glitchIntensity?: number // For glitch mode: how many letters to scramble (0-1)
}

enum ScrambleMode {
  FULL = 'full',        // Progressive scramble (current behavior)
  GLITCH = 'glitch',    // Only scramble a few random letters
  COMPLETE = 'complete' // Scramble all letters at once then restore
}

export function TextScramble({
  text,
  className,
  scrambleInterval = 8000, // Default: trigger every 8 seconds
  scrambleDuration = 1500, // Default: scramble for 1.5 seconds
  glitchIntensity = 0.3, // Default: scramble 30% of letters in glitch mode
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  // Characters to use for scrambling
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    // Set initial text
    setDisplayText(text)

    // Do a full scramble on mount
    setTimeout(() => {
      scrambleText(ScrambleMode.FULL)
    }, 300)

    // Set up interval to trigger random scramble effects
    const intervalId = setInterval(() => {
      // Randomly choose scramble mode with weighted probabilities
      const rand = Math.random()
      let mode: ScrambleMode
      
      if (rand < 0.5) {
        mode = ScrambleMode.GLITCH // 50% chance
      } else if (rand < 0.8) {
        mode = ScrambleMode.FULL // 30% chance
      } else {
        mode = ScrambleMode.COMPLETE // 20% chance
      }

      scrambleText(mode)
    }, scrambleInterval)

    return () => clearInterval(intervalId)
  }, [text, scrambleInterval])

  const scrambleText = (mode: ScrambleMode = ScrambleMode.FULL) => {
    if (isScrambling) return // Prevent overlapping scrambles

    setIsScrambling(true)

    if (mode === ScrambleMode.GLITCH) {
      glitchScramble()
    } else if (mode === ScrambleMode.COMPLETE) {
      completeScramble()
    } else {
      fullScramble()
    }
  }

  const glitchScramble = () => {
    const numLettersToScramble = Math.floor(text.length * glitchIntensity)
    const lettersToScramble = new Set<number>()
    
    // Randomly select letters to scramble
    while (lettersToScramble.size < numLettersToScramble) {
      lettersToScramble.add(Math.floor(Math.random() * text.length))
    }

    let glitchIterations = 0
    const maxGlitchIterations = Math.floor(scrambleDuration / 60) // Faster for glitch

    const intervalId = setInterval(() => {
      setDisplayText(() => {
        let newText = ""
        for (let i = 0; i < text.length; i++) {
          if (lettersToScramble.has(i) && Math.random() < 0.7) {
            // Scramble this letter
            newText += chars[Math.floor(Math.random() * chars.length)]
          } else {
            // Keep original letter
            newText += text[i]
          }
        }
        return newText
      })

      glitchIterations += 1

      if (glitchIterations >= maxGlitchIterations) {
        clearInterval(intervalId)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 60)
  }

  const completeScramble = () => {
    let iteration = 0
    const maxIterations = Math.floor(scrambleDuration / 40)

    const intervalId = setInterval(() => {
      if (iteration < maxIterations * 0.6) {
        // Scramble all letters
        setDisplayText(() => {
          let newText = ""
          for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
              newText += ' ' // Keep spaces
            } else {
              newText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          return newText
        })
      } else {
        // Gradually restore
        const restoreProgress = (iteration - maxIterations * 0.6) / (maxIterations * 0.4)
        const restoreIndex = Math.floor(text.length * restoreProgress)

        setDisplayText(() => {
          let newText = ""
          for (let i = 0; i < text.length; i++) {
            if (i < restoreIndex) {
              newText += text[i]
            } else if (text[i] === ' ') {
              newText += ' '
            } else {
              newText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          return newText
        })
      }

      iteration += 1

      if (iteration >= maxIterations) {
        clearInterval(intervalId)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 40)
  }

  const fullScramble = () => {
    let iteration = 0
    const maxIterations = Math.floor(scrambleDuration / 30)

    const intervalId = setInterval(() => {
      setDisplayText(() => {
        const progress = iteration / maxIterations
        const restoreIndex = Math.floor(text.length * progress)

        let newText = ""
        for (let i = 0; i < text.length; i++) {
          if (i < restoreIndex) {
            newText += text[i]
          } else {
            if (Math.random() < 0.2) {
              newText += text[i]
            } else {
              newText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
        }

        return newText
      })

      iteration += 1

      if (iteration >= maxIterations) {
        clearInterval(intervalId)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }

  return <span className={cn(className, isScrambling && "text-scramble-active")}>{displayText}</span>
}
