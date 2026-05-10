"use client";

import { ArrowRight, Clock, Shield, Sparkles, Star, Truck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const categories = [
    { name: "Men's Formal", image: "/placeholder-men.jpg", href: "/products?category=men" },
    { name: "Women's Gowns", image: "/placeholder-women.jpg", href: "/products?category=women" },
    { name: "Accessories", image: "/placeholder-accessories.jpg", href: "/products?category=accessories" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "100% protected payment",
    },
    {
      icon: Clock,
      title: "Flexible Rental",
      description: "Choose your dates",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Designer collections",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wedding Guest",
      rating: 5,
      text: "Absolutely stunning dress! The quality exceeded my expectations and the rental process was seamless.",
      avatar: "/avatar-1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Corporate Event",
      rating: 5,
      text: "Perfect tuxedo for my company gala. Fit like a glove and looked amazing. Will definitely rent again!",
      avatar: "/avatar-2.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Prom Night",
      rating: 5,
      text: "Made my prom night unforgettable! The dress was gorgeous and the customer service was top-notch.",
      avatar: "/avatar-3.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                New Spring Collection 2026
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                Rent Luxury,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Live Elegantly
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Discover premium designer wear for every occasion. Sustainable fashion that doesn't compromise on style or your budget.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Track Order
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Premium Items</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">4.9</span>
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Hero Image
                </div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">100% Secure</div>
                    <div className="text-sm text-gray-600">Protected Payments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect outfit for any occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                  {category.name}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform group-hover:-translate-y-2">
                  <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex items-center text-white/90 font-medium">
                    Explore Now
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Rent luxury in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>

            {[
              {
                step: "01",
                title: "Browse & Select",
                description: "Explore our curated collection of premium designer wear and find your perfect match.",
              },
              {
                step: "02",
                title: "Book Your Dates",
                description: "Choose your rental period and we'll ensure your outfit is ready when you need it.",
              },
              {
                step: "03",
                title: "Wear & Return",
                description: "Look stunning at your event, then simply return it. We handle all the cleaning.",
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-black rounded-2xl mb-6 shadow-lg relative z-10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Loved by Thousands</h2>
            <p className="text-lg text-blue-100">See what our customers have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/95 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-blue-100">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Look Your Best?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of satisfied customers and rent luxury today
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Start Shopping
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
