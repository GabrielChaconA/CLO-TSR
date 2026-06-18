"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"

const filterChips = ["Playeras", "Hoodies", "Gorras", "Bordado", "Estampado"]

const mockProducts = [
  { id: "1", name: "Dragón Minimalista", price: 450 },
  { id: "2", name: "Tipografía Urban", price: 380 },
  { id: "3", name: "Anime Classic", price: 420 },
  { id: "4", name: "Geométrico Abstract", price: 390 },
  { id: "5", name: "Floral Dark", price: 410 },
  { id: "6", name: "Skull Art", price: 430 },
]

export function SearchSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-2xl font-bold text-neutral-900">Buscar diseño:</h2>

      {/* Search Bar */}
      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            type="text"
            placeholder="Ej. dragón minimalista, tipografía, anime…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-full border-neutral-300 bg-white pl-11 pr-4 text-sm shadow-sm focus:border-neutral-400 focus:ring-neutral-400"
          />
        </div>
        <Button className="h-12 rounded-full bg-neutral-900 px-6 text-white hover:bg-neutral-800">
          Buscar
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filterChips.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeFilters.includes(filter)
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
