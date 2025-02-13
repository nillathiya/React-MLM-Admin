import { apiClient } from '../../api/apiClient';
import { ROUTES } from '../../api/routes';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../types';

export const getCompanyInfo = async ({
  title,
  label,
  value,
  type,
  searchterm,
  status,
  limit,
  page,
}: {
  title?: string;
  label?: string;
  value?: string;
  type?: string;
  searchterm?: string;
  status?: number;
  limit?: number;
  page?: number;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      ROUTES.COMPANY_INFO.GET(
        title,
        label,
        value,
        type,
        searchterm,
        status,
        limit,
        page,
      ),
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Get company info failed. Please try again later.');
  }
};

export const updateCompanyInfo = async ({
  id,
  formData,
}: {
  id: string;
  formData: any;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      ROUTES.COMPANY_INFO.UPDATE(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An error occurred.');
    }
    throw new Error('Update company info failed. Please try again later.');
  }
};
