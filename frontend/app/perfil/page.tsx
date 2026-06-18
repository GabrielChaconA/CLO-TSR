"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Edit, LogOut, MapPin, Package, Palette, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const mockUser = {
  name: "Juan Pérez",
  email: "juan.perez@email.com",
}

const mockDesigns = [
  { id: "d1", name: "Mi Dragón Custom", date: "15 Feb 2026", status: "Publicado" },
  { id: "d2", name: "Logo Personal", date: "10 Feb 2026", status: "Borrador" },
  { id: "d3", name: "Arte Abstract", date: "05 Feb 2026", status: "Publicado" },
]

const mockOrders = [
  { id: "#WL-2024-001", date: "20 Feb 2026", total: 890, status: "Entregado" },
  { id: "#WL-2024-002", date: "18 Feb 2026", total: 450, status: "En camino" },
  { id: "#WL-2024-003", date: "12 Feb 2026", total: 1250, status: "Procesando" },
]

const mockAddresses = [
  { id: "a1", label: "Casa", address: "Av. Principal 123, Col. Centro, CDMX 06000" },
  { id: "a2", label: "Oficina", address: "Calle Reforma 456, Piso 3, CDMX 06600" },
]

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* User Info Panel */}
          <div className="lg:col-span-1">
            <Card className="border-neutral-200 bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200">
                    <User className="h-10 w-10 text-neutral-500" />
                  </div>

                  {isEditing ? (
                    <div className="mt-4 w-full space-y-3">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl border-neutral-300 text-center"
                      />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border-neutral-300 text-center"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="flex-1 rounded-full"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="mt-4 text-xl font-semibold text-neutral-900">{name}</h2>
                      <p className="text-sm text-neutral-500">{email}</p>
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="mt-4 gap-2 rounded-full"
                      >
                        <Edit className="h-4 w-4" />
                        Editar perfil
                      </Button>
                    </>
                  )}
                </div>

                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* My Designs */}
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5" />
                  Mis diseños
                </CardTitle>
                <Button asChild size="sm" className="gap-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
                  <Link href="/subir-diseno">
                    <Plus className="h-4 w-4" />
                    Nuevo
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                    >
                      <div className="aspect-video rounded-lg bg-neutral-200" />
                      <h3 className="mt-3 font-medium text-neutral-900">{design.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-neutral-500">{design.date}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            design.status === "Publicado"
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          {design.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Orders */}
            <Card className="border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5" />
                  Mis pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200 text-left text-sm text-neutral-500">
                        <th className="pb-3 font-medium"># Pedido</th>
                        <th className="pb-3 font-medium">Fecha</th>
                        <th className="pb-3 font-medium">Total</th>
                        <th className="pb-3 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-neutral-100">
                          <td className="py-3 text-sm font-medium text-neutral-900">{order.id}</td>
                          <td className="py-3 text-sm text-neutral-600">{order.date}</td>
                          <td className="py-3 text-sm text-neutral-900">${order.total} MXN</td>
                          <td className="py-3">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                order.status === "Entregado"
                                  ? "bg-neutral-900 text-white"
                                  : order.status === "En camino"
                                    ? "bg-neutral-300 text-neutral-800"
                                    : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Direcciones
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <Plus className="h-4 w-4" />
                  Agregar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mockAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                    >
                      <h4 className="font-medium text-neutral-900">{addr.label}</h4>
                      <p className="mt-1 text-sm text-neutral-600">{addr.address}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-xs text-red-600 hover:text-red-700"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
