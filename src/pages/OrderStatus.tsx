import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, Truck, MapPin } from "lucide-react"

interface OrderStatus {
  status: 'preparing' | 'cooking' | 'delivering' | 'delivered'
  estimatedTime: string
}

const OrderStatus = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    status: 'preparing',
    estimatedTime: '30-40 minutes'
  })

  // Simulate order status updates
  useEffect(() => {
    const statusSequence = ['preparing', 'cooking', 'delivering', 'delivered']
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length - 1) {
        currentIndex++
        setOrderStatus(prev => ({
          ...prev,
          status: statusSequence[currentIndex] as OrderStatus['status'],
          estimatedTime: currentIndex === statusSequence.length - 1 ? '0 minutes' : `${30 - currentIndex * 10}-${40 - currentIndex * 10} minutes`
        }))
      } else {
        clearInterval(interval)
      }
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-8 h-8 text-yellow-500" />
      case 'cooking':
        return <Clock className="w-8 h-8 text-orange-500" />
      case 'delivering':
        return <Truck className="w-8 h-8 text-blue-500" />
      case 'delivered':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />
    }
  }

  const getStatusText = (status: OrderStatus['status']) => {
    switch (status) {
      case 'preparing':
        return 'Restaurant is preparing your order'
      case 'cooking':
        return 'Your food is being cooked'
      case 'delivering':
        return 'Driver is on the way'
      case 'delivered':
        return 'Order delivered successfully'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C] py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-200">Order #{orderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(orderStatus.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      {getStatusText(orderStatus.status)}
                    </h3>
                    <p className="text-gray-400">
                      Estimated time: {orderStatus.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      Delivery Address
                    </h3>
                    <p className="text-gray-400">
                      123 Web3 Street, Crypto City, CC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderStatus