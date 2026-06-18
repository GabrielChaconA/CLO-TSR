import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-neutral-900 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight text-white">WearLab</h3>
            <p className="mt-1 text-sm text-neutral-400">Diseños personalizados para ti</p>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/terminos" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Términos
            </Link>
            <Link href="/privacidad" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Privacidad
            </Link>
            <Link href="/soporte" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Soporte
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-400 transition-colors hover:text-white" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-400 transition-colors hover:text-white" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-400 transition-colors hover:text-white" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-6 text-center">
          <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} WearLab. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs text-neutral-600 font-medium">Un proyecto de DevStarLabs</p>
        </div>
      </div>
    </footer>
  )
}
