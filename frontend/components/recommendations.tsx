import { ProductCard } from "@/components/product-card"

const recommendedProducts = [
  { id: "r1", name: "Wave Pattern", price: 399 },
  { id: "r2", name: "Retro Vibes", price: 449 },
  { id: "r3", name: "Mountain Line", price: 420 },
  { id: "r4", name: "Abstract Flow", price: 380 },
  { id: "r5", name: "Minimal Logo", price: 350 },
  { id: "r6", name: "Street Art", price: 470 },
]

export function Recommendations() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-2xl font-bold text-neutral-900">Más diseños</h2>
      <p className="mt-2 text-sm text-neutral-600">Explora nuestros diseños recomendados</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
