import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IContactUs, Pagination } from '../../types';
import {
  getAllUser,
  getUserById,
  updateUserProfile,
  checkUsername,
  getContactMessages,
  changeConatctMesasgeStatus,
} from './userApi';

interface UserState {
  user: any;
  users: any[];
  isLoading: boolean;
  pagination: Pagination | null;
  contactMessages: IContactUs[];
}

export interface RootState {
  users: UserState;
}

const initialState: UserState = {
  user: [],
  users: [],
  isLoading: false,
  pagination: null,
  contactMessages: [],
};

// Async Thunks
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
  async (formData: any, { rejectWithValue }) => {
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

export const checkUsernameAsync = createAsyncThunk(
  'user/checkUsername',
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = await checkUsername(formData);
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

export const getContactMessagesAsync = createAsyncThunk(
  'user/getContactMessages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContactMessages();
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

export const changeConatctMesasgeStatusAsync = createAsyncThunk(
  'user/changeConatctMesasgeStatus',
  async (formData:{  id:string,
    status:string}, { rejectWithValue }) => {
    try {
      const data = await changeConatctMesasgeStatus(formData);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      // checkUsernameAsync
      .addCase(checkUsernameAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUsernameAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(checkUsernameAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // getContactMessagesAsync
      .addCase(getContactMessagesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactMessagesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactMessages = action.payload.data;
      })
      .addCase(getContactMessagesAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // toggleContactMessageStatusAsync
      .addCase(changeConatctMesasgeStatusAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeConatctMesasgeStatusAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContactMessage = action.payload.data;
        state.contactMessages = state.contactMessages.map((message) =>
          message._id === updatedContactMessage._id
            ? updatedContactMessage
            : message,
        );
      })
      .addCase(changeConatctMesasgeStatusAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.users.user;
export const selectPaginationData = (state: RootState) =>
  state.users.pagination;
export const selectedUser = (state: RootState) => state.users.user;
export const selectLoading = (state: RootState) => state.users.isLoading;
