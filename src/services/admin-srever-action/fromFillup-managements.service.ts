"use server"
import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IFromFillupData } from "@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types"

export const getAllFromFillup = async (): Promise<ApiSuccessResponse<IFromFillupData[]>> => {
 const response = await httpClient.get<IFromFillupData[]>("/from-fillup")
 return response
}

export const updateFromFillupStatus = async (id: string, status: string): Promise<ApiSuccessResponse<IFromFillupData>> => {
 const response = await httpClient.put<IFromFillupData>(`/from-fillup/${id}`, { status })
 return response
}

export const deleteFromFillup = async (id: string): Promise<ApiSuccessResponse<IFromFillupData>> => {
 const response = await httpClient.delete<IFromFillupData>(`/from-fillup/${id}`)
 return response
}
