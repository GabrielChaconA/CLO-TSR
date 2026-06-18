"use client"

import { useState } from "react"
import { Upload, Image as ImageIcon, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Globe, Lock } from "lucide-react"

const garmentTypes = ["Playera", "Hoodie", "Sudadera", "Gorra", "Tank Top"]
const techniques = ["Estampado", "Bordado"]

export default function SubirDisenoPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [designName, setDesignName] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [garmentType, setGarmentType] = useState("")
  const [technique, setTechnique] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Mock file upload
    setUploadedFile("diseño-subido.png")
  }

  const handleFileSelect = () => {
    // Mock file selection
    setUploadedFile("diseño-subido.png")
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">Subir diseño</CardTitle>
            <p className="text-sm text-neutral-600">
              Comparte tu diseño con la comunidad de WearLab
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag & Drop Zone */}
            <div
              className={`relative rounded-2xl border-2 border-dashed p-8 transition-all ${
                dragActive
                  ? "border-neutral-900 bg-neutral-100"
                  : "border-neutral-300 bg-neutral-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-200">
                      <ImageIcon className="h-8 w-8 text-neutral-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{uploadedFile}</p>
                      <p className="text-sm text-neutral-500">Archivo subido correctamente</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200">
                    <Upload className="h-8 w-8 text-neutral-500" />
                  </div>
                  <p className="mb-2 font-medium text-neutral-900">
                    Arrastra y suelta tu diseño aquí
                  </p>
                  <p className="mb-4 text-sm text-neutral-500">o</p>
                  <Button
                    onClick={handleFileSelect}
                    variant="outline"
                    className="rounded-full"
                  >
                    Seleccionar archivo
                  </Button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Nombre del diseño
                </label>
                <Input
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  placeholder="Ej. Dragón Minimalista"
                  className="rounded-xl border-neutral-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Descripción
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe tu diseño..."
                  className="min-h-[100px] rounded-xl border-neutral-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Tags (separados por coma)
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Ej. minimalista, arte, dragón"
                  className="rounded-xl border-neutral-300"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Tipo de prenda compatible
                  </label>
                  <Select value={garmentType} onValueChange={setGarmentType}>
                    <SelectTrigger className="rounded-xl border-neutral-300">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {garmentTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Técnica
                  </label>
                  <Select value={technique} onValueChange={setTechnique}>
                    <SelectTrigger className="rounded-xl border-neutral-300">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {techniques.map((tech) => (
                        <SelectItem key={tech} value={tech.toLowerCase()}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Public/Private Toggle */}
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Globe className="h-5 w-5 text-neutral-700" />
                  ) : (
                    <Lock className="h-5 w-5 text-neutral-700" />
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">
                      {isPublic ? "Diseño público" : "Diseño privado"}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {isPublic
                        ? "Visible para todos en la comunidad"
                        : "Solo tú puedes ver este diseño"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="data-[state=checked]:bg-neutral-900"
                />
              </div>
            </div>

            {/* Preview Section */}
            {uploadedFile && (
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Vista previa
                </label>
                <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-100">
                  <div className="text-center text-sm text-neutral-500">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12 text-neutral-400" />
                    Miniatura del diseño
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button className="h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
                Publicar diseño
              </Button>
              <p className="mt-4 text-center text-xs text-neutral-500">
                Formatos permitidos: PNG, JPG, SVG. Tamaño máximo: 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
