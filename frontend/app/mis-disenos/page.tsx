"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Eye, EyeOff, Pencil, Trash2, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Design = {
  id: string
  name: string
  price: number
  category: string
  technique: string
  isPublic: boolean
  createdAt: string
}

const mockMyDesigns: Design[] = [
  { id: "1", name: "Dragón Minimalista", price: 450, category: "Playeras", technique: "Estampado", isPublic: true, createdAt: "2024-01-15" },
  { id: "2", name: "Tipografía Urban", price: 380, category: "Hoodies", technique: "Estampado", isPublic: true, createdAt: "2024-01-20" },
  { id: "3", name: "Anime Classic", price: 420, category: "Playeras", technique: "Bordado", isPublic: false, createdAt: "2024-02-01" },
  { id: "4", name: "Geométrico Abstract", price: 390, category: "Sudaderas", technique: "Estampado", isPublic: true, createdAt: "2024-02-10" },
  { id: "5", name: "Floral Dark", price: 410, category: "Playeras", technique: "Bordado", isPublic: false, createdAt: "2024-02-15" },
  { id: "6", name: "Wave Pattern", price: 399, category: "Hoodies", technique: "Estampado", isPublic: true, createdAt: "2024-03-01" },
]

export default function MisDiseniosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterVisibility, setFilterVisibility] = useState<"all" | "public" | "private">("all")
  const [designs, setDesigns] = useState<Design[]>(mockMyDesigns)

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVisibility =
      filterVisibility === "all" ||
      (filterVisibility === "public" && design.isPublic) ||
      (filterVisibility === "private" && !design.isPublic)
    return matchesSearch && matchesVisibility
  })

  const toggleVisibility = (id: string) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, isPublic: !design.isPublic } : design
      )
    )
  }

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((design) => design.id !== id))
  }

  const publicCount = designs.filter((d) => d.isPublic).length
  const privateCount = designs.filter((d) => !d.isPublic).length

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Mis diseños</h1>
            <p className="mt-2 text-neutral-600">
              Administra tus diseños subidos ({publicCount} públicos, {privateCount} privados)
            </p>
          </div>
          <Button asChild className="gap-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
            <Link href="/subir-diseno">
              <Plus className="h-4 w-4" />
              Nuevo diseño
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Buscar en mis diseños..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-full border-neutral-300 bg-white pl-11 pr-4 shadow-sm"
            />
          </div>
        </div>

        {/* Visibility Filter Chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterVisibility("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filterVisibility === "all"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            Todos ({designs.length})
          </button>
          <button
            onClick={() => setFilterVisibility("public")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filterVisibility === "public"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Públicos ({publicCount})
          </button>
          <button
            onClick={() => setFilterVisibility("private")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filterVisibility === "private"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            <EyeOff className="h-3.5 w-3.5" />
            Privados ({privateCount})
          </button>
        </div>

        {/* Results Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigns.map((design) => (
            <Card
              key={design.id}
              className="group overflow-hidden border-neutral-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square bg-neutral-100">
                <div className="flex h-full items-center justify-center text-neutral-400">
                  <span className="text-sm">Vista previa</span>
                </div>
                {/* Visibility Badge */}
                <div
                  className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    design.isPublic
                      ? "bg-white text-neutral-900"
                      : "bg-neutral-900 text-white"
                  }`}
                >
                  {design.isPublic ? (
                    <>
                      <Eye className="h-3 w-3" />
                      Público
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3" />
                      Privado
                    </>
                  )}
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
                <p className="mt-2 text-xs text-neutral-400">
                  Subido el {new Date(design.createdAt).toLocaleDateString("es-MX")}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => toggleVisibility(design.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 rounded-full"
                  >
                    {design.isPublic ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        Publicar
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-3"
                    title="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                        title="Eliminar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar diseño</AlertDialogTitle>
                        <AlertDialogDescription>
                          ¿Estás seguro de que deseas eliminar "{design.name}"? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteDesign(design.id)}
                          className="rounded-full bg-red-600 text-white hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-500">No tienes diseños que coincidan con el filtro.</p>
            <Button asChild className="mt-4 gap-2 rounded-full" variant="outline">
              <Link href="/subir-diseno">
                <Plus className="h-4 w-4" />
                Subir mi primer diseño
              </Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
