import axiosInstance from "./axiosInstance";
import { ApiResponse } from "./types";

export const getData = async <T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T> => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(endpoint, { params });
    return response.data.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

export const postData = async <T>(endpoint: string, data: unknown) => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data);
    return response.data;
  } catch (error) {
    throw error as Error
  }
};

export const putData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(endpoint, data);
    return response.data.data;
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<T>>(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};
