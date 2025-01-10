import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MenuItemProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  onAddToCart: (itemId: string) => void
}

export const MenuItem = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart
}: MenuItemProps) => {
  const { toast } = useToast()

  const handleAddToCart = () => {
    onAddToCart(id)
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    })
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:bg-white/10 transition-all duration-300">
      <CardHeader>
        {imageUrl && (
          <div className="h-32 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardTitle className="text-lg text-gray-200">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-semibold">${price.toFixed(2)}</span>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/20 hover:bg-purple-500/20"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}