import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWithdrawal } from './withdrawalApi';

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface WithdrawalState {
  isLoading: boolean;
  data: Withdrawal[];
  totalWithdrawals: number | null;
  withdrawal: any;
}

const initialState: WithdrawalState = {
  data: [],
  isLoading: false,
  withdrawal: null,
  totalWithdrawals: null,
};

export const fetchWithdrawals = createAsyncThunk(
  'withdrawals/fetchWithdrawals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllWithdrawal();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  },
);

const withdrawalSlice = createSlice({
  name: 'withdrawal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithdrawals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.totalWithdrawals = action.payload.total;
      })
      .addCase(fetchWithdrawals.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default withdrawalSlice.reducer;
