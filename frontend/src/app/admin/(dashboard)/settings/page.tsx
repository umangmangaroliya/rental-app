"use client";

import { useAuthStore } from "@/store/authStore";
import { User, Mail, Shield, Bell, Key, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-muted-foreground font-medium mb-4">
        <a href="#" className="hover:text-foreground">Dashboard</a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-bold">Settings</span>
      </nav>

      <div>
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground font-medium">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-red-100 text-red-600 font-black text-3xl">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-6">
              <h2 className="text-xl font-bold">{user?.name || "Admin User"}</h2>
              <p className="text-muted-foreground">{user?.email || "admin@gj5fashion.com"}</p>
              <Badge className="mt-2 bg-brand text-white hover:bg-brand">
                {user?.role || "ADMINISTRATOR"}
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            <div className="pb-8">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-brand" />
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    type="text" 
                    defaultValue={user?.name || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    type="email" 
                    defaultValue={user?.email || ""} 
                    className="bg-muted text-muted-foreground"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="pt-2">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-brand" />
                Change Password
              </h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 px-6 py-4 sm:px-8 flex justify-end">
          <Button className="bg-brand text-white hover:bg-red-700 shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
