import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-8">Terms & Conditions</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using HashDash, you agree to be bound by these Terms and Conditions
              and all applicable laws and regulations.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of HashDash for personal,
              non-commercial transitory viewing only.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">3. Disclaimer</h2>
            <p>
              The materials on HashDash are provided on an 'as is' basis. HashDash makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;