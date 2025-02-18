import axiosInstance from "./axiosInstance";
import {  AxiosApiResponse } from "./types";

export const getData = async <T>(endpoint: string, params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosInstance.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

export const postData = async <T>(endpoint: string, data: unknown) => {
  try {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error as Error
  }
};

export const putData = async <T>(endpoint: string, data: unknown) => {
  try {
    const response = await axiosInstance.put<AxiosApiResponse<T>>(endpoint, data);
    return response;
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

export const deleteData = async <T>(endpoint: string) => {
  try {
    const response = await axiosInstance.delete<AxiosApiResponse<T>>(endpoint);
    return response;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};
