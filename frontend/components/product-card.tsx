import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image?: string
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-neutral-200 bg-white transition-shadow hover:shadow-lg">
      <div className="aspect-square bg-neutral-100">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">
            <span className="text-sm">Vista previa</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-neutral-900">{name}</h3>
        <p className="mt-1 text-sm text-neutral-600">${price.toFixed(2)} MXN</p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
            <Link href={`/producto/${id}`}>Ver</Link>
          </Button>
          <Button size="sm" className="flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
