"use client";

import { useRef } from 'react'; // useEffect, useCallback, useState are no longer needed for sticky logic

// Define the Tailwind class for the top offset. 'top-4' usually means 'top: 1rem;' or '16px'.
// This should match the STICKY_TOP_OFFSET we were using.
const STICKY_TOP_CLASS = 'top-4'; 

export default function FeedPage() {
  const leftColumnRef = useRef<HTMLDivElement>(null); // Refs can still be useful for other purposes if needed
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const leftColumnItems = [
    { height: '150px', label: 'L Nav Item 1' }, { height: '100px', label: 'L Nav Item 2' },
    { height: '200px', label: 'L Nav Item 3' }, { height: '120px', label: 'L Nav Item 4' },
    { height: '180px', label: 'L Nav Item 5' }, { height: '160px', label: 'L Nav Item 6' },
    { height: '220px', label: 'L Nav Item 7' }, { height: '130px', label: 'L Nav Item 8' },
    { height: '800px', label: 'L Nav Tall Content Block' },
    { height: '100px', label: 'L Nav Item 9 (End)' },
  ];
  const rightColumnItems = [
    { height: '120px', label: 'R Trending 1' }, { height: '180px', label: 'R Trending 2' },
    { height: '100px', label: 'R Trending 3' }, { height: '150px', label: 'R Who to Follow' },
    { height: '200px', label: 'R Notifications' }, { height: '140px', label: 'R Another Topic' },
    { height: '750px', label: 'R Tall Activity Block' },
    { height: '110px', label: 'R More Activity (End)' },
  ];

  // No JavaScript useEffect or scroll handlers are needed for basic CSS sticky behavior.

  return (
    <div className="p-4"> {/* Page container padding */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,19rem)_minmax(0,38rem)_minmax(0,19rem)] justify-center gap-4 lg:max-w-[77rem] mx-auto">
        
        <div
          ref={leftColumnRef}
          // Applied Tailwind classes:
          // `sticky`: applies `position: sticky;`
          // `self-start`: crucial for grid items to take their own content height
          // STICKY_TOP_CLASS (e.g., `top-4`): sets the `top` offset for sticky positioning (e.g., top: 1rem;)
          className={`sticky self-start ${STICKY_TOP_CLASS} border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
        >
          <h2 className="text-lg font-display text-white mb-4 glitch-text-container">
            <span className="glitch-text" data-text="NEURAL FEED">NEURAL FEED</span>
          </h2>
          <p className="text-gray-400 text-sm mb-4">Real-time neural network activity and system updates from the SOHMA collective.</p>
          {leftColumnItems.map((item, index) => (
            <div key={`left-${index}`} style={{ height: item.height }} className="bg-red-500/10 my-2 p-2 border border-red-500/30 rounded flex items-center justify-center text-white/70 text-xs">
              {item.label} ({item.height})
            </div>
          ))}
          <p className="text-xs text-white/70 p-1 bg-black/50 rounded mt-4 text-center">End of Left Column</p>
        </div>

        {/* Middle column with enough height to ensure scrolling */}
        <div className="border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 shadow-[0_0_15px_rgba(255,255,255,0.3)] min-h-[250vh]"> 
          <h1 className="text-2xl font-display text-white mb-4 glitch-text-container">
            <span className="glitch-text" data-text="MAIN FEED">MAIN FEED</span>
          </h1>
          <p className="text-gray-400 mb-4">Primary content stream displaying posts, updates, and interactions from your network connections.</p>
          <div className="h-[500px] bg-green-500/10 my-2 p-2 border border-green-500/30 rounded flex items-center justify-center text-white/70">Middle Medium Content</div>
          <div className="h-[1200px] bg-green-500/20 my-2 p-2 border border-green-500/30 rounded flex items-center justify-center text-white/70">Middle Very Tall (Feed Content)</div>
          <div className="h-[400px] bg-green-500/10 my-2 p-2 border border-green-500/30 rounded flex items-center justify-center text-white/70">Middle Another Content Block</div>
          <div className="h-[800px] bg-green-500/20 my-2 p-2 border border-green-500/30 rounded flex items-center justify-center text-white/70">Middle More Scrollable Content</div>
        </div>

        <div
          ref={rightColumnRef}
          className={`sticky self-start ${STICKY_TOP_CLASS} border border-gray-500/50 rounded-sm bg-black/60 backdrop-blur-sm p-6 shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
        >
          <h2 className="text-lg font-display text-white mb-4 glitch-text-container">
            <span className="glitch-text" data-text="ACTIVITY">ACTIVITY</span>
          </h2>
          <p className="text-gray-400 text-sm mb-4">Recent activity, notifications, and trending topics within the SOHMA network.</p>
          {rightColumnItems.map((item, index) => (
            <div key={`right-${index}`} style={{ height: item.height }} className="bg-blue-500/10 my-2 p-2 border border-blue-500/30 rounded flex items-center justify-center text-white/70 text-xs">
              {item.label} ({item.height})
            </div>
          ))}
          <p className="text-xs text-white/70 p-1 bg-black/50 rounded mt-4 text-center">End of Right Column</p>
        </div>
      </div>
    </div>
  );
}
