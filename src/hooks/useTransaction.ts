import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchAllTransactions,
  fetchRecentTransactions,
  fetchTransactionStats,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  setFilters,
  clearFilters,
  clearError,
  clearTransactions,
  clearStats,
  TransactionFilters,
  CreateTransactionData,
  UpdateTransactionData,
} from "@/store/slices/transactionSlice";

export const useTransactions = () => {
  const dispatch = useAppDispatch();

  const {
    transactions,
    recentTransactions,
    stats,
    currentFilters,
    isLoading,
    isStatsLoading,
    isRecentLoading,
    error,
    total,
  } = useAppSelector((state) => state.transactions);

  const fetchTransactions = useCallback(
    async (filters?: TransactionFilters) => {
      return dispatch(fetchAllTransactions(filters || currentFilters));
    },
    [dispatch, currentFilters]
  );

  const fetchRecent = useCallback(
    async (limit?: number) => {
      return dispatch(fetchRecentTransactions(limit ?? 5));
    },
    [dispatch]
  );

  const fetchStats = useCallback(
    async (params: { month: number; year: number }) => {
      return dispatch(fetchTransactionStats(params));
    },
    [dispatch]
  );

  const addTransaction = useCallback(
    async (transactionData: CreateTransactionData) => {
      return dispatch(createTransaction(transactionData));
    },
    [dispatch]
  );

  const editTransaction = useCallback(
    async (updateData: UpdateTransactionData) => {
      return dispatch(updateTransaction(updateData));
    },
    [dispatch]
  );

  const removeTransaction = useCallback(
    async (id: string) => {
      console.log(id)
      return dispatch(deleteTransaction(id));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    async (filters: TransactionFilters) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const clearTransactionError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetTransactions = useCallback(() => {
    dispatch(clearTransactions());
  }, [dispatch]);

  const resetStats = useCallback(() => {
    dispatch(clearStats());
  }, [dispatch]);

  
  const getTransactionById = useCallback(
    (id: string) => {
      return transactions.find((transaction) => transaction._id === id);
    },
    [transactions]
  );

  const getTransactionsByCategory = useCallback(
    (category: string) => {
      return transactions.filter(
        (transaction) => transaction.category === category
      );
    },
    [transactions]
  );

  const getTransactionsByType = useCallback(
    (type: "income" | "expense") => {
      return transactions.filter((transaction) => transaction.type === type);
    },
    [transactions]
  );

  const getTransactionsByDateRange = useCallback(
    (startDate: string, endDate: string) => {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    },
    [transactions]
  );

  
  const totalIncome = stats?.totalIncome ?? 
    transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = stats?.totalExpenses ?? 
    Math.abs(
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)
    );

  const netBalance = stats?.totalSavings ?? (totalIncome - totalExpenses);


  // Categories summary
  const categorySummary = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0, total: 0, count: 0 };
    }

    if (type === "income") {
      acc[category].income += amount;
    } else {
      acc[category].expense += Math.abs(amount);
    }

    acc[category].total = acc[category].income - acc[category].expense;
    acc[category].count += 1;

    return acc;
  }, {} as Record<string, { income: number; expense: number; total: number; count: number }>);

  return {
    // State
    transactions,
    recentTransactions,
    stats,
    currentFilters,
    isLoading,
    isStatsLoading,
    isRecentLoading,
    error,
    total,

    // Actions
    fetchTransactions,
    fetchRecent,
    fetchStats,
    addTransaction,
    editTransaction,
    removeTransaction,
    updateFilters,
    resetFilters,
    clearTransactionError,
    resetTransactions,
    resetStats,

    // Utility functions
    getTransactionById,
    getTransactionsByCategory,
    getTransactionsByType,
    getTransactionsByDateRange,

    // Computed values
    totalIncome,
    totalExpenses,
    netBalance,
    categorySummary,
  };
};
