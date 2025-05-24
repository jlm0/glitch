"use client"

import { useState, useRef, useEffect } from "react"
import { X, Check, Wallet, Users, TrendingUp, Shield, Home, Newspaper, Clock } from "lucide-react"
import { useNotifications, type NotificationType } from "@/contexts/notification-context"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

// Helper function to get icon for notification type
function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "wallet":
      return Wallet
    case "social":
      return Users
    case "market":
      return TrendingUp
    case "security":
      return Shield
    case "system":
      return Home
    default:
      return Newspaper
  }
}

// Helper function to get notification type color
function getNotificationTypeColor(type: NotificationType) {
  switch (type) {
    case "wallet":
      return "text-gray-300"
    case "social":
      return "text-gray-400"
    case "market":
      return "text-white"
    case "security":
      return "text-gray-200"
    case "system":
      return "text-gray-300"
    default:
      return "text-gray-400"
  }
}

export function NotificationDropdown() {
  const { notifications, isOpen, closeNotifications, markAsRead, markAllAsRead, removeNotification } =
    useNotifications()

  const [hoverNotification, setHoverNotification] = useState<string | null>(null)
  const [hoverClose, setHoverClose] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeNotifications()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, closeNotifications])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeNotifications()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeNotifications])

  if (!isOpen) return null

  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const readNotifications = notifications.filter((n) => n.isRead)

  return (
    <div className="absolute right-0 top-12 z-50">
      {/* Notification dropdown */}
      <div
        ref={dropdownRef}
        className={cn(
          "w-[420px] relative z-10 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
        )}
      >
        <div className="bg-black/90 backdrop-blur-md border border-gray-800/50 rounded-md shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-display text-sm tracking-wider">NOTIFICATIONS</h3>
              {unreadNotifications.length > 0 && (
                <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-bold">
                  {unreadNotifications.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mark all as read button */}
              {unreadNotifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800/30"
                  title="Mark all as read"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark all read</span>
                </button>
              )}

              {/* Close button */}
              <button
                onClick={closeNotifications}
                onMouseEnter={() => setHoverClose(true)}
                onMouseLeave={() => setHoverClose(false)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 relative",
                  hoverClose
                    ? "bg-gray-900/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    : "text-gray-500 hover:text-gray-300",
                )}
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />

                {/* Hover glitch effect */}
                {hoverClose && (
                  <>
                    <span className="absolute inset-0 bg-gray-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                    <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-500 mb-2">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                </div>
                <p className="text-gray-400 text-sm">No notifications</p>
                <p className="text-gray-500 text-xs mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800/30">
                {/* Unread notifications first */}
                {unreadNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type)
                  const iconColor = getNotificationTypeColor(notification.type)

                  return (
                    <div
                      key={notification.id}
                      className="relative group"
                      onMouseEnter={() => setHoverNotification(notification.id)}
                      onMouseLeave={() => setHoverNotification(null)}
                    >
                      {notification.route ? (
                        <Link
                          href={notification.route}
                          onClick={() => {
                            markAsRead(notification.id)
                            closeNotifications()
                          }}
                          className="block p-4 pr-12 hover:bg-gray-900/20 transition-colors"
                        >
                          <NotificationContent
                            notification={notification}
                            Icon={Icon}
                            iconColor={iconColor}
                            isHovered={hoverNotification === notification.id}
                          />
                        </Link>
                      ) : (
                        <div
                          className="p-4 pr-12 hover:bg-gray-900/20 transition-colors cursor-pointer"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <NotificationContent
                            notification={notification}
                            Icon={Icon}
                            iconColor={iconColor}
                            isHovered={hoverNotification === notification.id}
                          />
                        </div>
                      )}

                      {/* Unread indicator */}
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>

                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md bg-black/70 text-gray-500 hover:text-white hover:bg-gray-800/70 transition-all duration-200 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                        title="Remove notification"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}

                {/* Read notifications */}
                {readNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type)
                  const iconColor = getNotificationTypeColor(notification.type)

                  return (
                    <div
                      key={notification.id}
                      className="relative group opacity-60 hover:opacity-80 transition-opacity"
                      onMouseEnter={() => setHoverNotification(notification.id)}
                      onMouseLeave={() => setHoverNotification(null)}
                    >
                      {notification.route ? (
                        <Link
                          href={notification.route}
                          onClick={closeNotifications}
                          className="block p-4 pr-12 hover:bg-gray-900/20 transition-colors"
                        >
                          <NotificationContent
                            notification={notification}
                            Icon={Icon}
                            iconColor={iconColor}
                            isHovered={hoverNotification === notification.id}
                          />
                        </Link>
                      ) : (
                        <div className="p-4 pr-12 hover:bg-gray-900/20 transition-colors">
                          <NotificationContent
                            notification={notification}
                            Icon={Icon}
                            iconColor={iconColor}
                            isHovered={hoverNotification === notification.id}
                          />
                        </div>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md bg-black/70 text-gray-500 hover:text-white hover:bg-gray-800/70 transition-all duration-200 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                        title="Remove notification"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Separate component for notification content to avoid repetition
function NotificationContent({
  notification,
  Icon,
  iconColor,
  isHovered,
}: {
  notification: any
  Icon: any
  iconColor: string
  isHovered: boolean
}) {
  return (
    <div className="flex items-start gap-3 pl-4">
      <div className={cn("mt-1 flex-shrink-0", iconColor)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h4
            className={cn(
              "text-sm font-medium transition-colors flex-1 leading-tight",
              notification.isRead ? "text-gray-300" : "text-white",
              isHovered && "text-white",
            )}
          >
            {notification.title}
          </h4>
          <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>
        <p
          className={cn(
            "text-xs transition-colors leading-relaxed",
            notification.isRead ? "text-gray-500" : "text-gray-400",
            isHovered && "text-gray-300",
          )}
        >
          {notification.description}
        </p>
      </div>
    </div>
  )
}
