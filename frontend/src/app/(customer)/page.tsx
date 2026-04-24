import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-black text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block mb-2">Own the moment,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">rent the look.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover a curated collection of premium formal wear and designer pieces for your next special occasion. Sustainable, affordable, and stunning.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  Browse Rentals
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden bg-gray-100 aspect-[4/5]">
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Hero Image (e.g. elegant model wearing a rented suit/dress)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shop by Category</h2>
            <p className="mt-4 text-lg text-gray-500">Find exactly what you need for any occasion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Men's Wear", "Women's Wear", "Accessories"].map((category) => (
              <Link key={category} href={`/products?category=${category}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 z-0 bg-white">
                  {category} Image
                </div>
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform transition-transform group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                  <span className="inline-flex items-center text-white/80 font-medium text-sm group-hover:text-white transition-colors">
                    Explore collection <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Choose Your Look", desc: "Browse our collection and find the perfect outfit." },
              { title: "Book Your Dates", desc: "Select your rental period and confirm availability." },
              { title: "Wear & Return", desc: "Look amazing at your event, then simply return it. We handle the cleaning." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-16">Loved by thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-left">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-white/90 text-lg mb-6">
                  "Absolutely stunning dress! The process was incredibly smooth and the customer service was top-notch."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full mr-4"></div>
                  <div>
                    <p className="text-white font-medium">Sarah Jenkins</p>
                    <p className="text-white/60 text-sm">Rented: Evening Gown</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
