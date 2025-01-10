import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-8">About DinerDapp</h1>
        
        <div className="space-y-6 text-gray-300">
          <p>
            DinerDapp is revolutionizing the food delivery industry by leveraging blockchain technology
            to create a secure, transparent, and efficient platform for both customers and restaurants.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">Our Mission</h2>
              <p>
                To provide a seamless food delivery experience while ensuring transparency
                and security through blockchain technology.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">Our Vision</h2>
              <p>
                To become the leading decentralized food delivery platform, connecting
                customers with their favorite restaurants in a trustless environment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;