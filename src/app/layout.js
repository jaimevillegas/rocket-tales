import "./globals.css"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import SpaceBackground from "@/components/SpaceBackground"
import ThemeToggle from "@/components/ThemeToggle"
import { ThemeProvider } from "@/context/ThemeContext"

export const metadata = {
  title: "Rocket Tales",
  description: "Your gateway to space exploration - Discover Mars rovers, space missions, rockets, and more.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <Providers>
            <SpaceBackground />
            <div className="relative">
              <header>
                <Navbar />
              </header>
              <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <ThemeToggle />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
