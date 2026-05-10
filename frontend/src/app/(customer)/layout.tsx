"use client";

import { useAppSelector } from "@/store/hooks";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">RentLux</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Shop
              </Link>
              <Link href="/products?category=new" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                New Arrivals
              </Link>
              <Link href="/track" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Track Order
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Wishlist */}
              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>

              {/* Account */}
              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/products?category=new"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/track"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <div className="border-t border-border pt-3 mt-3 space-y-3">
                <button className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Search className="w-5 h-5 mr-3" />
                  Search
                </button>
                <button className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 mr-3" />
                  Wishlist
                </button>
                <button className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="w-5 h-5 mr-3" />
                  Account
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-black">RentLux</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium formal wear rentals for your special occasions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/products?category=men" className="hover:text-white transition-colors">Men's Wear</Link></li>
                <li><Link href="/products?category=women" className="hover:text-white transition-colors">Women's Wear</Link></li>
                <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                <li><Link href="/products?category=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 RentLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
