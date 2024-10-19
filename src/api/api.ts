import Axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from 'src/config/env.client';
import { LOCAL_STORAGE_KEY } from 'src/constants/local-storage.constant';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.VITE_APP_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
