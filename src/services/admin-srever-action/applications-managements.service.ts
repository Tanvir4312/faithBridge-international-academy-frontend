"use server"
interface IApplicationsMeta {
 page: number;
 limit: number;
 current_Page: number;
 total_page: number;
 total: number;
}

interface IApplicationsResponsePayload {
 data: IApplicationsData[];
 meta: IApplicationsMeta;
}


import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types";
import { IApplicationsData } from "@/types/Dashboard/admin-dashboard-types/applications-management.types"

export const getAllApplication = async (queryParamsString: string): Promise<ApiSuccessResponse<IApplicationsResponsePayload>> => {
 const response = await httpClient.get<IApplicationsResponsePayload>(queryParamsString ? `/application?${queryParamsString}` : "/application")
 return response
}

export const getApplicationById = async (applicationId: string): Promise<ApiSuccessResponse<IApplicationsData[]>> => {
 const response = await httpClient.get<IApplicationsData[]>(`/application/${applicationId}`)
 return response
}


export const updateApplicationAndCreateStudent = async (applicationId: string) => {
 try {
  const response = await httpClient.put(`/application/update/${applicationId}`)
  return response
 } catch (error: any) {
  // Extract message on the server before re-throwing — Axios response won't serialize to the client
  const message =
   error?.response?.data?.message ||
   error?.message ||
   "Failed to approve application. Please try again.";
  throw new Error(message);
 }
}
export const rejectApplication = async (applicationId: string) => {
 try {
  const response = await httpClient.put(`/application/reject/${applicationId}`)
  return response
 } catch (error: any) {
  const message =
   error?.response?.data?.message ||
   error?.message ||
   "Failed to reject application. Please try again.";
  throw new Error(message);
 }
}