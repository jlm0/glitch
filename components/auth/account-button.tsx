"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, Shield, CreditCard, ChevronDown, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"

export function AccountButton() {
  const [isHovering, setIsHovering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useUser()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!user) return null

  const menuItems = [
    { icon: User, label: "Profile", onClick: () => console.log("Profile clicked") },
    { icon: Settings, label: "Settings", onClick: () => console.log("Settings clicked") },
    { icon: Shield, label: "Security", onClick: () => console.log("Security clicked") },
    { icon: CreditCard, label: "Billing", onClick: () => console.log("Billing clicked") },
    { icon: LogOut, label: "Logout", onClick: logout, danger: true },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className={cn(
          "border border-gray-500/50 bg-black/40 text-white hover:text-gray-300 hover:border-gray-400/50 relative overflow-hidden group h-12 py-1.5 px-2.5",
          isHovering ? "button-glitch-shake" : "",
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {/* Square profile image */}
          <div className="w-7 h-7 overflow-hidden border border-gray-500/50 flex-shrink-0">
            <img
              src={user.avatarUrl || "/placeholder.svg?height=28&width=28&query=cyberpunk+profile"}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Username and rank container */}
          <div className="flex flex-col items-start justify-center">
            {/* Username with verified badge */}
            <div className="flex items-center gap-1">
              <span className="glitch-text-subtle text-sm font-medium leading-tight" data-text={user.username}>
                {user.username}
              </span>
              <BadgeCheck className="h-3.5 w-3.5 text-white" />
            </div>

            {/* User rank/title */}
            <span className="text-[8px] text-gray-400 leading-tight">{user.role}</span>
          </div>

          <ChevronDown
            className={cn("h-3 w-3 transition-transform duration-200 ml-1", isOpen && "transform rotate-180")}
          />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {isHovering && (
          <>
            <span className="absolute inset-0 glitch-overlay-1"></span>
            <span className="absolute inset-0 glitch-overlay-2"></span>
          </>
        )}
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black/90 backdrop-blur-md border border-gray-800/50 overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-5 duration-300">
          <div className="py-2">
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-800/30">
              <p className="text-sm font-medium text-white">{user.username}</p>
              <p className="text-xs text-gray-400 mt-1">{user.email}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-300 mr-2">{user.role}</span>
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <span className="text-xs text-gray-400 ml-2">LEVEL 7</span>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="relative w-full text-left px-4 py-2 text-sm group hover:bg-gray-900/20"
                >
                  <div className="flex items-center">
                    <item.icon
                      className={cn(
                        "mr-3 h-4 w-4",
                        item.danger ? "text-gray-300" : "text-gray-400 group-hover:text-white",
                      )}
                    />
                    <span
                      className={cn(
                        "group-hover:translate-x-1 transition-transform duration-200",
                        item.danger ? "text-gray-300" : "text-gray-300 group-hover:text-white",
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
