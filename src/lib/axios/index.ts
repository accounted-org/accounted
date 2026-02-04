import axios from "axios";
import { authStore } from "../zustand";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL ?? '/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // chama a rota de refresh token OU
      // redirecionar para o login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export { api };
