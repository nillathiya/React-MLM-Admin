import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRankSettings,
  createRankSetting,
  updateRankSetting,
  deleteRankSetting,
  deleteRow,
  saveRow,
} from './settingsApi';

interface SettingsState {
  isLoading: boolean;
  updateSettingsIsLoading: boolean;
  deleteSettingsIsLoading: boolean;
  addSettingsIsLoading: boolean;
  deleteRowIsLoading: boolean;
  saveRowIsLoading: boolean;
  rankSettings: any[];
}

export interface RootState {
  settings: SettingsState;
}

const initialState: SettingsState = {
  isLoading: false,
  updateSettingsIsLoading: false,
  deleteSettingsIsLoading: false,
  addSettingsIsLoading: false,
  deleteRowIsLoading: false,
  saveRowIsLoading: false,
  rankSettings: [],
};

export const getRankSettingsAsync = createAsyncThunk(
  'settings/getRankSettings',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRankSettings();
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

export const createRankSettingAsync = createAsyncThunk(
  'settings/createRankSetting',
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = await createRankSetting(formData);
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

export const updateRankSettingAsync = createAsyncThunk(
  'settings/updateRankSetting',
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateRankSetting(id, formData);
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

export const deleteRankSettingAsync = createAsyncThunk(
  'settings/deleteRankSetting',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await deleteRankSetting(id);
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

export const deleteRowAsync = createAsyncThunk(
  'settings/deleteRow',
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = await deleteRow(formData);
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

export const saveRowAsync = createAsyncThunk(
  'settings/saveRow',
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = await saveRow(formData);
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

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   getRankSettingsAsync
      .addCase(getRankSettingsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRankSettingsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rankSettings = action.payload.data;
      })
      .addCase(getRankSettingsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      // addRankSettingAsync
      .addCase(createRankSettingAsync.pending, (state) => {
        state.addSettingsIsLoading = true;
      })
      .addCase(createRankSettingAsync.fulfilled, (state, action) => {
        state.addSettingsIsLoading = false;
        state.rankSettings.push(action.payload.data);
      })
      .addCase(createRankSettingAsync.rejected, (state) => {
        state.addSettingsIsLoading = false;
      })
      // updateRankSettingAsync
      .addCase(updateRankSettingAsync.pending, (state) => {
        state.updateSettingsIsLoading = true;
      })
      .addCase(updateRankSettingAsync.fulfilled, (state, action) => {
        state.updateSettingsIsLoading = false;
        const index = state.rankSettings.findIndex(
          (item) => item._id === action.payload.data._id,
        );
        if (index !== -1) state.rankSettings[index] = action.payload.data;
      })
      .addCase(updateRankSettingAsync.rejected, (state) => {
        state.updateSettingsIsLoading = false;
      })
      // deleteRankSettingAsync
      .addCase(deleteRankSettingAsync.pending, (state) => {
        state.deleteSettingsIsLoading = true;
      })
      .addCase(deleteRankSettingAsync.fulfilled, (state, action) => {
        state.deleteSettingsIsLoading = false;
        state.rankSettings = state.rankSettings.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })
      .addCase(deleteRankSettingAsync.rejected, (state) => {
        state.deleteSettingsIsLoading = false;
      })
      // deleteRowAsync
      .addCase(deleteRowAsync.pending, (state) => {
        state.deleteRowIsLoading = true;
      })
      .addCase(deleteRowAsync.fulfilled, (state, action) => {
        state.deleteRowIsLoading = false;

        // Ensure action.payload.data is an array before assigning
        if (Array.isArray(action.payload?.data)) {
          state.rankSettings = action.payload.data;
        }
      })
      .addCase(deleteRowAsync.rejected, (state) => {
        state.deleteRowIsLoading = false;
      })
      // saveRowAsync
      // saveRowAsync
      .addCase(saveRowAsync.pending, (state) => {
        state.saveRowIsLoading = true;
      })
      .addCase(saveRowAsync.fulfilled, (state, action) => {
        state.saveRowIsLoading = false;

        // Ensure action.payload exists and data is an array before updating state
        if (Array.isArray(action.payload?.data)) {
          state.rankSettings = action.payload.data;
        } else {
          console.warn('Unexpected response format:', action.payload);
        }
      })
      .addCase(saveRowAsync.rejected, (state, action) => {
        state.saveRowIsLoading = false;
        console.error('Error saving row:', action.error?.message);
      });
  },
});

export default settingsSlice.reducer;
