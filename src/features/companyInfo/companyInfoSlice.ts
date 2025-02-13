import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCompanyInfo, updateCompanyInfo } from './companyInfoApi';
import { Pagination } from '../../types';

interface CompanyInfoState {
  isLoading: boolean;
  companyInfo: any;
  pagination: Pagination | null;
}

export interface RootState {
  companyInfo: CompanyInfoState;
}

const initialState: CompanyInfoState = {
  isLoading: false,
  companyInfo: null,
  pagination: null,
};

export const getCompanyInfoAsync = createAsyncThunk(
  'transaction/getCompanyInfo',
  async (
    params: {
      title?: string;
      label?: string;
      value?: string;
      type?: string;
      searchterm?: string;
      status?: number;
      limit?: number;
      page?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await getCompanyInfo(params);
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

export const updateCompanyInfoAsync = createAsyncThunk(
  'transaction/updateCompanyInfo',
  async (
    params: {
      id: string;
      formData: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateCompanyInfo(params);
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

const companyInfo = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getCompanyInfoAsync
      .addCase(getCompanyInfoAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyInfo = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getCompanyInfoAsync.rejected, (state) => {
        state.isLoading = false;
      })

      // updateCompanyInfoAsync
      .addCase(updateCompanyInfoAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyInfoAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCompanyInfoAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions
export default companyInfo.reducer;

export const selectLoading = (state: RootState) => state.companyInfo.isLoading;
export const selectCompanyInfo = (state: RootState) =>
  state.companyInfo.companyInfo;
export const selectCompanyInfoPaginationData = (state: RootState) =>
  state.companyInfo.pagination;
