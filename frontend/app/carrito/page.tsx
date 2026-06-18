"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  size: string
  color: string
  price: number
  quantity: number
}

const initialCartItems: CartItem[] = [
  { id: "1", name: "Dragón Minimalista - Playera", size: "M", color: "Negro", price: 450, quantity: 2 },
  { id: "2", name: "Tipografía Urban - Hoodie", size: "L", color: "Gris Oscuro", price: 680, quantity: 1 },
  { id: "3", name: "Anime Classic - Playera", size: "S", color: "Blanco", price: 420, quantity: 1 },
]

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-neutral-900">Tu carrito</h1>
        <p className="mt-2 text-neutral-600">
          {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"} en tu carrito
        </p>

        {cartItems.length === 0 ? (
          <Card className="mt-8 border-neutral-200 bg-white">
            <CardContent className="flex flex-col items-center py-16">
              <ShoppingBag className="h-16 w-16 text-neutral-300" />
              <h2 className="mt-4 text-xl font-semibold text-neutral-900">Tu carrito está vacío</h2>
              <p className="mt-2 text-neutral-500">Agrega productos para comenzar</p>
              <Button asChild className="mt-6 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
                <Link href="/buscar-diseno">Explorar diseños</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-neutral-200 bg-white">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-neutral-100">
                        <div className="flex h-full items-center justify-center text-neutral-400">
                          <span className="text-xs">Imagen</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-neutral-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-neutral-500">
                            Talla: {item.size} | Color: {item.color}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-semibold text-neutral-900">
                            ${(item.price * item.quantity).toFixed(2)} MXN
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-neutral-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="text-neutral-900">${subtotal.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Envío</span>
                    <span className="text-neutral-900">
                      {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)} MXN`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-neutral-500">
                      Envío gratis en compras mayores a $1,000 MXN
                    </p>
                  )}
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-900">Total</span>
                      <span className="text-xl font-bold text-neutral-900">${total.toFixed(2)} MXN</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      asChild
                      className="h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                      <Link href="/checkout">Proceder al pago</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 w-full gap-2 rounded-full border-neutral-300"
                    >
                      <Link href="/buscar-diseno">
                        <ArrowLeft className="h-4 w-4" />
                        Seguir comprando
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
