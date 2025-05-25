interface NoiseLayerProps {
  opacity?: number
  animated?: boolean
  className?: string
}

export function NoiseLayer({ opacity = 0.1, animated = true, className = "" }: NoiseLayerProps) {
  return (
    <div
      className={`relative overflow-hidden ${animated ? "animate-noise" : ""} ${className}`}
      style={{
        opacity,
        backgroundImage: "url(/noise.svg)",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  )
}
