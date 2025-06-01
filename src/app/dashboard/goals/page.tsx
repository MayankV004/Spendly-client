"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Calendar, Target, TrendingUp, PiggyBank } from "lucide-react"
import ProfileDropdown from "@/components/ProfileDropdown" // Declare the ProfileDropdown variable
import Navbar from "@/components/Navbar"

// Sample goals data
const goalsData = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    deadline: "2024-12-31",
    icon: "PiggyBank",
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "New Car",
    target: 25000,
    current: 8000,
    deadline: "2025-06-30",
    icon: "Car",
    color: "bg-purple-600",
  },
  {
    id: 3,
    name: "Vacation",
    target: 5000,
    current: 3200,
    deadline: "2024-08-15",
    icon: "Plane",
    color: "bg-green-600",
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 50000,
    current: 15000,
    deadline: "2026-01-01",
    icon: "Home",
    color: "bg-yellow-600",
  },
]

const goalProgressHistory = {
  1: [
    // Emergency Fund
    { date: "2024-01-01", amount: 5000, note: "Initial deposit" },
    { date: "2024-01-15", amount: 6000, note: "Monthly savings" },
    { date: "2024-01-30", amount: 6500, note: "Bonus deposit" },
  ],
  2: [
    // New Car
    { date: "2024-01-01", amount: 6000, note: "Initial savings" },
    { date: "2024-01-15", amount: 7000, note: "Monthly contribution" },
    { date: "2024-01-30", amount: 8000, note: "Side income" },
  ],
  3: [
    // Vacation
    { date: "2024-01-01", amount: 2500, note: "Starting amount" },
    { date: "2024-01-15", amount: 3000, note: "Monthly savings" },
    { date: "2024-01-30", amount: 3200, note: "Extra savings" },
  ],
  4: [
    // Home Down Payment
    { date: "2024-01-01", amount: 12000, note: "Initial amount" },
    { date: "2024-01-15", amount: 13500, note: "Monthly contribution" },
    { date: "2024-01-30", amount: 15000, note: "Investment returns" },
  ],
}

export default function GoalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [isGoalDetailsModalOpen, setIsGoalDetailsModalOpen] = useState(false)
  const [selectedGoalForDetails, setSelectedGoalForDetails] = useState<any>(null)
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false)
  const [selectedGoalForFunds, setSelectedGoalForFunds] = useState<any>(null)

  const handleEditGoal = (goal: any) => {
    setSelectedGoal(goal)
    setIsEditDialogOpen(true)
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const calculateTimeRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day left"
    if (diffDays < 30) return `${diffDays} days left`

    const diffMonths = Math.floor(diffDays / 30)
    return diffMonths === 1 ? "1 month left" : `${diffMonths} months left`
  }

  const handleViewDetails = (goal: any) => {
    setSelectedGoalForDetails(goal)
    setIsGoalDetailsModalOpen(true)
  }

  const handleAddFunds = (goal: any) => {
    setSelectedGoalForFunds(goal)
    setIsAddFundsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Goals</h1>
          <p className="text-gray-600">Set, track, and achieve your financial goals</p>
        </div>

        {/* Goals Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goalsData.length}</div>
              <p className="text-xs text-muted-foreground">Goals in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <PiggyBank className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${goalsData.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Across all goals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${goalsData.reduce((sum, goal) => sum + (goal.target - goal.current), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Left to reach all goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Button */}
        <div className="flex justify-end mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>Set a new financial goal to work towards.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input id="goal-name" placeholder="e.g. Emergency Fund" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount ($)</Label>
                  <Input id="target-amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-amount">Current Amount ($)</Label>
                  <Input id="current-amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Create Goal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Goals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goalsData.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target)
            const timeRemaining = calculateTimeRemaining(goal.deadline)

            return (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 rounded-full ${goal.color} flex items-center justify-center`}>
                        <PiggyBank className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>{goal.name}</CardTitle>
                        <CardDescription>Target: ${goal.target.toLocaleString()}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)}>
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
                      <span>Current: ${goal.current.toLocaleString()}</span>
                      <span>{progress}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" indicatorClassName={goal.color} />
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">Remaining: </span>
                        <span className="text-sm font-medium">${(goal.target - goal.current).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {timeRemaining}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(goal)}>
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => handleAddFunds(goal)}>
                    Add Funds
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>Update your financial goal</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-goal-name">Goal Name</Label>
              <Input id="edit-goal-name" defaultValue={selectedGoal?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-target-amount">Target Amount ($)</Label>
              <Input id="edit-target-amount" type="number" defaultValue={selectedGoal?.target} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-current-amount">Current Amount ($)</Label>
              <Input id="edit-current-amount" type="number" defaultValue={selectedGoal?.current} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-deadline">Target Date</Label>
              <Input id="edit-deadline" type="date" defaultValue={selectedGoal?.deadline} />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Update Goal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Goal Details Modal */}
      <Dialog open={isGoalDetailsModalOpen} onOpenChange={setIsGoalDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedGoalForDetails?.name} Details</DialogTitle>
            <DialogDescription>Detailed information and progress history for your goal</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Goal Summary */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Current Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedGoalForDetails?.current?.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Target Amount</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${selectedGoalForDetails?.target?.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {calculateProgress(selectedGoalForDetails?.current || 0, selectedGoalForDetails?.target || 1)}%
                </span>
              </div>
              <Progress
                value={calculateProgress(selectedGoalForDetails?.current || 0, selectedGoalForDetails?.target || 1)}
                className="h-3"
              />
            </div>

            {/* Goal Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Remaining Amount</p>
                <p className="font-semibold">
                  ${((selectedGoalForDetails?.target || 0) - (selectedGoalForDetails?.current || 0)).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Target Date</p>
                <p className="font-semibold">{selectedGoalForDetails?.deadline}</p>
              </div>
            </div>

            {/* Progress History */}
            <div>
              <h4 className="font-semibold mb-3">Progress History</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {goalProgressHistory[selectedGoalForDetails?.id]?.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{entry.note}</p>
                      <p className="text-xs text-gray-500">{entry.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${entry.amount.toLocaleString()}</p>
                    </div>
                  </div>
                )) || <div className="text-center py-4 text-gray-500">No progress history available</div>}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsGoalDetailsModalOpen(false)}>
              Close
            </Button>
            <Button>Add Funds</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Funds Modal */}
      <Dialog open={isAddFundsModalOpen} onOpenChange={setIsAddFundsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to {selectedGoalForFunds?.name}</DialogTitle>
            <DialogDescription>Add money to your {selectedGoalForFunds?.name} goal</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fund-amount">Amount ($)</Label>
              <Input id="fund-amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fund-note">Note (Optional)</Label>
              <Input id="fund-note" placeholder="e.g. Monthly savings" />
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Current Amount:</span>
                <span>${selectedGoalForFunds?.current?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Target Amount:</span>
                <span>${selectedGoalForFunds?.target?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Remaining:</span>
                <span>
                  ${((selectedGoalForFunds?.target || 0) - (selectedGoalForFunds?.current || 0)).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddFundsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddFundsModalOpen(false)}>Add Funds</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
