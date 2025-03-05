import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Pagination } from '../../types';
import { addUser, getAllUser, getUserById, updateUserProfile } from './userApi';

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
  'user/addUserAsync',
  async (formData: any, { rejectWithValue }) => {
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
  'user/getAllUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllUser();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const getUserByIdAsync = createAsyncThunk(
  'user/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await getUserById(userId);
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
export const updateUserProfileAsync = createAsyncThunk(
  'user/updateUserProfile',
  async (formData:any, { rejectWithValue }) => {
    try {
      const data = await updateUserProfile(formData);
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
  name: 'user',
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
      })
      .addCase(getAllUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // getUserByIdAsync
      .addCase(getUserByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserByIdAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // updateUserProfileAsync
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUserProfileAsync.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.users.user;
export const selectPaginationData = (state: RootState) =>
  state.users.pagination;
export const selectedUser = (state: RootState) => state.users.user;
export const selectLoading = (state: RootState) => state.users.isLoading;
