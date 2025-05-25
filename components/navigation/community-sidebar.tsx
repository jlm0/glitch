"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Compass } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for communities
const communitySections = [
  {
    id: "your",
    name: "Your Communities",
    communities: [
      {
        id: "sohma",
        name: "SOHMA Core",
        logo: "/stylized-initials-sc.png",
        color: "from-gray-500 to-gray-600",
        unread: 12,
        notifications: true,
      },
      {
        id: "cyberpunk",
        name: "Cyberpunk Collective",
        logo: "/intertwined-circles.png",
        color: "from-gray-500 to-gray-600",
        unread: 0,
        notifications: true,
      },
      {
        id: "neotokyo",
        name: "Neo Tokyo",
        logo: "/abstract-geometric-nt.png",
        color: "from-gray-500 to-gray-600",
        unread: 3,
        notifications: true,
      },
      {
        id: "datarunners",
        name: "Data Runners",
        logo: "/abstract-geometric-DR.png",
        color: "from-gray-500 to-gray-600",
        unread: 0,
        notifications: false,
      },
    ],
  },
  {
    id: "recommended",
    name: "Recommended",
    communities: [
      {
        id: "netrunners",
        name: "Net Runners",
        logo: "/abstract-geometric-nr.png",
        color: "from-gray-500 to-gray-600",
        unread: 0,
        notifications: false,
      },
      {
        id: "synthwave",
        name: "Synthwave Collective",
        logo: "/stylized-sw.png",
        color: "from-gray-500 to-gray-600",
        unread: 0,
        notifications: false,
      },
    ],
  },
]

export function CommunitySidebar() {
  const pathname = usePathname()
  const activeCommunityId = pathname.split("/")[2]

  return (
    <div className="relative z-20 h-full w-20 bg-black/80 backdrop-blur-sm border-r border-gray-800/30 flex flex-col items-center overflow-visible">
      {/* Community actions */}
      <div className="w-full py-3 flex flex-col items-center gap-2 border-b border-gray-800/30">
        {/* Add community button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-900/30 text-gray-400 hover:bg-gray-800/40 hover:text-white transition-colors"
          aria-label="Add community"
        >
          <Plus className="h-5 w-5" />
        </button>

        {/* Discover communities button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800/30 transition-colors"
          aria-label="Discover communities"
        >
          <Compass className="h-5 w-5" />
        </button>
      </div>

      {/* Community list - scrollable */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-visible py-2 flex flex-col items-center gap-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {communitySections.map((section) => (
          <div key={section.id} className="w-full flex flex-col items-center gap-1 mb-2">
            {section.communities.map((community) => (
              <Link key={community.id} href={`/community/${community.id}`} className="relative group">
                {/* Community icon with active/hover states */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-md flex items-center justify-center transition-all duration-300 relative",
                    activeCommunityId === community.id
                      ? "bg-gray-900/70 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      : "hover:bg-gray-800/30",
                  )}
                >
                  {/* Community logo/icon */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md bg-gradient-to-br flex items-center justify-center text-white overflow-hidden",
                      community.color,
                    )}
                  >
                    {community.logo ? (
                      <img
                        src={community.logo || "/placeholder.svg"}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold">{community.name.charAt(0)}</span>
                    )}
                  </div>

                  {/* Notification indicator */}
                  {community.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-white text-black text-[10px] rounded-full min-w-5 h-5 flex items-center justify-center px-1 border border-black font-bold">
                      {community.unread}
                    </div>
                  )}

                  {/* Active indicator */}
                  {activeCommunityId === community.id && (
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-sm shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
                  )}
                </div>

                {/* Tooltip on hover - positioned in a fixed container */}
                <div
                  className={cn(
                    "fixed left-20 ml-4 top-auto bg-black/90 backdrop-blur-sm border border-gray-800/50 px-2 py-1 rounded-sm text-xs",
                    "z-30 opacity-0 invisible translate-x-2 transition-all duration-300 whitespace-nowrap",
                    "group-hover:opacity-100 group-hover:visible group-hover:translate-x-0",
                  )}
                  style={{
                    top: "var(--tooltip-y, 50%)",
                    transform: "translateY(-50%)",
                  }}
                  onMouseEnter={(e) => {
                    // Get the y position of the parent link
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                    if (rect) {
                      e.currentTarget.style.setProperty("--tooltip-y", `${rect.top + rect.height / 2}px`)
                    }
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{community.name}</span>
                    <span className="text-gray-400 text-[10px]">
                      {community.notifications ? "Notifications on" : "Notifications off"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
