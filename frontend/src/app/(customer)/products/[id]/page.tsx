"use client";

import { useState } from "react";
import { Check, Calendar as CalendarIcon, Info } from "lucide-react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-4" aria-orientation="horizontal" role="tablist">
                {[1, 2, 3, 4].map((img) => (
                  <button key={img} className="relative h-24 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 overflow-hidden">
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400">Thumb {img}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative shadow-md">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Main Image</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Classic Tuxedo {params.id}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold tracking-tight text-gray-900">$50 <span className="text-lg font-medium text-gray-500">/ day</span></p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>An exquisitely tailored tuxedo perfect for your most formal occasions. Made with premium wool blend for maximum comfort and style. The slim fit design ensures a modern silhouette.</p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {["38R", "40R", "42R", "44R"].map((size) => (
                  <div
                    key={size}
                    className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer ${
                      selectedSize === size ? "bg-blue-600 text-white border-transparent hover:bg-blue-700" : "bg-white text-gray-900 border-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span>{size}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                Select Rental Dates
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Pickup Date</label>
                  <input type="date" className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Return Date</label>
                  <input type="date" className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                type="submit"
                className="flex-1 max-w-xs bg-blue-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                Book Now
              </button>
              <button
                type="button"
                className="flex-1 max-w-xs bg-green-500 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5"
              >
                WhatsApp to Book
              </button>
            </div>
            
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <Info className="w-5 h-5 text-gray-400 mr-2" />
              Bookings require admin confirmation. A deposit may be required upon pickup.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
