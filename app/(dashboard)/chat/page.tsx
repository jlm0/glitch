import { ChatSidebar } from "@/components/navigation/chat-sidebar"
import { GlitchText, TextScramble } from "@/components/effects"

export default function ChatPage() {
  return (
    <div className="flex h-full">
      <ChatSidebar />
      <div className="flex-1 p-4 h-full">
        <div className="border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 h-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <h1 className="text-2xl font-display text-white mb-4">
            <GlitchText intensity="normal">
              CHAT
            </GlitchText>
          </h1>
          <p className="text-gray-400">
            <TextScramble 
              text="Communicate securely with other users through encrypted messaging on the SOHMA platform."
              scrambleInterval={15000}
              scrambleDuration={800}
              glitchIntensity={0.15}
            />
          </p>
        </div>
      </div>
    </div>
  )
}
