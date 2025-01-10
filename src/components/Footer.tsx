import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  const email = "xmrtsolutions@gmail.com";
  const whatsapp = "+50661500559";
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in using DinerDapp for my restaurant.");
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  return (
    <footer className="w-full bg-white/5 backdrop-blur-lg border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2 text-gray-300 hover:text-purple-400"
                onClick={handleEmailClick}
              >
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2 text-gray-300 hover:text-purple-400"
                onClick={handleWhatsAppClick}
              >
                <Phone className="w-4 h-4" />
                <span>{whatsapp}</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-purple-400 transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">About DinerDapp</h3>
            <p className="text-gray-300">
              Revolutionizing food delivery with blockchain technology. Order your favorite meals securely and efficiently.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-500/20 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DinerDapp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};