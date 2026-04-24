"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { 
  ShoppingBag, 
  Truck, 
  Settings2, 
  Banknote, 
  Search,
  Filter,
  Download,
  RefreshCcw,
  MoreVertical,
  Plus,
  Store
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrdersManagement() {
  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await api.get('/bookings');
      return res.data;
    }
  });

  const bookings = bookingsData || [];
  const totalOrders = bookings.length;
  const pendingDispatch = bookings.filter((b: any) => b.status === 'PENDING').length;
  const activeRentals = bookings.filter((b: any) => b.status === 'RENTED').length;
  const totalRevenue = bookings.reduce((acc: number, b: any) => acc + (b.totalAmount || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Orders Management</h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">Manage purchase and rental orders across all branches.</p>
        </div>
        <Button className="bg-brand hover:bg-red-700 shadow-sm text-white">
          <Plus className="w-5 h-5 mr-2" />
          Create Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Orders (All Time)</CardTitle>
            <ShoppingBag className="w-5 h-5 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalOrders}</div>
          </CardContent>
        </Card>

        {/* Pending Dispatch */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Pending Dispatch</CardTitle>
            <Truck className="w-5 h-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{pendingDispatch}</div>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Rentals</CardTitle>
            <Settings2 className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{activeRentals}</div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Revenue</CardTitle>
            <Banknote className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 space-x-8">
          <TabsTrigger value="all" className="data-[state=active]:border-brand data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-1 py-4 font-bold text-sm bg-transparent shadow-none">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="purchase" className="data-[state=active]:border-brand data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-1 py-4 font-medium text-sm text-muted-foreground bg-transparent shadow-none hover:text-foreground">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="rental" className="data-[state=active]:border-brand data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-1 py-4 font-medium text-sm text-muted-foreground bg-transparent shadow-none hover:text-foreground">
            Rental
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-3 w-full sm:w-auto overflow-x-auto">
          <Button variant="outline" className="shadow-sm bg-background">
            <Store className="w-4 h-4 mr-2 text-muted-foreground" />
            All Branches
          </Button>
          <Button variant="outline" className="shadow-sm bg-background">
            Last 30 Days
          </Button>
          <Button variant="outline" className="shadow-sm bg-background">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            Status
          </Button>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="icon" className="shadow-sm bg-background">
            <Download className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="outline" size="icon" className="shadow-sm bg-background">
            <RefreshCcw className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">Loading orders...</TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No orders found.</TableCell>
                </TableRow>
              ) : (
                bookings.map((order: any) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-bold">
                      #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs uppercase">
                          {order.customerName ? order.customerName.substring(0, 2) : "C"}
                        </div>
                        <div className="ml-3">
                          <div className="font-bold">{order.customerName || "Customer"}</div>
                          <div className="text-xs text-muted-foreground">{order.customerPhone || "N/A"}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          order.bookingType === 'RENTAL' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }
                      >
                        {order.bookingType === 'RENTAL' ? 'Rental' : 'Purchase'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-muted-foreground">
                      {order.branchId?.name || "Online"}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          order.status === 'COMPLETED' || order.status === 'RETURNED' ? 'bg-green-50 text-green-700 border-green-200' :
                          order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-muted text-muted-foreground border-border'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-black">₹{order.totalAmount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{bookings.length > 0 ? 1 : 0}</span> to <span className="font-bold text-foreground">{bookings.length}</span> of <span className="font-bold text-foreground">{totalOrders}</span> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>&lt;</Button>
            <Button variant="default" size="sm" className="bg-brand text-white hover:bg-red-700">1</Button>
            <Button variant="outline" size="sm" disabled>&gt;</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
