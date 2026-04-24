"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { 
  Store, 
  Search, 
  Phone, 
  MapPin, 
  X,
  User,
  Package
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export default function BranchManagement() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const { data: branchesData, isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const res = await api.get('/branches');
      return res.data;
    }
  });

  const branches = branchesData || [];
  const totalBranches = branches.length;

  return (
    <div className="h-full">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-muted-foreground font-medium mb-4">
          <a href="#" className="hover:text-foreground">Dashboard</a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">Branch Management</span>
        </nav>

        <div className="border-b pb-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Branch Management</h1>
            <p className="mt-1 text-sm text-muted-foreground font-medium">Manage your physical store locations and inventory assignments.</p>
          </div>
          <Sheet open={isSlideOverOpen} onOpenChange={setIsSlideOverOpen}>
            <SheetTrigger 
              render={
                <Button className="bg-brand hover:bg-red-700 shadow-sm text-white">
                  Add New Branch
                </Button>
              } 
            />
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="px-1 py-6 border-b border-border">
                <SheetTitle className="text-xl font-bold">Add New Branch</SheetTitle>
                <SheetDescription className="text-sm mt-1">
                  Create a new location for GJ 5 Fashion.
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-8">
                {/* General Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">General Information</h3>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Branch Name <span className="text-brand">*</span></label>
                    <Input type="text" placeholder="e.g. GJ5 Satellite" className="bg-muted/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">City <span className="text-brand">*</span></label>
                      <Select>
                        <SelectTrigger className="bg-muted/50">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                          <SelectItem value="surat">Surat</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">ZIP Code</label>
                      <Input type="text" placeholder="380015" className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Address</label>
                    <Textarea rows={3} placeholder="Shop No, Building Name, Street Area..." className="bg-muted/50" />
                  </div>
                </div>

                {/* Management & Contact */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Management & Contact</h3>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Branch Manager</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input type="text" placeholder="Manager Name" className="pl-10 bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Contact Number <span className="text-brand">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input type="text" placeholder="+91 00000 00000" className="pl-10 bg-muted/50" />
                    </div>
                  </div>
                </div>

                {/* Inventory Assignment */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Inventory Assignment</h3>
                    <Button variant="link" className="text-brand h-auto p-0 font-bold hover:underline">
                      + Quick Add
                    </Button>
                  </div>
                  
                  <div className="bg-muted/30 border border-border border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="bg-background p-2 rounded-lg border border-border shadow-sm mb-3">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-bold">Assign Categories</p>
                    <p className="text-xs text-muted-foreground mt-1 text-center">Select product types for this branch</p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <SheetFooter className="border-t pt-4 sm:justify-end gap-2">
                <SheetClose render={<Button variant="outline">Cancel</Button>} />
                <Button className="bg-brand hover:bg-red-700 text-white shadow-sm">
                  Create Branch
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Total Branches */}
          <Card className="relative overflow-hidden flex flex-col justify-between h-32">
            <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2 z-10 relative h-full">
              <div className="flex flex-col justify-between h-full">
                <CardTitle className="text-sm font-semibold text-muted-foreground">Total Branches</CardTitle>
                <div className="text-4xl font-black">{totalBranches}</div>
              </div>
              <Store className="w-12 h-12 text-red-50 z-0" />
            </CardHeader>
          </Card>

          {/* Top Performing City */}
          <Card className="relative overflow-hidden flex flex-col justify-between h-32">
            <CardHeader className="flex flex-col justify-between space-y-0 pb-2 z-10 relative h-full">
              <div>
                <CardTitle className="text-sm font-semibold text-muted-foreground">Top Performing City</CardTitle>
                <div className="text-3xl font-black mt-2">N/A</div>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Need more data</p>
            </CardHeader>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            className="pl-10 py-6 bg-muted/50 rounded-xl text-base shadow-sm"
            placeholder="Search by name, manager or city..."
          />
        </div>

        {/* Branches List */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Branch Details</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Manager</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">Loading branches...</TableCell>
                  </TableRow>
                ) : branches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No branches found.</TableCell>
                  </TableRow>
                ) : (
                  branches.map((branch: any) => (
                    <TableRow key={branch._id} className="h-20 hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center border">
                            <Store className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold">{branch.name}</div>
                            <div className="text-xs text-muted-foreground font-medium">{branch.location || "N/A"}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm font-semibold mb-1">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" /> {branch.contactNumber || "N/A"}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center max-w-[200px] truncate">
                          {branch.location || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs uppercase">
                            {branch.managerName ? branch.managerName.substring(0, 2) : "BM"}
                          </div>
                          <div className="ml-3 text-sm font-semibold">{branch.managerName || "Not Assigned"}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="px-6 py-4 border-t text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{branches.length > 0 ? 1 : 0}-{branches.length}</span> of <span className="font-bold text-foreground">{totalBranches}</span> branches
          </div>
        </Card>
      </div>
    </div>
  );
}
