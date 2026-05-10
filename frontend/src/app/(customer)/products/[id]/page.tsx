"use client";

import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { ArrowLeft, Calendar, Check, Heart, Share2, Shield, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock product data - replace with API call
const getProduct = (id: string) => ({
  id,
  name: "Classic Black Tuxedo",
  description: "An exquisitely tailored tuxedo perfect for your most formal occasions. Made with premium wool blend for maximum comfort and style. The slim fit design ensures a modern silhouette while maintaining classic elegance.",
  price: 75,
  category: "Men's Formal",
  images: ["/product-1.jpg", "/product-2.jpg", "/product-3.jpg", "/product-4.jpg"],
  sizes: ["38R", "40R", "42R", "44R", "46R"],
  rating: 4.8,
  reviews: 124,
  features: [
    "Premium wool blend fabric",
    "Slim fit tailoring",
    "Satin lapels",
    "Includes jacket and trousers",
    "Professional dry cleaning included",
  ],
  details: {
    fabric: "Wool Blend",
    color: "Black",
    style: "Slim Fit",
    occasion: "Formal Events, Weddings, Galas",
  },
});

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const product = getProduct(params.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!pickupDate || !returnDate) {
      alert("Please select rental dates");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        pickupDate,
        returnDate,
        quantity: 1,
      })
    );

    // Show success message or redirect to cart
    router.push("/cart");
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi! I'd like to book:\n${product.name}\nSize: ${selectedSize}\nPickup: ${pickupDate}\nReturn: ${returnDate}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                Product Image {selectedImage + 1}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-gray-700 hover:bg-white"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-200 rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-4 ring-blue-600 scale-95"
                      : "hover:scale-95"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                <span className="text-xl text-gray-500">/ day</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Size</h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm font-semibold rounded-xl border-2 transition-all ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600 scale-95"
                        : "bg-white text-gray-900 border-gray-200 hover:border-blue-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                Rental Period
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWhatsAppBooking}
                className="flex-1 bg-green-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-green-500/50"
              >
                WhatsApp to Book
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Free Delivery</div>
                  <div className="text-xs text-gray-600">On orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Secure Booking</div>
                  <div className="text-xs text-gray-600">100% protected</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
              <dl className="grid grid-cols-2 gap-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                    <dd className="text-base font-semibold text-gray-900 mt-1">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
