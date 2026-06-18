"use client"

import { useState } from "react"
import { RotateCw, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Viewer3D() {
  const [gender, setGender] = useState<"hombre" | "mujer">("hombre")
  const [garmentType, setGarmentType] = useState("playera")

  return (
    <Card className="border-neutral-200 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-neutral-900">Vista 3D</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Viewer Container */}
        <div
          id="viewer3d"
          className="flex h-[400px] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 md:h-[520px]"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-neutral-300/50" />
            <p className="px-4 text-sm text-neutral-500">
              Aquí se renderiza el modelo 3D del busto ({gender}) y la prenda seleccionada.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Gender Toggle */}
          <div className="flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
            <button
              onClick={() => setGender("hombre")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                gender === "hombre"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Hombre
            </button>
            <button
              onClick={() => setGender("mujer")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                gender === "mujer"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Mujer
            </button>
          </div>

          {/* Garment Type Dropdown */}
          <Select value={garmentType} onValueChange={setGarmentType}>
            <SelectTrigger className="w-[160px] rounded-full border-neutral-200">
              <SelectValue placeholder="Tipo de prenda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="playera">Playera</SelectItem>
              <SelectItem value="hoodie">Hoodie</SelectItem>
              <SelectItem value="sudadera">Sudadera</SelectItem>
              <SelectItem value="tank-top">Tank Top</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Viewer Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <RotateCw className="h-4 w-4" />
            Rotar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <ZoomIn className="h-4 w-4" />
            Zoom +
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <ZoomOut className="h-4 w-4" />
            Zoom -
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
