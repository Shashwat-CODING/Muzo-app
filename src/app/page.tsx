import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Screenshots } from "@/components/Screenshots"
import { DownloadSection } from "@/components/Download"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <DownloadSection />
      <Footer />
    </main>
  )
}
