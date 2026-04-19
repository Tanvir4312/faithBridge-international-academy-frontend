"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types"

export const getAllMedia = async (): Promise<ApiSuccessResponse<AllMediaResponse[]>> => {
  const response = await httpClient.get<AllMediaResponse[]>("/media")
  return response
}

export const deleteMedia = async (id: string): Promise<ApiSuccessResponse<any>> => {
  try {
    const response = await httpClient.delete(`/media/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting media:", error);
    throw new Error(error?.message || "Failed to delete media");
  }
}