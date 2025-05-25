import { ChatSidebar } from "@/components/chat-sidebar"

export default function ChatPage() {
  return (
    <div className="flex h-full">
      {/* Chat sidebar - flush with main sidebar */}
      <ChatSidebar />

      {/* Main chat content */}
      <div className="flex-1 p-4 h-full">
        <div className="border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 h-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <h1 className="text-2xl font-display text-white mb-4 glitch-text-container">
            <span className="glitch-text" data-text="CHAT">
              CHAT
            </span>
          </h1>
          <p className="text-gray-400">
            Communicate securely with other users through encrypted messaging on the SOHMA platform.
          </p>
        </div>
      </div>
    </div>
  )
}
