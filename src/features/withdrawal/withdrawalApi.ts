import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';

export const getAllWithdrawal = async (): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.WITHDRAWAL.GET_ALL);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get All Withdrawal failed. Please try again later.');
  }
};

export const updateWithdrawalRequest = async (formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(
      ROUTES.WITHDRAWAL.UPDATE_REQUEST,
      formData,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error(
      'Update Withdrawal Request failed. Please try again later.',
    );
  }
};
