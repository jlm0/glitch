"use client"

export function CyberpunkLogo({ isHovering = false }: { isHovering?: boolean }) {
  return (
    <>
      <style jsx>{glitchLetterStyles}</style>
      <div className="w-10 h-10 relative">
        {/* Blurred gradient background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-md blur-sm"></div>

        {/* Logo container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-500 rounded-md flex items-center justify-center relative overflow-hidden">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/80"></div>

            {/* Noise texture */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>

            {/* Letter S with glitch effect */}
            <div
              className={`z-10 text-xl font-bold text-white glitch-letter ${isHovering ? "animate-glitch" : ""}`}
              data-text="S"
            >
              S
            </div>

            {/* Inner border */}
            <div className="absolute inset-0 border border-white/50 rounded-md"></div>

            {/* Animated outer border */}
            <div className="absolute -inset-1 border border-gray-500/20 rounded-md animate-pulse opacity-70"></div>
          </div>
        </div>
      </div>
    </>
  )
}

// Add this CSS at the end of the component, before the closing bracket
const glitchLetterStyles = `
  .glitch-letter {
    position: relative;
    display: inline-block;
  }
  
  .glitch-letter::before,
  .glitch-letter::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch-letter::before {
    left: -1px;
    text-shadow: -1px 0 rgba(255, 255, 255, 0.7);
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    animation: glitch-letter 2s infinite linear alternate-reverse;
  }
  
  .glitch-letter::after {
    left: 1px;
    text-shadow: 1px 0 rgba(200, 200, 200, 0.7);
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    animation: glitch-letter 3s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-letter {
    0% {
      transform: translateX(-1px) skew(0.5deg);
    }
    20% {
      transform: translateX(1px) skew(-0.5deg);
    }
    40% {
      transform: translateX(-0.5px) skew(0.25deg);
    }
    60% {
      transform: translateX(0.5px) skew(-0.25deg);
    }
    80% {
      transform: translateX(-0.25px) skew(0.1deg);
    }
    100% {
      transform: translateX(0.25px) skew(-0.1deg);
    }
  }
`
