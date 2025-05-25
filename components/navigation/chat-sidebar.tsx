"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, MessageSquare, Star, Archive, Search, Plus, MoreVertical } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Mock data for chat conversations
const chatGroups = [
  {
    id: "direct",
    name: "Direct Messages",
    icon: MessageSquare,
    chats: [
      { id: "user1", name: "Alex_Cybr", avatar: "/cyberpunk-avatar.png", active: true, unread: 3 },
      { id: "user2", name: "NeonRider", avatar: "/cyberpunk-blue-hair.png", active: false, unread: 0 },
      { id: "user3", name: "SyntaxError", avatar: null, active: true, unread: 1 },
      { id: "user4", name: "QuantumHacker", avatar: null, active: false, unread: 0 },
    ],
  },
  {
    id: "groups",
    name: "Group Chats",
    icon: Users,
    chats: [
      { id: "group1", name: "SOHMA Core", avatar: null, active: false, unread: 5 },
      { id: "group2", name: "Cyber Collective", avatar: null, active: false, unread: 0 },
    ],
  },
  {
    id: "starred",
    name: "Starred",
    icon: Star,
    chats: [{ id: "starred1", name: "Important Updates", avatar: null, active: false, unread: 2 }],
  },
  {
    id: "archived",
    name: "Archived",
    icon: Archive,
    chats: [],
  },
]

export function ChatSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SidebarProvider>
      <Sidebar className="w-64 shrink-0 bg-black/80 border-r border-gray-500/30" collapsible={false}>
        <SidebarHeader className="p-0">
          <div className="p-3 border-b border-gray-500/30">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-gray-900/50 border border-gray-500/30 rounded-md pl-8 pr-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="mt-2 w-full flex items-center justify-center gap-1 bg-cyan-900/30 hover:bg-cyan-800/40 text-cyan-400 py-1.5 px-3 rounded-md text-sm transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-0">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {chatGroups.map((group) => (
              <div key={group.id} className="py-2">
                <div className="px-3 flex items-center justify-between text-xs text-gray-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <group.icon className="h-3.5 w-3.5" />
                    <span>{group.name}</span>
                  </div>
                  {group.chats.length > 0 && (
                    <button className="hover:text-gray-300">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <SidebarMenu>
                  {group.chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/chat/${chat.id}`}
                        className="px-3 py-2 h-auto"
                      >
                        <Link
                          href={`/chat/${chat.id}`}
                          className={cn(
                            "flex items-center gap-2 text-sm relative group",
                            pathname === `/chat/${chat.id}` ? "text-cyan-400" : "text-gray-300",
                          )}
                        >
                          {chat.avatar ? (
                            <div className="relative w-7 h-7">
                              <img
                                src={chat.avatar || "/placeholder.svg"}
                                alt={chat.name}
                                className="w-7 h-7 rounded-full object-cover border border-gray-700/50"
                              />
                              {chat.active && (
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black"></span>
                              )}
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs",
                                pathname === `/chat/${chat.id}`
                                  ? "bg-cyan-900/50 text-cyan-300"
                                  : "bg-gray-800 text-gray-300",
                              )}
                            >
                              {chat.name.charAt(0)}
                            </div>
                          )}
                          <span className="truncate flex-1">{chat.name}</span>
                          {chat.unread > 0 && (
                            <span className="bg-cyan-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                          <div className="absolute right-2 hidden group-hover:flex">
                            <button className="text-gray-400 hover:text-gray-200">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  {group.chats.length === 0 && (
                    <div className="px-3 py-2 text-xs text-gray-500 italic">No {group.name.toLowerCase()}</div>
                  )}
                </SidebarMenu>
              </div>
            ))}
          </div>
        </SidebarContent>

        <SidebarFooter className="p-0">
          <div className="p-3 border-t border-gray-500/30 flex items-center gap-2">
            <div className="relative">
              <img
                src="/cyberpunk-avatar.png"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-700/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-300 font-medium truncate">CyberUser_42</div>
              <div className="text-xs text-green-500">Online</div>
            </div>
            <button className="text-gray-400 hover:text-gray-200">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
