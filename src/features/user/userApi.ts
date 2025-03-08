import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';
import { ApiResponse, IContactUs } from '../../types';

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

export const checkUsername = async (formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.CHECK_NAME, formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('User Check Name failed. Please try again later.');
  }
};

export const getContactMessages = async (): Promise<
  ApiResponse<IContactUs[]>
> => {
  try {
    const response = await apiClient.post(ROUTES.CONTACT_US.GET_MESSAGES);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get Conatct Messages failed. Please try again later.');
  }
};

export const changeConatctMesasgeStatus = async (formData: {
  id: string;
  status: string;
}): Promise<ApiResponse<IContactUs>> => {
  try {
    const response = await apiClient.post(
      ROUTES.CONTACT_US.TOGGLE_STATUS,
      formData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error(
      'Toggle Conatct Messages status failed. Please try again later.',
    );
  }
};
