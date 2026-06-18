import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Viewer3D } from "@/components/viewer-3d"
import { ProductConfig } from "@/components/product-config"
import { Recommendations } from "@/components/recommendations"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  // Mock product data - in real app, fetch from API
  const productData: Record<string, { name: string; price: number }> = {
    "1": { name: "Dragón Minimalista", price: 450 },
    "2": { name: "Tipografía Urban", price: 380 },
    "3": { name: "Anime Classic", price: 420 },
    default: { name: "Playera Oversize", price: 450 },
  }

  const product = productData[id] || productData.default

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <Viewer3D />
          <ProductConfig productName={product.name} price={product.price} />
        </div>
        <div className="mt-16">
          <Recommendations />
        </div>
      </main>
      <Footer />
    </div>
  )
}
