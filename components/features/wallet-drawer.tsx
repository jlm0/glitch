"use client"

import { useState, useEffect } from "react"
import { X, Wallet, ArrowRight, CreditCard, Clock, BarChart3, RefreshCw } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { cn } from "@/lib/utils"

// Sample wallet data
const walletData = {
  balance: "2,458.32",
  currency: "ETH",
  usdValue: "4,916.64",
  address: "0x7F5E...8A3D",
  transactions: [
    {
      id: "tx1",
      type: "received",
      amount: "+0.25",
      from: "0x3A2B...9C4D",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "tx2",
      type: "sent",
      amount: "-1.05",
      to: "0x8F1E...7B2C",
      timestamp: "Yesterday",
      status: "completed",
    },
    {
      id: "tx3",
      type: "received",
      amount: "+3.50",
      from: "0x5D4C...2E1F",
      timestamp: "3 days ago",
      status: "completed",
    },
  ],
  tokens: [
    { symbol: "ETH", name: "Ethereum", balance: "2.458", usdValue: "4,916.64" },
    { symbol: "BTC", name: "Bitcoin", balance: "0.125", usdValue: "3,750.00" },
    { symbol: "SOL", name: "Solana", balance: "45.75", usdValue: "1,372.50" },
  ],
}

export function WalletDrawer() {
  const { isOpen, closeWallet } = useWallet()
  const [activeTab, setActiveTab] = useState<"assets" | "activity">("assets")
  const [showBorderAnimation, setShowBorderAnimation] = useState(false)
  const [hoverClose, setHoverClose] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isContentReady, setIsContentReady] = useState(false)

  // Handle opening animation and content loading
  useEffect(() => {
    if (isOpen && !isContentReady) {
      setIsLoading(true)

      // Simulate loading wallet data
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
        setIsContentReady(true)
      }, 800) // 800ms loading time

      return () => clearTimeout(loadingTimer)
    } else if (!isOpen) {
      // Reset content when closing
      setIsContentReady(false)
    }
  }, [isOpen, isContentReady])

  // Occasionally show the border animation - only when content is ready
  useEffect(() => {
    if (!isOpen || !isContentReady) return

    const triggerAnimation = () => {
      setShowBorderAnimation(true)

      // Hide animation after it completes
      setTimeout(() => {
        setShowBorderAnimation(false)
      }, 8000) // Animation duration
    }

    // Initial delay before first animation
    const initialDelay = setTimeout(() => {
      triggerAnimation()

      // Set up interval for occasional animations
      const intervalId = setInterval(() => {
        triggerAnimation()
      }, 35000) // Trigger every 35 seconds

      return () => clearInterval(intervalId)
    }, 2000)

    return () => clearTimeout(initialDelay)
  }, [isOpen, isContentReady])

  // Don't render anything if not open
  if (!isOpen) return null

  return (
    <div
      className={cn(
        "h-full bg-black/90 backdrop-blur-sm border-l border-gray-800/30 z-30 transition-all duration-500 ease-in-out w-full md:w-80",
        showBorderAnimation && "border-pulse-animation border-pulse-vertical active",
      )}
    >
      <div className="h-full overflow-hidden">
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none"></div>

        {/* Loading state */}
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-white font-display text-sm tracking-wider">LOADING WALLET</div>
              <div className="text-gray-400 text-xs mt-1">Accessing secure vault...</div>
            </div>
          </div>
        )}

        {/* Content - only show when ready */}
        {isContentReady && (
          <div className="h-full animate-in fade-in-50 slide-in-from-right-5 duration-300">
            {/* Header */}
            <div className="h-16 border-b border-gray-800/30 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-white" />
                <h2 className="text-white font-display tracking-wider">WALLET</h2>
              </div>
              <button
                onClick={closeWallet}
                onMouseEnter={() => setHoverClose(true)}
                onMouseLeave={() => setHoverClose(false)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300 relative",
                  hoverClose
                    ? "bg-gray-900/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    : "text-gray-500 hover:text-gray-300",
                )}
                aria-label="Close wallet"
              >
                <X className="w-5 h-5" />

                {/* Hover glitch effect - same as sidebar/topbar */}
                {hoverClose && (
                  <>
                    <span className="absolute inset-0 bg-gray-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                    <span className="absolute inset-0 border border-gray-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </>
                )}
              </button>
            </div>

            {/* Rest of the wallet content remains the same */}
            {/* Wallet balance */}
            <div className="p-4 border-b border-gray-800/30">
              <div className="bg-gray-900/30 rounded-md p-4 border border-gray-800/50">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-gray-400 text-xs">BALANCE</div>
                  <div className="text-gray-400 text-xs">{walletData.address}</div>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <div className="text-white text-2xl font-display">{walletData.balance}</div>
                  <div className="text-gray-400 text-sm mb-0.5">{walletData.currency}</div>
                </div>
                <div className="text-gray-400 text-sm">${walletData.usdValue} USD</div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-md py-2 px-3 text-sm flex items-center justify-center gap-1 transition-colors">
                    <CreditCard className="w-4 h-4" />
                    <span>Deposit</span>
                  </button>
                  <button className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-md py-2 px-3 text-sm flex items-center justify-center gap-1 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800/30">
              <button
                className={cn(
                  "flex-1 py-3 text-sm font-medium text-center transition-colors relative",
                  activeTab === "assets" ? "text-white" : "text-gray-500 hover:text-gray-300",
                )}
                onClick={() => setActiveTab("assets")}
              >
                <div className="flex items-center justify-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Assets</span>
                </div>
                {activeTab === "assets" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>}
              </button>
              <button
                className={cn(
                  "flex-1 py-3 text-sm font-medium text-center transition-colors relative",
                  activeTab === "activity" ? "text-white" : "text-gray-500 hover:text-gray-300",
                )}
                onClick={() => setActiveTab("activity")}
              >
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Activity</span>
                </div>
                {activeTab === "activity" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>}
              </button>
            </div>

            {/* Content */}
            <div className="overflow-auto h-[calc(100%-13rem)]">
              {activeTab === "assets" ? (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-400 text-xs">TOKENS</div>
                    <button className="text-gray-500 hover:text-gray-300 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {walletData.tokens.map((token) => (
                      <div
                        key={token.symbol}
                        className="bg-gray-900/20 hover:bg-gray-900/30 rounded-md p-3 border border-gray-800/30 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-white font-bold text-xs">
                              {token.symbol}
                            </div>
                            <div>
                              <div className="text-white text-sm">{token.name}</div>
                              <div className="text-gray-400 text-xs">
                                {token.balance} {token.symbol}
                              </div>
                            </div>
                          </div>
                          <div className="text-white text-sm">${token.usdValue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-gray-400 text-xs mb-4">RECENT TRANSACTIONS</div>
                  <div className="space-y-3">
                    {walletData.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="bg-gray-900/20 hover:bg-gray-900/30 rounded-md p-3 border border-gray-800/30 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white text-sm">{tx.type === "received" ? "Received" : "Sent"}</div>
                            <div className="text-gray-400 text-xs">
                              {tx.type === "received" ? `From: ${tx.from}` : `To: ${tx.to}`}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">{tx.timestamp}</div>
                          </div>
                          <div
                            className={cn(
                              "text-sm font-medium",
                              tx.type === "received" ? "text-white" : "text-gray-400",
                            )}
                          >
                            {tx.amount} ETH
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
