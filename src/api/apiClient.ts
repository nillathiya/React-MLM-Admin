import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance with proper type annotations
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FjMzAzMDBjMjQ4MDZjZmVkZGQyY2MiLCJlbWFpbCI6ImtyaXNoQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia3Jpc2giLCJyb2xlIjoxLCJzdGF0dXMiOjEsImlhdCI6MTc0MDcxNzU2NCwiZXhwIjoxNzQwODAzOTY0fQ.SsKHE8m40eoRawefEM2M4jxVJfqqyxq3kMI2n9ssTlE'
  },
  withCredentials: true,
});

// Add response interceptor to the apiClient instance
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response if it's successful
    return response;
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized errors (e.g., session expiration)
    if (error.response && error.response.status === 401) {
      console.log("unauthorized access")
      // alert('Your session has expired. Please log in again.');

      try {
        // Lazy-load store and actions to prevent circular dependencies
        // const { store } = await import('../store/store');
        // const { adminLogoutAsync, clearUser } = await import(
        //   '../features/auth/authSlice'
        // );

        // await store.dispatch(adminLogoutAsync());
        // await store.dispatch(clearUser());

        // window.location.href = '/';
      } catch (err) {
        console.error('Error during 401 handling:', err);
      }
    }

    // Reject the promise with the error
    return Promise.reject(error);
  },
);
