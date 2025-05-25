"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NoiseBackground } from "@/components/noise-background"
import { Scanlines } from "@/components/scanlines"
import { TypewriterText } from "@/components/typewriter-text"
import { LoadingIndicator } from "@/components/loading-indicator"
import { cn } from "@/lib/utils"
import { TextScramble } from "@/components/text-scramble"
import { GoogleIcon } from "@/components/icons/google-icon"
import { XIcon } from "@/components/icons/x-icon"
import { DiscordIcon } from "@/components/icons/discord-icon"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, AlertCircle } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isHovering, setIsHovering] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [glitchButton, setGlitchButton] = useState<string | null>(null)
  const [systemAlertLevel, setSystemAlertLevel] = useState<"normal" | "elevated">("normal")

  // Loading state management
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [animationsStarted, setAnimationsStarted] = useState(false)

  // Typewriter state management
  const [typingPhase, setTypingPhase] = useState<"initial" | "scrambling" | "secondary">("initial")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Initial typewriter text - much longer as requested
  const initialTypewriterText =
    "SOHMA NEURAL INTERFACE V.2.077 >> INITIALIZING QUANTUM ENCRYPTION... ESTABLISHING SECURE UPLINK TO MAINFRAME... BIOMETRIC SCANNERS ACTIVE... AUTHENTICATION PROTOCOLS LOADED... NEURAL HANDSHAKE INITIATED... SYNAPTIC BRIDGE ESTABLISHED... QUANTUM ENTANGLEMENT VERIFIED... MEMORY CORE ACCESSED... IDENTITY MATRIX CALIBRATED... REALITY FILTERS ENGAGED... CONSCIOUSNESS STREAM STABILIZED... NEOCORTEX LINK ONLINE... AWAITING USER VERIFICATION..."

  // Secondary typewriter text after scramble
  const secondaryTypewriterText =
    "WELCOME TO SOHMA NETWORK. THIS SYSTEM IS CLASSIFIED. UNAUTHORIZED ACCESS WILL BE TRACED AND PROSECUTED. ALL NEURAL ACTIVITY IS MONITORED. PROCEED WITH AUTHENTICATION TO ACCESS THE NETWORK. YOUR DIGITAL FOOTPRINT IS YOUR RESPONSIBILITY."

  // Start both animations simultaneously after component mounts
  useEffect(() => {
    // Use a small delay to ensure both components are rendered
    const startTimer = setTimeout(() => {
      setAnimationsStarted(true)
    }, 50)

    return () => clearTimeout(startTimer)
  }, [])

  // Start loading progress only after animations are triggered
  useEffect(() => {
    if (!animationsStarted) return

    const startTime = Date.now()
    const duration = 3000 // 3 seconds

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / duration) * 100, 100)

      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(progressInterval)
        setLoadingComplete(true)

        // Show content after loading completes with a small delay
        setTimeout(() => {
          setShowContent(true)
        }, 300)
      }
    }, 16) // ~60fps updates for smooth animation

    return () => {
      clearInterval(progressInterval)
    }
  }, [animationsStarted])

  // Simulate system alert changes that affect scramble intensity
  useEffect(() => {
    const alertTimer = setInterval(() => {
      setSystemAlertLevel((prev) => (prev === "normal" ? "elevated" : "normal"))
    }, 45000) // Change alert level every 45 seconds

    return () => clearInterval(alertTimer)
  }, [])

  // Reduced frequency glitch effects - now every 12-18 seconds randomly
  useEffect(() => {
    if (!showContent) return

    const scheduleNextGlitch = () => {
      const randomDelay = Math.random() * 6000 + 12000 // 12-18 seconds
      setTimeout(() => {
        const buttons = ["google", "x", "discord"]
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)]
        setGlitchButton(randomButton)

        setTimeout(() => {
          setGlitchButton(null)
          scheduleNextGlitch() // Schedule the next one
        }, 600)
      }, randomDelay)
    }

    scheduleNextGlitch()
  }, [showContent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/home")
  }

  // Handle typewriter completion
  const handleInitialTypingComplete = () => {
    setTypingComplete(true)

    // After initial typing is complete, wait a moment then start scrambling
    setTimeout(() => {
      setTypingPhase("scrambling")

      // After a brief scrambling period, show the secondary message
      setTimeout(() => {
        setTypingPhase("secondary")
      }, 1500)
    }, 1000)
  }

  const glitchStyles = `
  .glitch-text-enhanced {
    position: relative;
    display: inline-block;
  }
  
  .glitch-text-enhanced::before,
  .glitch-text-enhanced::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch-text-enhanced::before {
    left: -2px;
    text-shadow: -1px 0 rgba(255, 255, 255, 0.7);
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    animation: glitch-enhanced 2s infinite linear alternate-reverse;
  }
  
  .glitch-text-enhanced::after {
    left: 2px;
    text-shadow: 1px 0 rgba(200, 200, 200, 0.7);
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    animation: glitch-enhanced 3s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-enhanced {
    0% {
      transform: translateX(-2px) skew(0.5deg);
    }
    10% {
      transform: translateX(2px) skew(-0.5deg);
    }
    20% {
      transform: translateX(-1px) skew(0.25deg);
    }
    30% {
      transform: translateX(1px) skew(-0.25deg);
    }
    40% {
      transform: translateX(-0.5px) skew(0.1deg);
    }
    50% {
      transform: translateX(0.5px) skew(-0.1deg);
    }
    60% {
      transform: translateX(-0.25px) skew(0.05deg);
    }
    70% {
      transform: translateX(0.25px) skew(-0.05deg);
    }
    80% {
      transform: translateX(-0.1px) skew(0.025deg);
    }
    90% {
      transform: translateX(0.1px) skew(-0.025deg);
    }
    100% {
      transform: translateX(0);
    }
  }
`

  return (
    <>
      <style jsx>{glitchStyles}</style>
      <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
        {/* Background elements */}
        <NoiseBackground />
        <Scanlines />

        {/* Main content with proper layout */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Loading indicator - only shown until loading is complete */}
          {!loadingComplete && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div
                className={cn(
                  "transition-all duration-500",
                  animationsStarted ? "opacity-100 scale-100" : "opacity-0 scale-95",
                )}
              >
                <LoadingIndicator progress={loadingProgress} />
              </div>
            </div>
          )}

          {/* Two-column layout - only shown after loading is complete */}
          {showContent && (
            <div className="flex-1 flex flex-col md:flex-row">
              {/* Left column - Typewriter text */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center">
                <div className="max-w-xl mx-auto">
                  {typingPhase === "initial" && (
                    <TypewriterText
                      text={initialTypewriterText}
                      speed={15}
                      startDelay={0}
                      variableSpeed={true}
                      pauseOnPunctuation={true}
                      cursorChar="█"
                      onComplete={handleInitialTypingComplete}
                      className="text-white font-mono text-sm md:text-base leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    />
                  )}

                  {typingPhase === "scrambling" && (
                    <TextScramble
                      text={initialTypewriterText}
                      className="text-white font-mono text-sm md:text-base leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      scrambleInterval={100}
                      scrambleDuration={1500}
                      glitchIntensity={0.8}
                    />
                  )}

                  {typingPhase === "secondary" && (
                    <TypewriterText
                      text={secondaryTypewriterText}
                      speed={20}
                      startDelay={0}
                      variableSpeed={true}
                      pauseOnPunctuation={true}
                      cursorChar="█"
                      className="text-white font-mono text-sm md:text-base leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    />
                  )}
                </div>
              </div>

              {/* Right column - Auth content with card container */}
              <div className="w-full md:w-1/2 p-4 md:p-6 flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <div className="border border-gray-500/50 rounded-lg bg-black/70 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden relative h-full min-h-[700px] flex flex-col justify-center">
                    {/* Security scanner effect */}
                    <div className="security-scanner"></div>

                    {/* Card content with proper padding */}
                    <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                      {/* Auth content - extracted from AuthCard but with card container */}
                      <div className="flex flex-col space-y-4 text-center mb-10">
                        <div className="flex items-center justify-center gap-3">
                          <h2 className="text-4xl font-display text-white">
                            <span className="glitch-text-enhanced" data-text="SOHMA">
                              SOHMA
                            </span>
                          </h2>
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-1000",
                              systemAlertLevel === "elevated"
                                ? "bg-gray-300 shadow-[0_0_8px_rgba(200,200,200,0.6)] animate-pulse"
                                : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]",
                            )}
                          ></div>
                        </div>
                        <TextScramble
                          text="Neural interface authentication required"
                          className="text-gray-400 text-sm"
                          scrambleInterval={systemAlertLevel === "elevated" ? 8000 : 15000}
                          scrambleDuration={systemAlertLevel === "elevated" ? 1200 : 800}
                          glitchIntensity={systemAlertLevel === "elevated" ? 0.4 : 0.2}
                        />
                      </div>

                      {/* Email form */}
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2 relative">
                          <label htmlFor="email" className="text-sm text-gray-400 font-mono">
                            <TextScramble
                              text="AUTHENTICATION ID"
                              scrambleInterval={18000}
                              scrambleDuration={600}
                              glitchIntensity={0.4}
                            />
                          </label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={cn(
                                "bg-black/60 border-gray-800/50 focus:border-white text-white transition-all duration-300 h-12",
                                focusedInput === "email" && "neural-interface-glow",
                              )}
                              placeholder="user@sohma.net"
                              onFocus={() => setFocusedInput("email")}
                              onBlur={() => setFocusedInput(null)}
                            />
                            {focusedInput === "email" && (
                              <div className="absolute inset-0 rounded-md pointer-events-none neural-interface-scan"></div>
                            )}
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-white hover:to-gray-300 text-white hover:text-black relative overflow-hidden group font-display text-sm"
                          onMouseEnter={() => setIsHovering("submit")}
                          onMouseLeave={() => setIsHovering(null)}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <TextScramble
                              text="INITIATE CONNECTION"
                              scrambleInterval={12000}
                              scrambleDuration={1000}
                              glitchIntensity={0.3}
                            />
                            <ArrowRight className="h-4 w-4" />
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>

                          {/* Hover glitch effect */}
                          {isHovering === "submit" && (
                            <>
                              <span className="absolute inset-0 glitch-overlay-1"></span>
                              <span className="absolute inset-0 glitch-overlay-2"></span>
                            </>
                          )}
                        </Button>
                      </form>

                      {/* Divider */}
                      <div className="flex items-center gap-4 my-8">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent"></div>
                        <span className="text-xs text-gray-500 px-2 bg-black/50 rounded">ALTERNATIVE ACCESS</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent"></div>
                      </div>

                      {/* Social login options - horizontal row of icon buttons */}
                      <div className="flex justify-center space-x-4 mb-8">
                        {/* Google login */}
                        <button
                          className={cn("relative group", glitchButton === "google" && "oauth-button-glitch")}
                          onMouseEnter={() => setIsHovering("google")}
                          onMouseLeave={() => setIsHovering(null)}
                          onClick={() => router.push("/home")}
                          aria-label="Continue with Google"
                        >
                          <div
                            className={cn(
                              "w-12 h-12 flex items-center justify-center rounded-md border border-gray-800/30 hover:border-gray-400/50 bg-black/40 text-gray-300 hover:text-white transition-all duration-300 relative",
                              glitchButton === "google" && "oauth-content-glitch",
                            )}
                          >
                            <GoogleIcon />

                            {/* Hover effect */}
                            {isHovering === "google" && (
                              <>
                                <span className="absolute inset-0 bg-gray-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              </>
                            )}

                            {/* Digital distortion overlay */}
                            {glitchButton === "google" && (
                              <div className="absolute inset-0 digital-distortion pointer-events-none"></div>
                            )}
                          </div>
                        </button>

                        {/* X (Twitter) login */}
                        <button
                          className={cn("relative group", glitchButton === "x" && "oauth-button-glitch")}
                          onMouseEnter={() => setIsHovering("x")}
                          onMouseLeave={() => setIsHovering(null)}
                          onClick={() => router.push("/home")}
                          aria-label="Continue with X"
                        >
                          <div
                            className={cn(
                              "w-12 h-12 flex items-center justify-center rounded-md border border-gray-800/30 hover:border-gray-400/50 bg-black/40 text-gray-300 hover:text-white transition-all duration-300 relative",
                              glitchButton === "x" && "oauth-content-glitch",
                            )}
                          >
                            <XIcon />

                            {/* Hover effect */}
                            {isHovering === "x" && (
                              <>
                                <span className="absolute inset-0 bg-gray-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              </>
                            )}

                            {/* Digital distortion overlay */}
                            {glitchButton === "x" && (
                              <div className="absolute inset-0 digital-distortion pointer-events-none"></div>
                            )}
                          </div>
                        </button>

                        {/* Discord login */}
                        <button
                          className={cn("relative group", glitchButton === "discord" && "oauth-button-glitch")}
                          onMouseEnter={() => setIsHovering("discord")}
                          onMouseLeave={() => setIsHovering(null)}
                          onClick={() => router.push("/home")}
                          aria-label="Continue with Discord"
                        >
                          <div
                            className={cn(
                              "w-12 h-12 flex items-center justify-center rounded-md border border-gray-800/30 hover:border-gray-400/50 bg-black/40 transition-all duration-300 relative",
                              glitchButton === "discord" && "oauth-content-glitch",
                            )}
                          >
                            <DiscordIcon />

                            {/* Hover effect */}
                            {isHovering === "discord" && (
                              <>
                                <span className="absolute inset-0 bg-gray-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              </>
                            )}

                            {/* Digital distortion overlay */}
                            {glitchButton === "discord" && (
                              <div className="absolute inset-0 digital-distortion pointer-events-none"></div>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Security notice with dynamic alert level */}
                      <div
                        className={cn(
                          "p-4 border rounded-md flex items-start gap-3 transition-all duration-1000",
                          systemAlertLevel === "elevated"
                            ? "bg-gray-900/20 border-gray-700/40"
                            : "bg-gray-950/20 border-gray-800/30",
                        )}
                      >
                        <AlertCircle
                          className={cn(
                            "h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-1000",
                            systemAlertLevel === "elevated" ? "text-gray-300" : "text-white",
                          )}
                        />
                        <p className="text-xs text-gray-400 leading-relaxed">
                          <TextScramble
                            text={
                              systemAlertLevel === "elevated"
                                ? "ELEVATED SECURITY PROTOCOLS ACTIVE. Enhanced quantum encryption engaged for maximum protection."
                                : "Quantum-encrypted connection established. All data transmitted through SOHMA security protocols."
                            }
                            scrambleInterval={systemAlertLevel === "elevated" ? 12000 : 22000}
                            scrambleDuration={systemAlertLevel === "elevated" ? 1800 : 1200}
                            glitchIntensity={systemAlertLevel === "elevated" ? 0.25 : 0.15}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - same as original */}
        <footer
          className={cn(
            "relative z-10 w-full border-t border-cyan-900/30 bg-black/70 backdrop-blur-md",
            "transition-all duration-1000 ease-out",
            "opacity-100", // Always visible
            !showContent ? "translate-y-full" : "translate-y-0", // Slide up when content is shown
          )}
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              {/* System status section with better layout */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-500 animate-pulse",
                    showContent
                      ? systemAlertLevel === "elevated"
                        ? "bg-gray-300 shadow-[0_0_8px_rgba(200,200,200,0.6)]"
                        : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "bg-gray-500 shadow-[0_0_8px_rgba(150,150,150,0.6)]",
                  )}
                ></div>
                <div
                  className={cn(
                    "ekg-container transition-all duration-500",
                    !showContent || systemAlertLevel === "elevated" ? "checking-ekg" : "",
                  )}
                >
                  <div className="ekg-line"></div>
                </div>
                <div
                  className={cn(
                    "text-xs font-mono transition-all duration-500 whitespace-nowrap",
                    showContent ? (systemAlertLevel === "elevated" ? "text-gray-300" : "text-white") : "text-gray-400",
                  )}
                >
                  NEURAL LINK: {!showContent && <span>INITIALIZING</span>}
                  {showContent && systemAlertLevel === "elevated" && (
                    <span className="status-checking">CONNECTING</span>
                  )}
                  {showContent && systemAlertLevel !== "elevated" && <span>ACTIVE</span>}
                </div>
              </div>

              {/* Security and copyright */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-gray-300/70 whitespace-nowrap">SEC: MAX</div>
                <div className="text-gray-500 whitespace-nowrap">SOHMA © 2077</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
