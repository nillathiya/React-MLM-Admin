import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';
import { ApiResponse, Support } from '../../types';

export const getSupportRequests = async ({
  ticket,
  username,
  date,
  status,
  limit,
  page,
}: {
  ticket?: string;
  username?: string;
  date?: string;
  status?: number;
  limit?: number;
  page?: number;
}): Promise<ApiResponse<Support[]>> => {
  try {
    const response = await apiClient.post(
      ROUTES.SUPPORT.GET_ALL(ticket, username, date, status, limit, page),
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get company info failed. Please try again later.');
  }
};

export const updateSupportRequest = async ({
  id,
  formData,
}: {
  id: string;
  formData: any;
}): Promise<ApiResponse<Support>> => {
  try {
    const response = await apiClient.post(ROUTES.SUPPORT.UPDATE(id), formData);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Update support request failed. Please try again later.');
  }
};
