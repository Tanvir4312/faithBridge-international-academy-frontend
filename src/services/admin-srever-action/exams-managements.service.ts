"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IExamsData } from "@/types/Dashboard/admin-dashboard-types/exams-managements"

export const getAllExam = async (): Promise<ApiSuccessResponse<IExamsData[]>> => {
 const response = await httpClient.get<IExamsData[]>("/exams")
 return response
}