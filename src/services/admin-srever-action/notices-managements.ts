"use server"
import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { INoticeData, ICreateNoticesPayload } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"

export const getAllNotice = async (): Promise<ApiSuccessResponse<INoticeData[]>> => {
 const response = await httpClient.get<INoticeData[]>("/notices")
 return response
}

export const createNotice = async (payload: ICreateNoticesPayload): Promise<ApiSuccessResponse<INoticeData>> => {
 const response = await httpClient.post<INoticeData>("/notices/create-notice", payload)
 return response
}

export const deleteNotice = async (id: string): Promise<ApiSuccessResponse<any>> => {
    const response = await httpClient.delete<any>(`/notices/${id}`)
    return response
}