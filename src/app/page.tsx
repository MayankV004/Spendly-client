"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  PieChart,
  TrendingUp,
  Shield,
  Smartphone,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">
                  S
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Spendly
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
             
              <Link href="/dashboard">
                <Button className="text-base">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t bg-white/95 backdrop-blur-sm">
              <div className="px-4 py-4 space-y-3">
                
                <Link href="/dashboard" className="block ">
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-base h-12"
                  >
                    Start
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Take Control of Your Finances
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Track expenses, visualize spending patterns, and achieve your
            financial goals with our modern, intuitive finance tracker.
          </p>

          {/* Mobile-optimized CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 sm:py-4 h-12 sm:h-14"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
            Everything you need to manage your personal finances effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <CardHeader className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">
                Visual Analytics
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Beautiful charts and graphs to visualize your spending patterns
                and financial trends
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <CardHeader className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">
                Expense Tracking
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Categorize and track all your expenses with smart categorization
                and detailed insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <CardHeader className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-red-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">
                Secure & Private
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Bank-level security with end-to-end encryption to keep your
                financial data safe
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <CardHeader className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">
                Mobile Ready
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Responsive design that works perfectly on all devices, anywhere
                you go
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container  mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white mx-auto">
          <CardContent className="p-8 sm:p-10 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of users who have taken control of their financial
              future
            </p>
            <Link href="/auth/signup" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 sm:py-4 h-12 sm:h-14 bg-white text-blue-600 hover:bg-gray-50"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <span className="font-semibold text-gray-600 text-sm sm:text-base">
                © 2025 Finora. All rights reserved.
              </span>
            </div>

            {/* Footer Links for larger screens */}
            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-gray-700 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-gray-700 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-gray-700 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
