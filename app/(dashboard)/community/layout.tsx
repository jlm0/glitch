import type React from "react"
import { CommunitySidebar } from "@/components/community-sidebar"

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <CommunitySidebar />
      <div className="flex-1 h-full">{children}</div>
    </div>
  )
}
