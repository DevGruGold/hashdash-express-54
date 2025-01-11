import { useState } from "react"
import { useParams } from "react-router-dom"
import { MenuItem } from "@/components/MenuItem"
import { Web3Cart } from "@/components/Web3Cart"

const MOCK_MENU_ITEMS = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomatoes, and special sauce",
    price: 12.99,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on a crispy crust",
    price: 15.99,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, and house-made dressing",
    price: 9.99,
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const Restaurant = () => {
  const { id } = useParams()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleAddToCart = (itemId: string) => {
    const menuItem = MOCK_MENU_ITEMS.find((item) => item.id === itemId)
    if (!menuItem) return

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...menuItem, quantity: 1 }]
    })
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    setCartItems([]) // Clear cart after successful payment
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-200">Restaurant Name</h1>
          <Web3Cart 
            items={cartItems}
            total={cartTotal}
            onCheckout={handleCheckout}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.id}
              {...item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restaurant
