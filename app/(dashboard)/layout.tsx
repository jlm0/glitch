import type React from "react"
import { IconSidebar } from "@/components/navigation/icon-sidebar"
import { TopBar } from "@/components/navigation/top-bar"
import { UserProvider } from "@/contexts/user-context"
import { SearchProvider } from "@/contexts/search-context"
import { WalletProvider } from "@/contexts/wallet-context"
import { SearchModal } from "@/components/features/search-modal"
import { WalletDrawer } from "@/components/features/wallet-drawer"
import { Suspense } from "react"
import { NotificationProvider } from "@/contexts/notification-context"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserProvider>
      <SearchProvider>
        <WalletProvider>
          <NotificationProvider>
            <div className="relative w-full h-screen overflow-hidden">
              <Suspense fallback={null}>
                <SearchModal />
              </Suspense>
              <div className="flex h-full relative z-10">
                <IconSidebar />
                <div className="flex-1 flex flex-col w-full">
                  <TopBar />
                  <div className="flex flex-1 overflow-hidden">
                    <main className="flex-1 overflow-auto min-w-0 transition-all duration-300 ease-in-out">
                      {children}
                    </main>
                    <WalletDrawer />
                  </div>
                </div>
              </div>
            </div>
          </NotificationProvider>
        </WalletProvider>
      </SearchProvider>
    </UserProvider>
  )
}
