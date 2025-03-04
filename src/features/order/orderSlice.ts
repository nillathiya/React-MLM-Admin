import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrders } from './orderApi';

interface OrderState {
  isLoading: boolean;
  orders: any[];
}

export interface RootState {
  orders: OrderState;
}

const initialState: OrderState = {
  isLoading: false,
  orders: [],
};

export const getAllOrdersAsync = createAsyncThunk(
  'orders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllOrders();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserOrdersAsync
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload?.data || [];
      })
      .addCase(getAllOrdersAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ordersSlice.reducer;
