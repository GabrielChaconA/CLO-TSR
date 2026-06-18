import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SearchSection } from "@/components/search-section"
import { Recommendations } from "@/components/recommendations"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <Recommendations />
      </main>
      <Footer />
    </div>
  )
}
