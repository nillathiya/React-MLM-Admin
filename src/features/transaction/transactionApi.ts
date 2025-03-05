import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';
import { ApiResponse, IncomeTransaction } from '../../types';

export const getAllIncomeTransaction = async (
  formData: any,
): Promise<ApiResponse<IncomeTransaction[]>> => {
  try {
    const response = await apiClient.post(
      ROUTES.TRANSACTION.INCOME.GET_ALL,
      formData,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error(
      'Get All Income transaction failed. Please try again later.',
    );
  }
};
