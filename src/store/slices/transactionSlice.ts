import axios from '@/lib/axios'

import {createSlice , createAsyncThunk , PayloadAction } from '@reduxjs/toolkit'

export interface Transaction{
    _id:string,
    userId:string,
    description:string,
    amount : number,
    type:'income' | 'expense',
    category:string,
    date:string;
    notes?:string,
    createdAt:string,
    updatedAt:string,
}

export interface TransactionStats {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number;
  categoryBreakdown: Array<{
    name: string;
    value: number;
    count: number;
  }>;
  monthlyTrend: Array<{
    _id: {
      month: number;
      year: number;
      type: string;
    };
    total: number;
  }>;
}

export interface TransactionFilters {
  category?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateTransactionData {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date?: string;
  notes?: string;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: string;
}

export interface TransactionState {
  transactions: Transaction[];
  recentTransactions: Transaction[];
  stats: TransactionStats | null;
  currentFilters: TransactionFilters;
  isLoading: boolean;
  isStatsLoading: boolean;
  isRecentLoading: boolean;
  error: string | null;
  total: number;
}

const initialState: TransactionState = {
  transactions: [],
  recentTransactions: [],
  stats: null,
  currentFilters: {},
  isLoading: false,
  isStatsLoading: false,
  isRecentLoading: false,
  error: null,
  total: 0,
};

export const fetchAllTransactions = createAsyncThunk('transaction/fetchAll' , async(filters:TransactionFilters = {} , {rejectWithValue} )=>{
    try{
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([Key,value])=>{
            if(value !== undefined && value !== null && value !== '')
            {
                params.append(Key,value.toString());
            }
        })
        const response = await axios.get(`/transactions?${params.toString()}`);
        return response.data;
    }catch(error:any)
    {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch Transactions'
        );
    }
});

export const fetchRecentTransactions = createAsyncThunk(
  "transactions/fetchRecent",
  async (limit: number = 5, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/transactions/recent?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent transactions"
      );
    }
  }
);

export const fetchTransactionStats = createAsyncThunk(
  "transactions/fetchStats",
  async (params: { month?: number; year?: number } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.month) queryParams.append("month", params.month.toString());
      if (params.year) queryParams.append("year", params.year.toString());

      const response = await axios.get(`/transactions/stats?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transaction statistics"
      );
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transactionData: CreateTransactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/transactions", transactionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, ...updateData }: UpdateTransactionData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/transactions/${id}`, updateData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/transactions/${id}`);
      return { id };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete transaction"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<TransactionFilters>) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },
    clearFilters: (state) => {
      state.currentFilters = {};
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.total = 0;
    },
    clearStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Transactions
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.data;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Recent Transactions
    builder
      .addCase(fetchRecentTransactions.pending, (state) => {
        state.isRecentLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.isRecentLoading = false;
        state.recentTransactions = action.payload.data;
        state.error = null;
      })
      .addCase(fetchRecentTransactions.rejected, (state, action) => {
        state.isRecentLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Transaction Stats
    builder
      .addCase(fetchTransactionStats.pending, (state) => {
        state.isStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionStats.fulfilled, (state, action) => {
        state.isStatsLoading = false;
        state.stats = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTransactionStats.rejected, (state, action) => {
        state.isStatsLoading = false;
        state.error = action.payload as string;
      });

    // Create Transaction
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload.data);
        state.total += 1;
        state.error = null;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Transaction
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          (t) => t._id === action.payload.data._id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Transaction
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (t) => t._id !== action.payload.id
        );
        state.recentTransactions = state.recentTransactions.filter(
          (t) => t._id !== action.payload.id
        );
        state.total = Math.max(0, state.total - 1);
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearFilters,
  clearTransactions,
  clearStats,
} = transactionSlice.actions;

export default transactionSlice.reducer;