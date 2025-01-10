import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface RestaurantCardProps {
  id: string
  name: string
  rating: number
  deliveryTime: string
  imageUrl?: string
  cuisine: string
}

export const RestaurantCard = ({
  id,
  name,
  rating,
  deliveryTime,
  imageUrl,
  cuisine
}: RestaurantCardProps) => {
  const navigate = useNavigate()

  return (
    <Card className="group bg-white/5 backdrop-blur-sm border-purple-500/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}>
      <CardHeader>
        <div className="h-48 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <CardTitle className="text-xl text-gray-200 group-hover:text-purple-400 transition-colors">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{cuisine}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-400">⭐ {rating} (120+)</span>
          <span className="text-sm text-gray-400">{deliveryTime}</span>
        </div>
      </CardContent>
    </Card>
  )
}