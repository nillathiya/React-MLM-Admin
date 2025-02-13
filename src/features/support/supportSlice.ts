import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSupportRequests, updateSupportRequest } from './supportApi';
import { Pagination, Support } from '../../types';

interface SupportState {
  isLoading: boolean;
  requestedSupports: Support[];
  pagination: Pagination | null;
}

export interface RootState {
  support: SupportState;
}

const initialState: SupportState = {
  isLoading: false,
  requestedSupports: [],
  pagination: null,
};

export const getSupportRequestsAsync = createAsyncThunk(
  'support/getSupportRequests',
  async (
    params: {
      ticket?: string;
      username?: string;
      date?: string;
      status?: number;
      limit?: number;
      page?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await getSupportRequests(params);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const updateSupportRequestAsync = createAsyncThunk(
  'transaction/updateSupportRequest',
  async (
    params: {
      id: string;
      formData: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateSupportRequest(params);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getSupportRequestsAsync
      .addCase(getSupportRequestsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupportRequestsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestedSupports = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getSupportRequestsAsync.rejected, (state) => {
        state.isLoading = false;
      })

      // updateCompanyInfoAsync
      .addCase(updateSupportRequestAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupportRequestAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSupportRequestAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions
export default supportSlice.reducer;

export const selectLoading = (state: RootState) => state.support.isLoading;
export const selectRequestedSupports = (state: RootState) =>
  state.support.requestedSupports;
export const selectSupportPaginationData = (state: RootState) =>
  state.support.pagination;
