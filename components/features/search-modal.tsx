"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, Clock, Zap, ArrowRight } from "lucide-react"
import { useSearch } from "@/contexts/search-context"
import { cn } from "@/lib/utils"

// Sample data for recent and suggested searches
const recentSearches = ["neural implants", "quantum encryption", "cybernetic enhancements", "digital consciousness"]

const suggestedSearches = [
  "network security",
  "neural interface updates",
  "digital identity protection",
  "synthetic reality",
  "memory augmentation",
]

export function SearchModal() {
  const { isOpen, closeSearch } = useSearch()
  const [searchValue, setSearchValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [hoverClose, setHoverClose] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeSearch])

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue)
      // Here you would handle the actual search
    }
  }

  // Handle clicking a search suggestion
  const handleSearchClick = (search: string) => {
    setSearchValue(search)
    inputRef.current?.focus()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with reduced blur and white overlay */}
      <div className="absolute inset-0 bg-white/15 backdrop-blur-sm" onClick={closeSearch}>
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>

        {/* Animated glitch lines */}
        <div className="absolute h-[1px] bg-white/10 left-0 right-0 top-[30%] glitch-line-1"></div>
        <div className="absolute h-[1px] bg-gray-400/10 left-0 right-0 top-[60%] glitch-line-2"></div>
        <div className="absolute w-[1px] bg-white/10 top-0 bottom-0 left-[25%] glitch-line-3"></div>
        <div className="absolute w-[1px] bg-gray-400/10 top-0 bottom-0 left-[75%] glitch-line-4"></div>
      </div>

      {/* Search modal container */}
      <div
        ref={modalRef}
        className={cn(
          "w-full max-w-3xl relative z-10 transition-all duration-300 px-4",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
          glitchEffect && "oauth-button-glitch",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close button - positioned above and aligned to right */}
          <button
            type="button"
            onClick={closeSearch}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            className={cn(
              "absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300",
              hoverClose
                ? "bg-gray-900/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                : "text-gray-500 hover:text-gray-300",
            )}
            aria-label="Close search"
          >
            <X className="w-5 h-5" />

            {/* Hover glitch effect - same as sidebar/topbar */}
            {hoverClose && (
              <>
                <span className="absolute inset-0 bg-gray-500/10 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 hover:opacity-100 transition-opacity"></span>
              </>
            )}
          </button>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              {/* Search icon */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="w-5 h-5" />
              </div>

              {/* Search input */}
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search SOHMA network..."
                className={cn(
                  "w-full h-16 pl-14 pr-5 bg-black/90 border border-gray-800/50 rounded-md text-white placeholder-gray-500",
                  "focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30",
                  "font-mono text-lg transition-all duration-300",
                  isFocused && "neural-interface-glow h-20",
                )}
              />

              {/* Neural interface scan effect */}
              {isFocused && (
                <div className="absolute inset-0 rounded-md pointer-events-none neural-interface-scan"></div>
              )}
            </div>

            {/* Recent and suggested searches - only show when focused */}
            <div
              className={cn(
                "mt-2 bg-black/90 border border-gray-800/50 rounded-md overflow-hidden transition-all duration-300 origin-top",
                isFocused
                  ? "max-h-[400px] opacity-100 scale-y-100 transform-gpu"
                  : "max-h-0 opacity-0 scale-y-0 transform-gpu",
              )}
            >
              {/* Recent searches */}
              <div className="p-4 border-b border-gray-800/30">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Recent Searches</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchClick(search)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-800/30 transition-colors text-left group"
                    >
                      <Clock className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested searches */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Suggested</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchClick(search)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-800/30 transition-colors text-left group"
                    >
                      <Zap className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                      <span className="text-sm">{search}</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
