"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/inicio", label: "INICIO" },
  { href: "/subir-diseno", label: "SUBIR DISEÑO" },
  { href: "/buscar-diseno", label: "BUSCAR DISEÑO" },
  { href: "/mis-disenos", label: "MIS DISEÑOS" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
      <nav className="flex items-center justify-between rounded-full bg-neutral-900 px-6 py-3 shadow-lg">
        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-white",
                  pathname === link.href && "text-white underline underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-neutral-300 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Cart and Auth Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/carrito"
            className="flex items-center gap-2 text-neutral-300 transition-colors hover:text-white"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
          </Link>
          <Link
            href="/perfil"
            className="flex items-center justify-center rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            title="Mi perfil"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Mi perfil</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl bg-neutral-900 p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-white",
                    pathname === link.href && "text-white"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/carrito"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white"
              >
                <ShoppingCart className="h-4 w-4" />
                CARRITO
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
