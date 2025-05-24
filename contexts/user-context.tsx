"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type User = {
  id: string
  username: string
  email: string
  avatarUrl: string
  role: string
  verified: boolean
}

type UserContextType = {
  user: User | null
  isAuthenticated: boolean
  logout: () => void
}

const defaultUser: User = {
  id: "user-1",
  username: "Alien",
  email: "alien@sohma.net",
  avatarUrl: "/cyberpunk-blue-hair.png",
  role: "Imaginary hunter",
  verified: true,
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // In a real app, you would check for an existing session
  const [user, setUser] = useState<User | null>(defaultUser)

  const logout = useCallback(() => {
    setUser(null)
    // In a real app, you would handle session termination here
    window.location.href = "/"
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
