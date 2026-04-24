"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  ArrowLeftRight,
  Package,
  Plus,
  RefreshCcw,
  ShoppingBag,
  ShoppingCart,
  Store,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboard() {
  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await api.get('/bookings');
      return res.data;
    }
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    }
  });

  const { data: branchesData, isLoading: branchesLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const res = await api.get('/branches');
      return res.data;
    }
  });

  const isLoading = bookingsLoading || productsLoading || branchesLoading;

  const bookings = bookingsData || [];
  const products = productsData || [];
  const branches = branchesData || [];

  const totalProducts = products.length;
  const activeRentals = bookings.filter((b: any) => b.status === "RENTED").length;
  const totalOrders = bookings.length;
  const totalBranches = branches.length;

  const recentOrders = bookings.slice(0, 5);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Total Products</p>
            <div className="text-3xl font-bold mt-1">{totalProducts}</div>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="bg-orange-50 p-3 rounded-xl">
              <RefreshCcw className="w-5 h-5 text-orange-600" />
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Live
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Active Rentals</p>
            <div className="text-3xl font-bold mt-1">{activeRentals}</div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="bg-purple-50 p-3 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              All Time
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <div className="text-3xl font-bold mt-1">{totalOrders}</div>
          </CardContent>
        </Card>

        {/* Total Branches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="bg-[#FFF0F1] p-3 rounded-xl">
              <Store className="w-5 h-5 text-brand" />
            </div>
            <Badge variant="secondary">
              Active
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-muted-foreground">Total Branches</p>
            <div className="text-3xl font-bold mt-1">{totalBranches}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart & Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Overview Chart */}
          <Card className="h-96 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Revenue Overview</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sales vs Rentals (Last 30 Days)
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-brand mr-2"></div>
                    <span className="text-sm text-muted-foreground">Sales</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Rentals</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex items-end justify-between px-6 pb-6">
              <span className="text-muted-foreground text-sm">W1</span>
              <span className="text-muted-foreground text-sm">W2</span>
              <span className="text-muted-foreground text-sm">W3</span>
              <span className="text-muted-foreground text-sm">W4</span>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Button variant="ghost" className="text-brand hover:text-red-700 hover:bg-red-50">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order: any) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        #{order._id.substring(order._id.length - 6).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 uppercase">
                            {order.customerName ? order.customerName.substring(0, 2) : "C"}
                          </div>
                          <span className="font-medium">
                            {order.customerName || "Customer"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={order.bookingType === 'RENTAL' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}
                        >
                          {order.bookingType === 'RENTAL' ? 'Rental' : 'Purchase'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            order.status === 'COMPLETED' || order.status === 'RETURNED' ? 'bg-green-50 text-green-700 border-green-200' :
                            order.status === 'PENDING' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No recent orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Reminders & Quick Actions */}
        <div className="space-y-6">
          {/* Return Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Return Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-6 bg-muted p-1 rounded-lg">
                <Button variant="ghost" className="flex-1 bg-background shadow-sm text-brand hover:text-brand hover:bg-background">
                  Due Soon
                </Button>
                <Button variant="ghost" className="flex-1 text-muted-foreground">
                  Overdue
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start p-4 border border-[#FFDADB] bg-[#FFF8F8] rounded-xl relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-md mr-4 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">
                      Red Silk Saree
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Cust: Priya S.</p>
                    <p className="text-xs font-bold text-brand mt-1 flex items-center">
                      <span className="mr-1">⚠</span> Due Yesterday
                    </p>
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-brand bg-white px-2 py-0.5 rounded border border-[#FFDADB] uppercase">
                    Overdue
                  </span>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-6 text-muted-foreground">
                View full schedule
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted border-none">
                  <ShoppingCart className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-xs font-semibold">New Order</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted border-none">
                  <ArrowLeftRight className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-xs font-semibold">Process Return</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted border-none">
                  <Plus className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-xs font-semibold">Add Product</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted border-none">
                  <UserPlus className="w-6 h-6 mb-2 text-muted-foreground" />
                  <span className="text-xs font-semibold">Add Customer</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
