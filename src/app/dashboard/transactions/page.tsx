"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Edit, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTransactions } from "@/hooks/useTransaction";
import {
  Transaction,
  CreateTransactionData,
} from "@/store/slices/transactionSlice";
import { toast } from "sonner";
import { EditTransactionModal } from "@/components/EditTransactionModal"; 

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Income",
  "Other",
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  
  const {
    transactions,
    fetchTransactions,
    isLoading,
    error,
    editTransaction,
    removeTransaction,
    updateFilters,
    resetFilters,
  } = useTransactions();

  useEffect(() => {
    const filters = {
      search: searchTerm || undefined,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      type: selectedType !== "all" ? selectedType : undefined,
    };
    updateFilters(filters);
    fetchTransactions(filters);
  }, [searchTerm, selectedCategory, selectedType]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || transaction.category === selectedCategory;
    const matchesType =
      selectedType === "all" || transaction.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleEdit = (transaction: Transaction): void => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDelete = (transaction: Transaction): void => {
    setTransactionToDelete(transaction);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (transactionToDelete) {
      try {
        console.log(transactionToDelete._id);
        await removeTransaction(transactionToDelete._id);
        toast.success(`Deleted ${transactionToDelete.description}`);
        setIsDeleteDialogOpen(false);
        setTransactionToDelete(null);
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        toast.error("Failed to delete transaction");
      }
    }
  };

  const handleEditSubmit = async (
    formData: Partial<CreateTransactionData>
  ): Promise<void> => {
    if (editingTransaction) {
      try {
        // console.log(editTransaction)
        await editTransaction({
          id: editingTransaction._id,
          ...formData,
        });
        toast.success(`Updated ${editingTransaction.description}`);
        setIsEditModalOpen(false);
        setEditingTransaction(null);
        fetchTransactions();
      } catch (error) {
        console.error("Failed to update transaction:", error);
        toast.error("Failed to update transaction");
      }
    }
  };

  const handleEditModalClose = (): void => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const exportTransactions = (): void => {
    const csvContent = [
      ["Date", "Description", "Category", "Type", "Amount"].join(","),
      ...filteredTransactions.map((t: Transaction) =>
        [
          new Date(t.date).toLocaleDateString(),
          `"${t.description}"`, // Wrap in quotes to handle commas
          t.category,
          t.type,
          t.amount.toString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetAllFilters = (): void => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedType("all");
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transactions
          </h1>
          <p className="text-gray-600">
            Manage and track all your financial transactions
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search transactions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportTransactions}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetAllFilters}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error}</p>
            </CardContent>  
          </Card>
        )}

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-500">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          transaction.type === "income"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                        {transaction.notes && (
                          <p className="ml-2 text-sm text-gray-600">
                            {transaction.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : ""}₹
                          {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {transaction.type}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(transaction)}
                          disabled={isLoading}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(transaction)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Transaction Modal */}
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          transaction={editingTransaction}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "
                {transactionToDelete?.description}"? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setTransactionToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}