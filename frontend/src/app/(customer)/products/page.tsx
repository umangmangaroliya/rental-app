"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Collection</h1>
          <p className="mt-2 text-gray-500">Showing all premium rentals</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort by <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          <button 
            className="md:hidden flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? "block" : "hidden md:block"}`}>
          <div className="space-y-8 sticky top-24">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2 text-gray-500" /> Filters
              </h3>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Category</h4>
              <div className="space-y-3">
                {["Formal Suits", "Tuxedos", "Evening Gowns", "Accessories"].map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-3 text-gray-600 text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                  <button key={size} className="border border-gray-200 rounded-md py-2 text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link key={i} href={`/products/${i}`} className="group relative flex flex-col">
                <div className="aspect-[3/4] w-full rounded-2xl bg-gray-200 overflow-hidden relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image {i}</div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Classic Tuxedo {i}</h3>
                    <p className="mt-1 text-sm text-gray-500">Formal Wear</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">$50<span className="text-sm text-gray-500 font-normal">/day</span></p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm">
              <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">1</button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
              <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
