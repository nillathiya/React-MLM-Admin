import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FranchiseData, Pagination } from '../../types';
import { addUser, getAllUser, getById, updateUser } from './userApi';

interface UserState {
  user: any;
  users: any[];
  isLoading: boolean;
  pagination: Pagination | null;
}

export interface RootState {
  users: UserState;
}

const initialState: UserState = {
  user: [],
  users: [],
  isLoading: false,
  pagination: null,
};

// Async Thunks
export const addUserAsync = createAsyncThunk(
  'users/addUserAsync',
  async (formData: FranchiseData, { rejectWithValue }) => {
    try {
      const data = await addUser(formData);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  },
);

export const getAllUserAsync = createAsyncThunk(
  'users/getAllUser',
  async (
    params: {
      searchterm?: string;
      isActive?: number;
      blockStatus?: number;
      limit?: number;
      page?: number;
      includeTotalMachine?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await getAllUser(params);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const getByIdAsync = createAsyncThunk(
  'users/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getById(id);
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);
export const updateUserAsync = createAsyncThunk(
  'users/updateuser',
  async (params: { id: string; formData: any }, { rejectWithValue }) => {
    const { id, formData } = params;
    try {
      const data = await updateUser(id, formData);
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add User
      .addCase(addUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.push(action.payload.data);
      })
      .addCase(addUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      //   getAllUserAsync
      .addCase(getAllUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // getByIdAsync
      .addCase(getByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getByIdAsync.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.users.user;
export const selectPaginationData = (state: RootState) =>
  state.users.pagination;
export const selectedUser = (state: RootState) => state.users.user;
export const selectLoading = (state: RootState) => state.users.isLoading;
