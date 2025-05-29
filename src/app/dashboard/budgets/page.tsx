"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle2 } from "lucide-react"
import ProfileDropdown from "@/components/ProfileDropdown" // Declare the ProfileDropdown variable

// Sample budget data
const budgetData = [
  {
    id: 1,
    category: "Food & Dining",
    budgeted: 1000,
    spent: 850,
    remaining: 150,
    color: "bg-blue-600",
  },
  {
    id: 2,
    category: "Transportation",
    budgeted: 500,
    spent: 450,
    remaining: 50,
    color: "bg-purple-600",
  },
  {
    id: 3,
    category: "Entertainment",
    budgeted: 300,
    spent: 320,
    remaining: -20,
    color: "bg-pink-600",
  },
  {
    id: 4,
    category: "Shopping",
    budgeted: 400,
    spent: 250,
    remaining: 150,
    color: "bg-green-600",
  },
  {
    id: 5,
    category: "Bills & Utilities",
    budgeted: 800,
    spent: 800,
    remaining: 0,
    color: "bg-yellow-600",
  },
  {
    id: 6,
    category: "Healthcare",
    budgeted: 200,
    spent: 50,
    remaining: 150,
    color: "bg-red-600",
  },
]

const allTransactions = [
  { id: 1, date: "2024-01-15", description: "Grocery Store", category: "Food & Dining", amount: -85.5 },
  { id: 2, date: "2024-01-14", description: "Restaurant Dinner", category: "Food & Dining", amount: -65.3 },
  { id: 3, date: "2024-01-13", description: "Coffee Shop", category: "Food & Dining", amount: -12.5 },
  { id: 4, date: "2024-01-12", description: "Gas Station", category: "Transportation", amount: -45.2 },
  { id: 5, date: "2024-01-11", description: "Uber Ride", category: "Transportation", amount: -18.5 },
  { id: 6, date: "2024-01-10", description: "Netflix Subscription", category: "Entertainment", amount: -15.99 },
  { id: 7, date: "2024-01-09", description: "Movie Tickets", category: "Entertainment", amount: -24.0 },
  { id: 8, date: "2024-01-08", description: "Online Shopping", category: "Shopping", amount: -89.99 },
  { id: 9, date: "2024-01-07", description: "Electric Bill", category: "Bills & Utilities", amount: -120.0 },
  { id: 10, date: "2024-01-06", description: "Doctor Visit", category: "Healthcare", amount: -50.0 },
]

const spendingHistory = {
  "Food & Dining": [
    { week: "Week 1", spent: 200 },
    { week: "Week 2", spent: 250 },
    { week: "Week 3", spent: 180 },
    { week: "Week 4", spent: 220 },
  ],
  Transportation: [
    { week: "Week 1", spent: 100 },
    { week: "Week 2", spent: 120 },
    { week: "Week 3", spent: 90 },
    { week: "Week 4", spent: 140 },
  ],
  Entertainment: [
    { week: "Week 1", spent: 80 },
    { week: "Week 2", spent: 90 },
    { week: "Week 3", spent: 70 },
    { week: "Week 4", spent: 80 },
  ],
}

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Other",
]

export default function BudgetsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<any>(null)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [selectedBudgetForTransactions, setSelectedBudgetForTransactions] = useState<any>(null)
  const [isBudgetDetailsModalOpen, setIsBudgetDetailsModalOpen] = useState(false)
  const [selectedBudgetForDetails, setSelectedBudgetForDetails] = useState<any>(null)

  const totalBudgeted = budgetData.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgetData.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  const handleEditBudget = (budget: any) => {
    setSelectedBudget(budget)
    setIsEditDialogOpen(true)
  }

  const handleViewTransactions = (budget: any) => {
    setSelectedBudgetForTransactions(budget)
    setIsTransactionModalOpen(true)
  }

  const handleViewBudgetDetails = (budget: any) => {
    setSelectedBudgetForDetails(budget)
    setIsBudgetDetailsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Finora
                </span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/dashboard/transactions" className="text-gray-600 hover:text-gray-900">
                  Transactions
                </Link>
                <Link href="/dashboard/budgets" className="text-blue-600 font-medium">
                  Budgets
                </Link>
                <Link href="/dashboard/goals" className="text-gray-600 hover:text-gray-900">
                  Goals
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Management</h1>
          <p className="text-gray-600">Set and track your spending limits by category</p>
        </div>

        {/* Budget Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalRemaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${totalRemaining.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{totalRemaining >= 0 ? "Under budget" : "Over budget"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Budget Button */}
        <div className="flex justify-end mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>Set a monthly budget for a specific category.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Budget Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Create Budget</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetData.map((budget) => (
            <Card key={budget.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-medium">{budget.category}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditBudget(budget)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Spent: ${budget.spent}</span>
                    <span>Budget: ${budget.budgeted}</span>
                  </div>
                  <Progress
                    value={(budget.spent / budget.budgeted) * 100}
                    className={`h-2 ${budget.spent > budget.budgeted ? "bg-red-200" : ""}`}
                    indicatorClassName={budget.spent > budget.budgeted ? "bg-red-600" : budget.color}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">Remaining: </span>
                      <span
                        className={`text-sm font-medium ${budget.remaining >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${budget.remaining}
                      </span>
                    </div>
                    <div>
                      {budget.remaining < 0 ? (
                        <div className="flex items-center text-red-600 text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Over budget
                        </div>
                      ) : budget.remaining === 0 ? (
                        <div className="flex items-center text-yellow-600 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          On budget
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Under budget
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleViewBudgetDetails(budget)}>
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewTransactions(budget)}>
                  View Transactions
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Budget Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>Update your budget for {selectedBudget?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-amount">Budget Amount ($)</Label>
              <Input id="edit-amount" type="number" placeholder="0.00" defaultValue={selectedBudget?.budgeted} />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Update Budget</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Transaction Details Modal */}
      <Dialog open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBudgetForTransactions?.category} Transactions</DialogTitle>
            <DialogDescription>
              All transactions for {selectedBudgetForTransactions?.category} this month
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allTransactions
              .filter((transaction) => transaction.category === selectedBudgetForTransactions?.category)
              .map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">${Math.abs(transaction.amount).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            {allTransactions.filter((transaction) => transaction.category === selectedBudgetForTransactions?.category)
              .length === 0 && (
              <div className="text-center py-8 text-gray-500">No transactions found for this category</div>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setIsTransactionModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Budget Details Modal */}
      <Dialog open={isBudgetDetailsModalOpen} onOpenChange={setIsBudgetDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBudgetForDetails?.category} Budget Details</DialogTitle>
            <DialogDescription>
              Detailed breakdown and analysis for your {selectedBudgetForDetails?.category} budget
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Budgeted</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${selectedBudgetForDetails?.budgeted?.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-xl font-bold text-red-600">
                      ${selectedBudgetForDetails?.spent?.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p
                      className={`text-xl font-bold ${(selectedBudgetForDetails?.remaining || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${selectedBudgetForDetails?.remaining?.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Usage</span>
                <span>
                  {Math.round(
                    ((selectedBudgetForDetails?.spent || 0) / (selectedBudgetForDetails?.budgeted || 1)) * 100,
                  )}
                  %
                </span>
              </div>
              <Progress
                value={((selectedBudgetForDetails?.spent || 0) / (selectedBudgetForDetails?.budgeted || 1)) * 100}
                className="h-3"
                indicatorClassName={
                  (selectedBudgetForDetails?.spent || 0) > (selectedBudgetForDetails?.budgeted || 0)
                    ? "bg-red-600"
                    : "bg-blue-600"
                }
              />
            </div>

            {/* Weekly Spending */}
            <div>
              <h4 className="font-semibold mb-3">Weekly Spending Breakdown</h4>
              <div className="space-y-2">
                {spendingHistory[selectedBudgetForDetails?.category]?.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{week.week}</span>
                    <span className="font-medium">${week.spent}</span>
                  </div>
                )) || <div className="text-center py-4 text-gray-500">No weekly data available</div>}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Average Weekly Spend</p>
                <p className="font-semibold">
                  $
                  {spendingHistory[selectedBudgetForDetails?.category]
                    ? Math.round(
                        spendingHistory[selectedBudgetForDetails?.category].reduce((sum, week) => sum + week.spent, 0) /
                          4,
                      )
                    : 0}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Days Remaining</p>
                <p className="font-semibold">{Math.ceil(new Date(2024, 1, 0).getDate() - new Date().getDate())} days</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsBudgetDetailsModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleEditBudget(selectedBudgetForDetails)}>Edit Budget</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
