import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to simulate Axios calls with delay during mock phase
export const simulateAxiosResponse = <T>(
  data: T,
  delayMs = 800
): Promise<AxiosResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosResponse['headers'],
        config: {} as AxiosResponse['config'],
      });
    }, delayMs);
  });
};

export default apiClient;
