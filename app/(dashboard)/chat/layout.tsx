import type React from "react"
import { ChatSidebar } from "@/components/navigation/chat-sidebar"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <ChatSidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
