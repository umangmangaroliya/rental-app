"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { 
  Package, 
  IndianRupee, 
  ShoppingBag, 
  AlertTriangle,
  Search,
  Download,
  Plus,
  MoreVertical,
  Filter,
  Store
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductInventory() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    }
  });

  const products = productsData || [];
  const totalProducts = products.length;
  const totalValue = products.reduce((acc: number, p: any) => acc + (p.baseRentalPrice || 0) * 10, 0); // Mocking 10 units per product for MVP value

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-muted-foreground font-medium mb-4">
        <a href="#" className="hover:text-foreground">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-foreground">Inventory</a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-bold">Products</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Product Inventory</h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">Manage your retail and rental clothing stock across all branches.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-brand hover:bg-red-700 shadow-sm text-white">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Products</CardTitle>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-black">{totalProducts}</div>
          </CardContent>
          <Package className="w-16 h-16 text-red-50 absolute right-4 top-4 z-0" strokeWidth={1} />
        </Card>

        {/* Total Value */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Est. Value</CardTitle>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-black">₹{totalValue.toLocaleString()}</div>
          </CardContent>
          <IndianRupee className="w-16 h-16 text-red-50 absolute right-4 top-4 z-0" strokeWidth={1} />
        </Card>

        {/* Active Rentals */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Rentals</CardTitle>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-black">--</div>
          </CardContent>
          <ShoppingBag className="w-16 h-16 text-red-50 absolute right-4 top-4 z-0" strokeWidth={1} />
        </Card>

        {/* Low Stock */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Low Stock</CardTitle>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-black">--</div>
          </CardContent>
          <AlertTriangle className="w-16 h-16 text-red-50 absolute right-4 top-4 z-0" strokeWidth={1} />
        </Card>
      </div>

      {/* Filters Toolbar */}
      <Card className="p-3">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              className="pl-9 bg-muted/50"
              placeholder="Search by name, SKU, or tag..."
            />
          </div>
          <div className="flex space-x-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sherwani">Sherwani</SelectItem>
                <SelectItem value="lehenga">Lehenga</SelectItem>
                <SelectItem value="saree">Saree</SelectItem>
                <SelectItem value="kurta">Kurta</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="whitespace-nowrap">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px]"><Checkbox /></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (Retail/Rent)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">Loading products...</TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No products found.</TableCell>
                </TableRow>
              ) : (
                products.map((product: any) => (
                  <TableRow key={product._id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded bg-muted flex-shrink-0 bg-cover bg-center border" style={product.images?.[0] ? {backgroundImage: `url(${product.images[0]})`} : {}}></div>
                        <div className="ml-4">
                          <div className="text-sm font-bold">{product.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {product._id.substring(product._id.length - 8).toUpperCase()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-bold">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-black">₹{(product.baseRentalPrice * 5).toLocaleString()}</div>
                      <div className="text-xs font-medium text-muted-foreground">Rent: ₹{product.baseRentalPrice}/day</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-bold">--</div>
                      <div className="text-xs font-bold text-muted-foreground">N/A</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-10 h-6 rounded-full relative cursor-pointer ${product.isActive ? 'bg-brand' : 'bg-muted border'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${product.isActive ? 'right-1' : 'left-1'}`}></div>
                        </div>
                        <span className={`ml-3 text-sm font-bold ${product.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{product.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
            Showing <span className="font-bold text-foreground">{products.length > 0 ? 1 : 0}</span> to <span className="font-bold text-foreground">{products.length}</span> of <span className="font-bold text-foreground">{totalProducts}</span> results
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
