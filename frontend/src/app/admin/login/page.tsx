"use client";

import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Diamond, Eye, EyeOff, HeadphonesIcon, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
}).required();

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await axios.post("http://localhost:5000/api/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.role !== "ADMIN" && data.role !== "STAFF") {
        setError("root", { type: "manual", message: "Unauthorized access. Admin privileges required." });
        return;
      }

      login(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token,
      );

      router.push("/admin");
    },
    onError: (error: any) => {
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Invalid email or password",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10"></div>
        {/* Using a placeholder for the image since we don't have the exact asset */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583391733959-b15124b88fc1?auto=format&fit=crop&q=80')",
          }}
        ></div>

        <div className="absolute top-8 left-8 z-20 flex items-center">
          <div className="bg-brand p-2 rounded-md flex items-center justify-center mr-3">
            <Diamond className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold">GJ 5 Fashion</span>
        </div>

        <div className="absolute bottom-16 left-12 z-20 max-w-lg">
          <div className="w-12 h-1 bg-yellow-500 mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Preserving tradition through elegance. The admin portal for managing
            our timeless collection across all branches.
          </h2>
          <p className="text-white/60 text-sm">© 2024 GJ 5 Fashion Retailers</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-500 text-sm">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="bg-red-50 text-brand text-sm p-3 rounded-lg border border-red-100">
                {errors.root.message}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">Email address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gj5fashion.com"
                  className={`pl-10 h-12 ${errors.email ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-brand">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password" className="text-gray-900">Password</Label>
                <a
                  href="#"
                  className="text-sm font-medium text-brand hover:text-red-700"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-brand">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full h-12 bg-brand hover:bg-red-700 text-white mt-2"
            >
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-10 border-t border-gray-100 pt-6 text-center">
            <p className="flex items-center justify-center text-sm text-gray-500">
              <HeadphonesIcon className="w-4 h-4 mr-2 text-gray-400" />
              Having trouble logging in?{" "}
              <a
                href="#"
                className="font-medium text-gray-900 ml-1 hover:underline"
              >
                Contact Support
              </a>
            </p>

            {/* Small decorative dots */}
            <div className="flex justify-center space-x-1 mt-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
