"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IExamCreatePayload, IExamsData } from "@/types/Dashboard/admin-dashboard-types/exams-managements"

export const getAllExam = async (): Promise<ApiSuccessResponse<IExamsData[]>> => {
 const response = await httpClient.get<IExamsData[]>("/exams")
 return response
}

export const createExam = async (payload: IExamCreatePayload): Promise<ApiSuccessResponse<IExamsData>> => {
 const response = await httpClient.post<IExamsData>("/exams/create-exam", payload)
 return response
}