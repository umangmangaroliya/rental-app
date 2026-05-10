"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleRemove = (id: string, size: string) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, size, quantity }));
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to find your perfect outfit!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-40 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Product
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.size)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Rental Dates */}
                    <div className="text-sm text-gray-600 mb-4">
                      <p>Pickup: {new Date(item.pickupDate).toLocaleDateString()}</p>
                      <p>Return: {new Date(item.returnDate).toLocaleDateString()}</p>
                    </div>

                    {/* Price and Quantity */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-gray-900">
                          ${item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.price} × {item.quantity} day{item.quantity > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (estimated)</span>
                  <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-gray-900">
                      ${(total * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50 mb-4">
                Proceed to Checkout
              </button>

              <button className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-green-500/50">
                Book via WhatsApp
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> All bookings require admin confirmation. A deposit may be required upon pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
