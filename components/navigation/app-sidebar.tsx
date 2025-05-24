"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Newspaper, Users, MessageCircle, TrendingUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/home",
  },
  {
    icon: Newspaper,
    label: "Feed",
    href: "/feed",
  },
  {
    icon: Users,
    label: "Community",
    href: "/community",
    matchPattern: /^\/community(\/.*)?$/,
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: TrendingUp,
    label: "Market",
    href: "/market",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [showBorderAnimation, setShowBorderAnimation] = useState(false)

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
      }, 30000) // Trigger every 30 seconds

      return () => clearInterval(intervalId)
    }, 5000)

    return () => clearTimeout(initialDelay)
  }, [])

  return (
    <Sidebar
      collapsible="icon"
      className={`border-r border-gray-800/30 bg-black/80 backdrop-blur-sm border-pulse-animation ${showBorderAnimation ? "active" : ""}`}
    >
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="text-xl font-bold text-white tracking-wider glitch-text-container">
          <span className="glitch-text" data-text="NEOCITY">
            NEOCITY
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            // Check if the current path matches this menu item
            const isActive = item.matchPattern ? item.matchPattern.test(pathname) : pathname === item.href

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={isActive} className="cyberpunk-menu-item group">
                  <Link href={item.href} className="relative">
                    <div className="relative z-10 flex items-center">
                      <item.icon
                        className={cn(
                          "size-5 transition-all duration-300 group-hover:text-gray-300",
                          isActive ? "text-white" : "text-gray-500",
                        )}
                      />
                      <span
                        className={cn(
                          "ml-2 transition-all duration-300 group-hover:text-gray-300",
                          isActive ? "text-white" : "text-gray-500",
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gray-800/0 group-hover:bg-gray-800/20 transition-all duration-300 border-l-0 group-hover:border-l-2 border-gray-400"></div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
