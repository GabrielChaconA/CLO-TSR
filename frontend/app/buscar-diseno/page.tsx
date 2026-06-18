"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const categories = ["Todos", "Playeras", "Hoodies", "Gorras", "Sudaderas"]
const techniques = ["Estampado", "Bordado"]

const mockDesigns = [
  { id: "1", name: "Dragón Minimalista", price: 450, category: "Playeras", technique: "Estampado" },
  { id: "2", name: "Tipografía Urban", price: 380, category: "Hoodies", technique: "Estampado" },
  { id: "3", name: "Anime Classic", price: 420, category: "Playeras", technique: "Bordado" },
  { id: "4", name: "Geométrico Abstract", price: 390, category: "Sudaderas", technique: "Estampado" },
  { id: "5", name: "Floral Dark", price: 410, category: "Playeras", technique: "Bordado" },
  { id: "6", name: "Skull Art", price: 430, category: "Gorras", technique: "Bordado" },
  { id: "7", name: "Wave Pattern", price: 399, category: "Hoodies", technique: "Estampado" },
  { id: "8", name: "Retro Vibes", price: 449, category: "Playeras", technique: "Estampado" },
  { id: "9", name: "Mountain Line", price: 420, category: "Sudaderas", technique: "Bordado" },
]

export default function BuscarDisenoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [activeTechniques, setActiveTechniques] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const toggleTechnique = (technique: string) => {
    setActiveTechniques((prev) =>
      prev.includes(technique) ? prev.filter((t) => t !== technique) : [...prev, technique]
    )
  }

  const filteredDesigns = mockDesigns.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Todos" || design.category === activeCategory
    const matchesTechnique = activeTechniques.length === 0 || activeTechniques.includes(design.technique)
    const matchesPrice = design.price >= priceRange[0] && design.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesTechnique && matchesPrice
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-neutral-900">Buscar diseño</h1>
        <p className="mt-2 text-neutral-600">Encuentra el diseño perfecto para tu prenda</p>

        {/* Search Bar */}
        <div className="mt-8 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Buscar diseños..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-full border-neutral-300 bg-white pl-11 pr-4 shadow-sm"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="h-12 gap-2 rounded-full border-neutral-300 px-6"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mt-4 border-neutral-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900">Filtros avanzados</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* Categories */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-neutral-700">Categoría</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                          activeCategory === category
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Techniques */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-neutral-700">Técnica</label>
                  <div className="flex flex-wrap gap-2">
                    {techniques.map((technique) => (
                      <button
                        key={technique}
                        onClick={() => toggleTechnique(technique)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                          activeTechniques.includes(technique)
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {technique}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-neutral-700">
                    Precio: ${priceRange[0]} - ${priceRange[1]} MXN
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigns.map((design) => (
            <Card
              key={design.id}
              className="group overflow-hidden border-neutral-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square bg-neutral-100">
                <div className="flex h-full items-center justify-center text-neutral-400">
                  <span className="text-sm">Vista previa</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">{design.name}</h3>
                    <p className="mt-1 text-sm text-neutral-600">${design.price.toFixed(2)} MXN</p>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    {design.technique}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                    <Link href={`/producto/${design.id}`}>Ver</Link>
                  </Button>
                  <Button size="sm" className="flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
                    Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-500">No se encontraron diseños con los filtros seleccionados.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
