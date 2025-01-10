import { Button } from "@/components/ui/button";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { Search, MapPin } from 'lucide-react';
import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";

// Mock data - In a real app, this would come from an API
const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Burger Palace",
    rating: 4.8,
    deliveryTime: "20-30 min",
    cuisine: "American",
  },
  {
    id: "2",
    name: "Pizza Paradise",
    rating: 4.6,
    deliveryTime: "25-35 min",
    cuisine: "Italian",
  },
  {
    id: "3",
    name: "Sushi Supreme",
    rating: 4.9,
    deliveryTime: "30-40 min",
    cuisine: "Japanese",
  },
];

const Index = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              DinerDapp
            </h1>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 text-white transition-all duration-300"
              onClick={() => open()}
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </Button>
          </div>
        </header>

        {/* Search Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/5 backdrop-blur-lg border border-purple-500/20 focus:border-purple-500/50 focus:outline-none text-gray-200 transition-all duration-300"
              />
              <Button 
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
              >
                <MapPin className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
            Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Pizza', 'Sushi', 'Burgers', 'Desserts'].map((category) => (
              <Card key={category} className="group bg-white/5 backdrop-blur-sm border-purple-500/20 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 group-hover:scale-110 transition-transform"></div>
                    <p className="text-gray-200 text-center group-hover:text-purple-400 transition-colors">{category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
