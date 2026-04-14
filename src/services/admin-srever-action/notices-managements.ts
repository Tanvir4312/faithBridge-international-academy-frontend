"use server"
import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"

export const getAllNotice = async (): Promise<ApiSuccessResponse<INoticeData[]>> => {
 const response = await httpClient.get<INoticeData[]>("/notices")
 return response
}