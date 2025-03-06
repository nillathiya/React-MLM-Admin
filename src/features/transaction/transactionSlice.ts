import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllIncomeTransaction } from './transactionApi';
import { IncomeTransaction } from '../../types';

interface TransactionState {
  isLoading: boolean;
  incomeTransactionsLoading: boolean;
  transactions: [];
  incomeTransactions: IncomeTransaction[];
}

const initialState: TransactionState = {
  isLoading: false,
  incomeTransactionsLoading: false,
  transactions: [],
  incomeTransactions: [],
};

export const getAllIncomeTransactionAsync = createAsyncThunk(
  'transaction/getAllIncomeTransaction',
  async (formData:any, { rejectWithValue }) => {
    try {
      const data = await getAllIncomeTransaction(formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  },
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllIncomeTransactionAsync
      .addCase(getAllIncomeTransactionAsync.pending, (state) => {
        state.incomeTransactionsLoading = true;
      })
      .addCase(getAllIncomeTransactionAsync.fulfilled, (state, action) => {
        state.incomeTransactionsLoading = false;
        state.incomeTransactions = action.payload.data;
      })
      .addCase(getAllIncomeTransactionAsync.rejected, (state) => {
        state.incomeTransactionsLoading = false;
      });
  },
});

export default transactionSlice.reducer;
