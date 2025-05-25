"use client";

import { useState } from "react";
import { NoiseLayer } from "../effects/NoiseLayer/NoiseLayer";
import { GlitchText } from "../effects/GlitchText/GlitchText";
import { ScanlineLayer } from "../effects/ScanlineLayer/ScanlineLayer";

export function SohmaLogo() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="w-10 h-10 relative cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      {/* Blurred gradient background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-md blur-sm" />

      {/* Logo container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-500 rounded-md flex items-center justify-center relative overflow-hidden">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Modular effects */}
          <NoiseLayer
            opacity={0.1}
            animated={isHovering}
          />
          {isHovering && <ScanlineLayer opacity={0.03} />}

          {/* Letter S with glitch effect */}
          <div className="z-10 text-xl font-bold">
            <GlitchText
              intensity={isHovering ? "normal" : "subtle"}
              triggerOnHover={false}
              className="text-white">
              S
            </GlitchText>
          </div>

          {/* Inner border */}
          <div className="absolute inset-0 border border-white/50 rounded-md" />

          {/* Animated outer border */}
          <div
            className={`
            absolute -inset-1 border border-gray-500/20 rounded-md transition-all duration-300
            ${isHovering ? "border-white/40 shadow-lg shadow-white/20" : "animate-pulse opacity-70"}
          `}
          />

          {/* Hover glow effect */}
          {isHovering && <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md animate-pulse" />}
        </div>
      </div>
    </div>
  );
}
