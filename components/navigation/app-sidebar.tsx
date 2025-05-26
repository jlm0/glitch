"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Newspaper, Users, MessageCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SohmaLogo } from "@/components/branding/SohmaLogo";

const sidebarIcons = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Newspaper, label: "Feed", href: "/feed" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: TrendingUp, label: "Market", href: "/market" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);
  const [logoHover, setLogoHover] = useState(false);
  const [showBorderAnimation, setShowBorderAnimation] = useState(false);

  // Occasionally show the border animation
  useEffect(() => {
    const triggerAnimation = () => {
      setShowBorderAnimation(true);

      // Hide animation after it completes
      setTimeout(() => {
        setShowBorderAnimation(false);
      }, 8000); // Animation duration
    };

    // Initial delay before first animation
    const initialDelay = setTimeout(() => {
      triggerAnimation();

      // Set up interval for occasional animations
      const intervalId = setInterval(() => {
        triggerAnimation();
      }, 38000); // Trigger every 38 seconds (different timing for variety)

      return () => clearInterval(intervalId);
    }, 15000); // Start after other animations

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div
      className={`w-16 h-full bg-black/80 backdrop-blur-sm border-r border-gray-800/30 flex flex-col items-center py-0 z-20 relative border-pulse-animation border-pulse-vertical ${
        showBorderAnimation ? "active" : ""
      }`}>
      {/* Noise overlay for sidebar */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none"></div>

      {/* Glow effect behind the sidebar */}
      <div className="absolute -right-3 top-0 bottom-0 w-3 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>

      {/* Logo section - height matched to top navigation (h-16 = 64px) */}
      <div
        className="w-full h-16 flex justify-center items-center border-b border-gray-800/30 relative"
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}>
        <Link href="/home">
          <SohmaLogo />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center gap-3 mt-4">
        {sidebarIcons.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative group"
            onMouseEnter={() => setHoverIcon(item.label)}
            onMouseLeave={() => setHoverIcon(null)}
            aria-label={item.label}>
            {/* Icon container with hover and active effects */}
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300 relative",
                pathname === item.href
                  ? "bg-gray-900/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "text-gray-500 hover:text-gray-300"
              )}>
              <item.icon
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  hoverIcon === item.label && pathname !== item.href && "scale-110"
                )}
              />

              {/* Active indicator */}
              {pathname === item.href && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-sm shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
              )}

              {/* Hover glitch effect */}
              {hoverIcon === item.label && (
                <>
                  <span className="absolute inset-0 bg-gray-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                  <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </>
              )}
            </div>

            {/* Tooltip */}
            <div
              className={cn(
                "absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm border border-gray-800/50 px-3 py-1 rounded-sm text-xs font-mono",
                "opacity-0 invisible translate-x-2 transition-all duration-300 whitespace-nowrap z-50",
                "before:absolute before:top-1/2 before:-left-1 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-black/80 before:rotate-45 before:border-l before:border-b before:border-gray-800/50",
                hoverIcon === item.label ? "opacity-100 visible translate-x-0" : ""
              )}>
              <span className="text-white">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
