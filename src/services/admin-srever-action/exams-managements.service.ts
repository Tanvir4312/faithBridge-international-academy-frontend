"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IExamCreatePayload, IExamsData, IExamUpdatePayload } from "@/types/Dashboard/admin-dashboard-types/exams-managements"

export const getAllExam = async (): Promise<ApiSuccessResponse<IExamsData[]>> => {
    try {
        const response = await httpClient.get<IExamsData[]>("/exams")
        return response
    } catch (error: any) {
        return error.response?.data || { success: false, message: error.message }
    }
}

export const createExam = async (payload: IExamCreatePayload): Promise<ApiSuccessResponse<IExamsData>> => {
    try {
        const response = await httpClient.post<IExamsData>("/exams/create-exam", payload)
        return response
    } catch (error: any) {
        return error.response?.data || { success: false, message: error.message }
    }
}

export const updateExam = async (id: string, payload: IExamUpdatePayload): Promise<ApiSuccessResponse<IExamsData>> => {
    try {
        const response = await httpClient.patch<IExamsData>(`/exams/${id}`, payload)
        return response
    } catch (error: any) {
        return error.response?.data || { success: false, message: error.message }
    }
}

export const deleteExam = async (id: string): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.delete(`/exams/${id}`)
        return response
    } catch (error: any) {
        return error.response?.data || { success: false, message: error.message }
    }
}