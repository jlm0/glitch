import { GlitchText, TextScramble } from "@/components/effects";

export default function CommunityDetailPage({ params }: { params: { communityId: string } }) {
  // Mock community data - in a real app, you would fetch this based on the communityId
  const communityData = {
    sohma: {
      name: "SOHMA Core",
      description: "The official community for SOHMA platform users and developers.",
      members: 4289,
      online: 342,
      color: "from-gray-500 to-gray-600",
    },
    cyberpunk: {
      name: "Cyberpunk Collective",
      description: "A community for cyberpunk enthusiasts, discussing art, literature, and technology.",
      members: 2156,
      online: 187,
      color: "from-gray-500 to-gray-600",
    },
    neotokyo: {
      name: "Neo Tokyo",
      description: "Exploring the aesthetics and philosophy of futuristic urban environments.",
      members: 1893,
      online: 124,
      color: "from-gray-500 to-gray-600",
    },
    datarunners: {
      name: "Data Runners",
      description: "Information security specialists and digital privacy advocates.",
      members: 1245,
      online: 98,
      color: "from-gray-500 to-gray-600",
    },
    netrunners: {
      name: "Net Runners",
      description: "Virtual reality and neural interface technology discussions.",
      members: 876,
      online: 43,
      color: "from-gray-500 to-gray-600",
    },
    synthwave: {
      name: "Synthwave Collective",
      description: "Music, art, and culture inspired by 80s futurism and retro aesthetics.",
      members: 1567,
      online: 76,
      color: "from-gray-500 to-gray-600",
    },
  }[params.communityId] || {
    name: "Unknown Community",
    description: "This community doesn't exist or has been deleted.",
    members: 0,
    online: 0,
    color: "from-gray-500 to-gray-600",
  };

  return (
    <div className="p-4 h-full">
      <div className="border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 h-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-md bg-gradient-to-br ${communityData.color} flex items-center justify-center text-white`}>
            <span className="text-lg font-bold">{communityData.name.charAt(0)}</span>
          </div>

          <div>
            <h1 className="text-2xl font-display text-white">
              <GlitchText intensity="normal">{communityData.name}</GlitchText>
            </h1>
            <div className="text-sm text-gray-400">
              {communityData.members.toLocaleString()} members • {communityData.online.toLocaleString()} online
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          <TextScramble
            text={communityData.description}
            scrambleInterval={15000}
            scrambleDuration={800}
            glitchIntensity={0.15}
          />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-700/50 rounded-sm bg-black/40 p-4">
            <h2 className="text-lg text-white mb-2">Recent Activity</h2>
            <div className="text-gray-500 text-sm italic">No recent activity to display</div>
          </div>

          <div className="border border-gray-700/50 rounded-sm bg-black/40 p-4">
            <h2 className="text-lg text-white mb-2">Community Resources</h2>
            <div className="text-gray-500 text-sm italic">No resources available</div>
          </div>
        </div>
      </div>
    </div>
  );
}
