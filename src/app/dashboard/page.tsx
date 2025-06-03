"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  FileX,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { useTransactions } from "@/hooks/useTransaction";
import { useEffect, useState } from "react";
import { getCategoryColor, transformMonthlyTrend } from "@/lib/dashboardUtils";

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

const trendData = [
  { month: "Jan", amount: 3200 },
  { month: "Feb", amount: 3400 },
  { month: "Mar", amount: 3100 },
  { month: "Apr", amount: 3800 },
  { month: "May", amount: 3600 },
  { month: "Jun", amount: 4200 },
];

// Empty state component
const EmptyStateCard = ({ 
  title, 
  description, 
  icon: Icon = FileX,
  height = "h-[250px] sm:h-[300px]"
}: {
  title: string;
  description: string;
  icon?: any;
  height?: string;
}) => (
  <div className={`${height} flex flex-col items-center justify-center text-gray-500`}>
    <Icon className="h-12 w-12 mb-4 text-gray-300" />
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-center text-gray-400">{description}</p>
  </div>
);

export default function DashboardPage() {
  const { user, isAuthenticated, fetchUserProfile } = useAuth();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  
  const {
    recentTransactions,
    stats,
    isStatsLoading,
    isRecentLoading,
    fetchStats,
    fetchRecent,
    totalIncome,
    totalExpenses,
    error,
  } = useTransactions();
  
  // Ensure user data is loaded
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && !user) {
        setIsLoadingUser(true);
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Failed to load user profile:', error);
        } finally {
          setIsLoadingUser(false);
        }
      }
    };

    loadUserData();
  }, [isAuthenticated, user, fetchUserProfile]);

  // Load transaction data
  useEffect(() => {
    if (isAuthenticated) {
      const currDate = new Date();
      const month = currDate.getMonth() + 1;
      const year = currDate.getFullYear();
      fetchStats({ month, year });
      fetchRecent(5);
    }
  }, [isAuthenticated, fetchRecent, fetchStats]);

  const expenseData: ExpenseData[] =
    stats?.categoryBreakdown?.map((category) => ({
      name: category.name,
      value: category.value,
      color: getCategoryColor(category.name),
    })) ?? [];
    
  const monthlyData = stats?.monthlyTrend
    ? transformMonthlyTrend(stats.monthlyTrend)
    : [];
    
  const monthlyBudget = totalIncome;
  const budgetRemaining = monthlyBudget - totalExpenses;
  const budgetPercentage =
    monthlyBudget > 0
      ? ((budgetRemaining / monthlyBudget) * 100).toFixed(0)
      : "0";

  // Show loading state while initializing
  if (isStatsLoading || isLoadingUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">Error: {error}</div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600 mb-4">Please log in to view your dashboard</div>
          <Button onClick={() => window.location.href = '/auth/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {"Here's what's happening with your finances this month."}
          </p>
          {user?.isEmailVerified === false && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                ⚠ Please verify your email address to ensure account security.
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total Income
              </CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Current month total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total Expenses
              </CardTitle>
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-red-600">
                ₹{totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Current month total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Budget Remaining
              </CardTitle>
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                ₹{budgetRemaining.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {budgetPercentage}% of monthly budget
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Expense Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Expense Breakdown</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your spending by category this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              {expenseData.length === 0 ? (
                <EmptyStateCard
                  title="No Expense Data"
                  description="Add some expenses to see your spending breakdown"
                  icon={PiggyBank}
                />
              ) : (
                <ChartContainer
                  config={{
                    value: {
                      label: "Amount",
                    },
                  }}
                  className="h-[250px] sm:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          isMobile()
                            ? `${(percent * 100).toFixed(0)}%`
                            : `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Income vs Expenses Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Income vs Expenses</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Monthly comparison over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyData.length === 0 ? (
                <EmptyStateCard
                  title="No Monthly Data"
                  description="Track your income and expenses to see monthly comparisons"
                  icon={BarChart3}
                />
              ) : (
                <ChartContainer
                  config={{
                    income: {
                      label: "Income",
                      color: "hsl(var(--chart-1))",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[250px] sm:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: isMobile() ? 10 : 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: isMobile() ? 10 : 12 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="income" fill="#16a34a" />
                      <Bar dataKey="expenses" fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Spending Trend and Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Spending Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Spending Trend</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your monthly spending pattern
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trendData.length === 0 ? (
                <EmptyStateCard
                  title="No Trend Data"
                  description="Start tracking expenses to see your spending trends"
                  icon={TrendingUp}
                />
              ) : (
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[250px] sm:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: isMobile() ? 10 : 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: isMobile() ? 10 : 12 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--color-amount)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">Recent Transactions</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Your latest financial activity
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isRecentLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-sm">Loading transactions...</span>
                </div>
              ) : recentTransactions.length === 0 ? (
                <EmptyStateCard
                  title="No Transactions"
                  description="Add your first transaction to get started"
                  icon={FileX}
                  height="h-[200px]"
                />
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            transaction.type === "income"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs sm:text-sm truncate">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p
                          className={`font-medium text-xs sm:text-sm ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}₹
                          {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}