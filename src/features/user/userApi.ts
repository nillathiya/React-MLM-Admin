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

export const getAllUser = async ({
  searchterm,
  isActive,
  blockStatus,
  limit,
  page,
  includeTotalMachine,
}: {
  searchterm?: string;
  isActive?: number;
  blockStatus?: number;
  limit?: number;
  page?: number;
  includeTotalMachine?: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post(
      ROUTES.USER.GET_ALL(
        searchterm,
        isActive,
        blockStatus,
        limit,
        page,
        includeTotalMachine,
      ),
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('User Add failed. Please try again later.');
  }
};

export const getById = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.GET_BY_ID(id));
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get Machine failed. Please try again later.');
  }
};
export const updateUser = async (id: string, formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(ROUTES.USER.UPDATE(id), formData);

    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Machine updation failed. Please try again later.');
  }
};
