/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiSuccessResponse } from "@/types/api.types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};

export interface ApiRequestOptions {
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

const htttGet = async <TData>(
  endPoints: string,
  options?: ApiRequestOptions,
): Promise<ApiSuccessResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.get<ApiSuccessResponse<TData>>(endPoints, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    console.log(`Get request to ${endPoints} failed: `, error);
    throw error;
  }
};

const httpPost = async <TData>(
  endPoints: string,
  data: any,
  options?: ApiRequestOptions,
): Promise<ApiSuccessResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.post<ApiSuccessResponse<TData>>(
      endPoints,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Post request to ${endPoints} failed: `, error);
    throw error;
  }
};

const httpPut = async <TData>(
  endPoints: string,
  data: any,
  options?: ApiRequestOptions,
): Promise<ApiSuccessResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.put<ApiSuccessResponse<TData>>(
      endPoints,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Put request to ${endPoints} failed: `, error);
    throw error;
  }
};

const httpPatch = async <TData>(
  endPoints: string,
  data: any,
  options?: ApiRequestOptions,
): Promise<ApiSuccessResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.patch<ApiSuccessResponse<TData>>(
      endPoints,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Patch request to ${endPoints} failed: `, error);
    throw error;
  }
};

const httpDelete = async <TData>(
  endPoints: string,
  options?: ApiRequestOptions,
): Promise<ApiSuccessResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.delete<ApiSuccessResponse<TData>>(
      endPoints,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Delete request to ${endPoints} failed: `, error);
    throw error;
  }
};

export const httpClient = {
  get: htttGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
