import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';

export const getAllOrders = async (): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.ORDER.GET_ALL);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get all Order failed. Please try again later.');
  }
};
