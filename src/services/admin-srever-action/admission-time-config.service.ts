"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { CreateAdmissionTimeConfig, GetAdmissionTimeConfig, UpdateAdmissionTimeConfig } from "@/types/Dashboard/admin-dashboard-types/admission-time-config.types"

/**
 * Fetch all admission time configurations
 */
export const getAdmissionTimeConfig = async (): Promise<ApiSuccessResponse<GetAdmissionTimeConfig[]>> => {
 try {
  const response = await httpClient.get<GetAdmissionTimeConfig[]>("/admission-config")
  return response
 } catch (error: any) {
  const message = error?.response?.data?.message || error?.message || "Failed to fetch admission configs";
  throw new Error(message);
 }
}

/**
 * Create a new admission time configuration
 */
export const createAdmissionTimeConfig = async (payload: CreateAdmissionTimeConfig): Promise<ApiSuccessResponse<GetAdmissionTimeConfig>> => {
 try {
  console.log("Creating admission config with payload:", payload)
  const response = await httpClient.post<GetAdmissionTimeConfig>("/admission-config/create-admission-config", payload)
  return response
 } catch (error: any) {
  const message = error?.response?.data?.message || error?.message || "Failed to create admission config";
  console.error("Create Admission Config Error:", message);
  throw new Error(message);
 }
}

/**
 * Update an existing admission time configuration
 */
export const updateAdmissionTimeConfig = async (id: string, payload: UpdateAdmissionTimeConfig): Promise<ApiSuccessResponse<GetAdmissionTimeConfig>> => {
 try {
  console.log(`Updating admission config ${id} with payload:`, payload)
  const response = await httpClient.patch<GetAdmissionTimeConfig>(`/admission-config/update-admission-config/${id}`, payload)
  return response
 } catch (error: any) {
  const message = error?.response?.data?.message || error?.message || "Failed to update admission config";
  console.error("Update Admission Config Error:", message);
  throw new Error(message);
 }
}
