export function NoiseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 animate-noise"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-700/20"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern"></div>

      {/* Animated glitch lines */}
      <div className="absolute h-[1px] bg-white/10 left-0 right-0 top-[20%] glitch-line-1"></div>
      <div className="absolute h-[1px] bg-gray-400/10 left-0 right-0 top-[40%] glitch-line-2"></div>
      <div
        className="absolute h-[1px] bg-white/10 left-0 right-0 top-[60%] glitch-line-2"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute h-[1px] bg-gray-400/10 left-0 right-0 top-[80%] glitch-line-1"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="absolute w-[1px] bg-white/10 top-0 bottom-0 left-[20%] glitch-line-3"></div>
      <div className="absolute w-[1px] bg-gray-400/10 top-0 bottom-0 left-[40%] glitch-line-4"></div>
      <div
        className="absolute w-[1px] bg-white/10 top-0 bottom-0 left-[60%] glitch-line-3"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute w-[1px] bg-gray-400/10 top-0 bottom-0 left-[80%] glitch-line-4"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}
