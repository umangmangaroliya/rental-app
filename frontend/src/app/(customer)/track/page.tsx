"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Clock } from "lucide-react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phone) setIsTracking(true);
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Track Your Rental</h1>
          <p className="mt-4 text-lg text-gray-500">Enter your order details below to see the current status of your booking.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="orderId" className="sr-only">Order ID</label>
                <input
                  type="text"
                  id="orderId"
                  className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-gray-50"
                  placeholder="Order ID (e.g. ORD-123456)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-gray-50"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all hover:shadow-lg hover:shadow-blue-500/30"
              >
                <Search className="w-5 h-5 mr-2" />
                Track
              </button>
            </form>
          </div>

          {isTracking && (
            <div className="border-t border-gray-100 bg-gray-50/50 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status: <span className="text-blue-600">Approved</span></h3>
              
              {/* Timeline */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-between">
                  <div>
                    <span className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-white">
                      <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-sm font-medium text-gray-900">Requested</p>
                  </div>
                  <div>
                    <span className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-white">
                      <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-sm font-medium text-gray-900">Approved</p>
                  </div>
                  <div>
                    <span className="h-10 w-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">
                      <Package className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-sm font-medium text-gray-500">Picked Up</p>
                  </div>
                  <div>
                    <span className="h-10 w-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">
                      <Clock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-sm font-medium text-gray-500">Returned</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Order Details</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Customer</dt>
                    <dd className="mt-1 text-sm text-gray-900">John Doe</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Item</dt>
                    <dd className="mt-1 text-sm text-gray-900">Classic Tuxedo (Size 42R)</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Rental Period</dt>
                    <dd className="mt-1 text-sm text-gray-900">Oct 24, 2026 - Oct 26, 2026</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Branch</dt>
                    <dd className="mt-1 text-sm text-gray-900">Main Downtown Branch</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
