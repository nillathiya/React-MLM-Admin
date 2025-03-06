import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';

export const addUser = async (formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.ADD, formData);
    console.log('responseresponse', response);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('User Add failed. Please try again later.');
  }
};

export const getAllUser = async (): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.GET_ALL);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get All users failed. Please try again later.');
  }
};

export const getUserById = async (userId: string): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.GET_BY_ID, { userId });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get User info failed. Please try again later.');
  }
};

export const updateUserProfile = async (formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.UPDATE_PROFILE, formData);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Update User Profile failed. Please try again later.');
  }
};
