"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, CreditCard, Truck, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirmation")
  }

  const orderSummary = {
    subtotal: 2000,
    shipping: 0,
    total: 2000,
    items: 4,
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <Card className="border-neutral-200 bg-white">
            <CardContent className="flex flex-col items-center py-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-neutral-900">¡Pedido realizado!</h1>
              <p className="mt-2 text-center text-neutral-600">
                Tu pedido ha sido confirmado. Recibirás un correo con los detalles de seguimiento.
              </p>
              <div className="mt-6 rounded-xl bg-neutral-100 px-6 py-3">
                <p className="text-sm text-neutral-600">Número de orden</p>
                <p className="text-lg font-bold text-neutral-900">#WL-2026-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/perfil">Ver mis pedidos</Link>
                </Button>
                <Button asChild className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
                  <Link href="/inicio">Volver al inicio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Button asChild variant="ghost" className="mb-6 gap-2 rounded-full">
          <Link href="/carrito">
            <ArrowLeft className="h-4 w-4" />
            Volver al carrito
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>

        {/* Progress Steps */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              step === "shipping" ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
            }`}
          >
            <Truck className="h-4 w-4" />
            <span className="text-sm font-medium">Envío</span>
          </div>
          <div className="h-px w-8 bg-neutral-300" />
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              step === "payment" ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">Pago</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <Card className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Datos de envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Nombre completo
                        </label>
                        <Input
                          value={shippingData.fullName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, fullName: e.target.value })
                          }
                          placeholder="Juan Pérez"
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Correo electrónico
                        </label>
                        <Input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, email: e.target.value })
                          }
                          placeholder="juan@email.com"
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Teléfono
                      </label>
                      <Input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        placeholder="+52 55 1234 5678"
                        className="rounded-xl border-neutral-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Dirección
                      </label>
                      <Input
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        placeholder="Calle, número, colonia"
                        className="rounded-xl border-neutral-300"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Ciudad
                        </label>
                        <Input
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, city: e.target.value })
                          }
                          placeholder="CDMX"
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Estado
                        </label>
                        <Select
                          value={shippingData.state}
                          onValueChange={(value) =>
                            setShippingData({ ...shippingData, state: value })
                          }
                        >
                          <SelectTrigger className="rounded-xl border-neutral-300">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cdmx">CDMX</SelectItem>
                            <SelectItem value="jalisco">Jalisco</SelectItem>
                            <SelectItem value="nuevo-leon">Nuevo León</SelectItem>
                            <SelectItem value="puebla">Puebla</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Código postal
                        </label>
                        <Input
                          value={shippingData.zipCode}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, zipCode: e.target.value })
                          }
                          placeholder="06600"
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="mt-6 h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                      Continuar al pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card className="border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Número de tarjeta
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="rounded-xl border-neutral-300"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Nombre en la tarjeta
                        </label>
                        <Input
                          placeholder="JUAN PEREZ"
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          CVV
                        </label>
                        <Input
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          className="rounded-xl border-neutral-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Mes de expiración
                        </label>
                        <Select>
                          <SelectTrigger className="rounded-xl border-neutral-300">
                            <SelectValue placeholder="Mes" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Año de expiración
                        </label>
                        <Select>
                          <SelectTrigger className="rounded-xl border-neutral-300">
                            <SelectValue placeholder="Año" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={2026 + i} value={String(2026 + i)}>
                                {2026 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500">
                      Tu información de pago está protegida con encriptación SSL de 256 bits.
                    </p>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={() => setStep("shipping")}
                        variant="outline"
                        className="h-12 flex-1 rounded-full"
                      >
                        Volver
                      </Button>
                      <Button
                        type="submit"
                        className="h-12 flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                      >
                        Confirmar compra
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-neutral-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">{orderSummary.items} productos</span>
                  <span className="text-neutral-900">${orderSummary.subtotal.toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Envío</span>
                  <span className="text-neutral-900">
                    {orderSummary.shipping === 0 ? "Gratis" : `$${orderSummary.shipping.toFixed(2)} MXN`}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900">Total</span>
                    <span className="text-xl font-bold text-neutral-900">
                      ${orderSummary.total.toFixed(2)} MXN
                    </span>
                  </div>
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
