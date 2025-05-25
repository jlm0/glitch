import type React from "react"
import type { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children: React.ReactNode
}

export function GlitchText({ as: Component = "div", children, className, ...props }: GlitchTextProps) {
  return (
    <Component className={cn("glitch-text-container", className)} {...props}>
      <span className="glitch-text" data-text={typeof children === "string" ? children : undefined}>
        {children}
      </span>
    </Component>
  )
}
