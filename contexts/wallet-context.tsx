"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type WalletContextType = {
  isOpen: boolean
  openWallet: () => void
  closeWallet: () => void
  toggleWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openWallet = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeWallet = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleWallet = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <WalletContext.Provider
      value={{
        isOpen,
        openWallet,
        closeWallet,
        toggleWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
