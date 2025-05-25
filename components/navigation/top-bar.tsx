"use client"

import { usePathname } from "next/navigation"
import { AccountButton } from "@/components/auth/account-button"
import { useState, useEffect } from "react"
import { Search, Wallet, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearch } from "@/contexts/search-context"
import { useWallet } from "@/contexts/wallet-context"
import { useNotifications } from "@/contexts/notification-context"
import { NotificationDropdown } from "@/components/features/notification-dropdown"

export function TopBar() {
  const pathname = usePathname()
  const [showBorderAnimation, setShowBorderAnimation] = useState(false)
  const [hoverIcon, setHoverIcon] = useState<string | null>(null)
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const { isOpen: isSearchOpen, toggleSearch } = useSearch()
  const { isOpen: isWalletOpen, toggleWallet } = useWallet()
  const { isOpen: isNotificationsOpen, toggleNotifications, unreadCount } = useNotifications()

  // Format the pathname for display
  // Remove the leading slash and the "home" part if present
  const path = pathname.startsWith("/home") ? pathname.slice(5) : pathname.slice(1)
  const formattedPath = path === "" ? "HOME" : path.toUpperCase().replace(/-/g, " ")

  // Occasionally show the border animation
  useEffect(() => {
    const triggerAnimation = () => {
      setShowBorderAnimation(true)

      // Hide animation after it completes
      setTimeout(() => {
        setShowBorderAnimation(false)
      }, 8000) // Animation duration
    }

    // Initial delay before first animation
    const initialDelay = setTimeout(() => {
      triggerAnimation()

      // Set up interval for occasional animations
      const intervalId = setInterval(() => {
        triggerAnimation()
      }, 45000) // Trigger every 45 seconds (different timing than sidebar for variety)

      return () => clearInterval(intervalId)
    }, 10000) // Start after sidebar animation

    return () => clearTimeout(initialDelay)
  }, [])

  // Top bar action buttons with the same styling as sidebar
  const actionButtons = [
    {
      icon: Search,
      label: "Search",
      id: "search",
      onClick: toggleSearch,
      isActive: isSearchOpen,
    },
    {
      icon: Wallet,
      label: "Wallet",
      id: "wallet",
      onClick: toggleWallet,
      isActive: isWalletOpen,
    },
    {
      icon: Bell,
      label: "Notifications",
      id: "notifications",
      onClick: toggleNotifications,
      badge: unreadCount > 0 ? unreadCount : undefined,
      isActive: isNotificationsOpen,
    },
  ]

  return (
    <div
      className={`h-16 border-b border-gray-800/30 bg-black/80 backdrop-blur-sm flex items-center justify-between px-4 relative z-20 border-pulse-animation ${showBorderAnimation ? "active" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-white font-display tracking-wider flex items-center">
          <span className="text-gray-300 mr-1">/</span>
          <span className="glitch-text-subtle" data-text={formattedPath}>
            {formattedPath}
          </span>
        </div>
      </div>

      {/* Top bar actions - styled exactly like sidebar buttons */}
      <div className="flex items-center gap-3">
        {actionButtons.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative",
              item.id === "notifications" && "overflow-visible", // Allow notification dropdown to extend beyond bounds
            )}
          >
            <button
              className="relative group"
              onClick={item.onClick}
              onMouseEnter={() => setHoverIcon(item.id)}
              onMouseLeave={() => setHoverIcon(null)}
              aria-label={item.label}
            >
              {/* Icon container with hover and active effects - exactly like sidebar */}
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300 relative",
                  item.isActive
                    ? "bg-gray-900/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    : "text-gray-500 hover:text-gray-300",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    hoverIcon === item.id && !item.isActive && "scale-110",
                  )}
                />

                {/* Badge for notifications */}
                {item.badge && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 text-[10px] font-bold bg-white text-black rounded-full px-1 z-10">
                    {item.badge}
                  </span>
                )}

                {/* Active indicator - same as sidebar */}
                {item.isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-b-sm shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
                )}

                {/* Hover glitch effect - same as sidebar */}
                {hoverIcon === item.id && (
                  <>
                    <span className="absolute inset-0 bg-gray-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                    <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </>
                )}
              </div>

              {/* Tooltip - same as sidebar but positioned below */}
              <div
                className={cn(
                  "absolute top-14 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-gray-800/50 px-3 py-1 rounded-sm text-xs font-mono",
                  "opacity-0 invisible translate-y-2 transition-all duration-300 whitespace-nowrap z-50",
                  "before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-black/80 before:rotate-45 before:border-t before:border-l before:border-gray-800/50",
                  hoverIcon === item.id && !item.isActive ? "opacity-100 visible translate-y-0" : "",
                )}
              >
                <span className="text-white">{item.label}</span>
              </div>
            </button>

            {/* Render notification dropdown outside the button for proper positioning */}
            {item.id === "notifications" && isNotificationsOpen && <NotificationDropdown />}
          </div>
        ))}

        <AccountButton />
      </div>
    </div>
  )
}
