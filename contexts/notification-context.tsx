"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type NotificationType = "system" | "wallet" | "social" | "security" | "market"

export type Notification = {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: Date
  isRead: boolean
  route?: string
  icon?: string
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
  openNotifications: () => void
  closeNotifications: () => void
  toggleNotifications: () => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Sample notifications for different types
const sampleNotifications: Omit<Notification, "id" | "timestamp" | "isRead">[] = [
  {
    type: "wallet",
    title: "Transaction Confirmed",
    description: "Your transfer of 2.5 ETH has been successfully processed",
    route: "/wallet",
  },
  {
    type: "social",
    title: "New Community Post",
    description: "CyberNinja shared an update in Neural Interfaces group",
    route: "/community",
  },
  {
    type: "system",
    title: "Security Scan Complete",
    description: "Your neural interface passed all security protocols",
    route: "/home",
  },
  {
    type: "market",
    title: "Price Alert",
    description: "ETH has reached your target price of $2,500",
    route: "/market",
  },
  {
    type: "social",
    title: "New Message",
    description: "QuantumHacker sent you an encrypted message",
    route: "/chat",
  },
  {
    type: "wallet",
    title: "Low Balance Warning",
    description: "Your ETH balance is below 1.0 - consider adding funds",
    route: "/wallet",
  },
  {
    type: "system",
    title: "Feed Update",
    description: "5 new posts from your network are available",
    route: "/feed",
  },
  {
    type: "security",
    title: "Login Attempt",
    description: "New login detected from Tokyo, Japan",
    route: "/home",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  // Initialize with sample notifications with realistic timestamps
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return sampleNotifications
      .map((notif, index) => ({
        ...notif,
        id: `notif-${index + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
        isRead: Math.random() > 0.6, // 40% chance of being unread
      }))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Sort by newest first
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const openNotifications = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeNotifications = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleNotifications = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        openNotifications,
        closeNotifications,
        toggleNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
