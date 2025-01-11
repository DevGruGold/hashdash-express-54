import { useState } from "react"
import { useAccount, useBalance, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Web3CartProps {
  items: CartItem[]
  total: number
  onCheckout: () => void
}

export const Web3Cart = ({ items, total, onCheckout }: Web3CartProps) => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
  })
  const { writeContractAsync } = useWriteContract()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to proceed with the payment",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      // Here you would typically:
      // 1. Create an order in your backend
      // 2. Get the payment address
      // 3. Send the transaction
      
      // For demo purposes, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed",
      })
      
      onCheckout()
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold">Total</p>
                  <div>
                    <p className="font-semibold">${total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      ≈ {(total * 0.0004).toFixed(4)} ETH
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay with Crypto"}
                </Button>
                {isConnected && balance && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Wallet Balance: {balance.formatted} {balance.symbol}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}