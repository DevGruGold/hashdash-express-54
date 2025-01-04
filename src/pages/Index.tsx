import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

const Index = () => {
  const isMobile = useIsMobile();
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              HashDash
            </h1>
            <Button 
              variant="outline" 
              className="bg-sidebar/50 backdrop-blur-sm border-purple-500/20 hover:bg-sidebar/70"
              onClick={() => open()}
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Featured Section */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
              Featured Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-sidebar/50 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-200">Restaurant {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">
                      Delicious meals delivered to your wallet
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
              Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Pizza', 'Sushi', 'Burgers', 'Desserts'].map((category) => (
                <Card key={category} className="bg-sidebar/50 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-4">
                    <p className="text-gray-200 text-center">{category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;