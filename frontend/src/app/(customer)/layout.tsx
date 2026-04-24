import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                LuxeRent
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/products?category=Men" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Men</Link>
              <Link href="/products?category=Women" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Women</Link>
              <Link href="/products?category=Accessories" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Accessories</Link>
              <Link href="/track" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Track Order</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button className="md:hidden text-gray-500 hover:text-blue-600 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-black tracking-tighter text-white mb-4 block">
                LuxeRent
              </span>
              <p className="text-gray-400 max-w-sm">
                Premium clothing rentals for your special occasions. Look your best without breaking the bank or harming the environment.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Browse All</Link></li>
                <li><Link href="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="text-gray-400">Email: support@luxerent.com</li>
                <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-400">WhatsApp: +1 (555) 987-6543</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2026 LuxeRent. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
