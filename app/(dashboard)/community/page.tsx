import { GlitchText } from "@/components/effects/GlitchText/GlitchText";
import { TextScramble } from "@/components/effects/TextScramble/TextScramble";

export default function CommunityPage() {
  return (
    <div className="p-4 h-full">
      <div className="border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 h-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <h1 className="text-2xl font-display text-white mb-4">
          <GlitchText intensity="intense">COMMUNITY</GlitchText>
        </h1>
        <p className="text-gray-400">
          <TextScramble
            text="Connect with other users, join groups, and participate in discussions within the SOHMA network."
            scrambleInterval={15000}
            scrambleDuration={800}
            glitchIntensity={0.15}
          />
        </p>
      </div>
    </div>
  );
}
