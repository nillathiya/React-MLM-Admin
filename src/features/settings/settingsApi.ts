import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../types';
import { RankSettings } from '../../types/settings';

// Add a new rank setting (column)
export const createRankSetting = async (
  formData: any,
): Promise<ApiResponse<RankSettings>> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.CREATE, formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Add Rank settings failed. Please try again later.');
  }
};

export const getRankSettings = async (): Promise<
  ApiResponse<RankSettings[]>
> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.GET_RANK_SETTINGS);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get Rank settings failed. Please try again later.');
  }
};

// Update a rank setting (column title or values)
export const updateRankSetting = async (
  id: string,
  formData: any,
): Promise<ApiResponse<RankSettings>> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.UPDATE(id), formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Update Rank settings failed. Please try again later.');
  }
};

// Delete a rank setting (column)
export const deleteRankSetting = async (
  id: string,
): Promise<ApiResponse<RankSettings>> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.DELETE(id));
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Delete Rank settings failed. Please try again later.');
  }
};

export const deleteRow = async (
  formData: any,
): Promise<ApiResponse<RankSettings[]>> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.DELETE_ROW,formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Delete Rank settings row failed. Please try again later.');
  }
};

export const saveRow = async (
  formData: any,
): Promise<ApiResponse<RankSettings>> => {
  try {
    const response = await apiClient.post(ROUTES.SETTINGS.SAVE_ROW,formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Save Rank settings row failed. Please try again later.');
  }
};
