"use client"

import { useState } from "react"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const sizes = ["S", "M", "L", "XL", "XXL"]
const colors = [
  { name: "Negro", value: "#1a1a1a" },
  { name: "Blanco", value: "#ffffff" },
  { name: "Gris Oscuro", value: "#4a4a4a" },
  { name: "Gris Claro", value: "#9a9a9a" },
]
const designLocations = ["Pecho", "Espalda", "Manga Izq.", "Manga Der."]

interface ProductConfigProps {
  productName?: string
  price?: number
}

export function ProductConfig({ productName = "Playera Oversize", price = 450 }: ProductConfigProps) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const [selectedLocation, setSelectedLocation] = useState("Pecho")
  const [designSize, setDesignSize] = useState([50])

  return (
    <Card className="border-neutral-200 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-neutral-900">{productName}</CardTitle>
        <p className="text-2xl font-bold text-neutral-900">${price.toFixed(2)} MXN</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Selector */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Talla</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-10 w-12 items-center justify-center rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Color</label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`h-10 w-10 rounded-full border-2 transition-all ${
                  selectedColor === color.value
                    ? "border-neutral-900 ring-2 ring-neutral-400 ring-offset-2"
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Design Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Ubicación del diseño</label>
          <div className="flex flex-wrap gap-2">
            {designLocations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedLocation === location
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Design Size Slider */}
        <div>
          <label className="mb-3 block text-sm font-medium text-neutral-700">
            Tamaño del diseño: {designSize[0]}%
          </label>
          <Slider
            value={designSize}
            onValueChange={setDesignSize}
            min={20}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button className="h-12 w-full gap-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
            <ShoppingCart className="h-5 w-5" />
            Añadir al carrito
          </Button>
          <Button variant="outline" className="h-12 w-full gap-2 rounded-full border-neutral-300">
            <Heart className="h-5 w-5" />
            Guardar diseño
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-neutral-500">
          La vista 3D es una previsualización. El resultado final puede variar ligeramente.
        </p>
      </CardContent>
    </Card>
  )
}
