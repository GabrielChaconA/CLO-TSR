import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative -mt-24 min-h-[70vh] overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-300 to-neutral-400">
        <div className="absolute inset-0 bg-[url('/hero-tshirt.jpg')] bg-cover bg-center opacity-60 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <span className="mb-4 inline-block rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-700 shadow-sm">
          Diseños personalizados
        </span>
        
        <h1 className="text-6xl font-bold tracking-tight text-neutral-900 md:text-8xl">
          WearLab
        </h1>
        
        <p className="mt-4 max-w-md text-sm text-neutral-600">
          Página de personalización y diseño de poleras
        </p>

        <Button className="mt-8 rounded-full bg-neutral-900 px-8 py-6 text-sm font-medium text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl">
          WWW.WEARLAB.COM
        </Button>
      </div>
    </section>
  )
}
