"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IGetFromFillupByStudentId } from "@/types/Dashboard/student-dashboard-types/get-fromFillup.types"
import { ICreateFromFillupPayload, ICreateFromFillupResponse } from "@/types/Dashboard/student-dashboard-types/studentCreateFromFillup.types"




export const createFromFillup = async (payload: ICreateFromFillupPayload): Promise<ApiSuccessResponse<ICreateFromFillupResponse>> => {
    try {
        const response = await httpClient.post<ICreateFromFillupResponse>("/from-fillup/create", payload)
        return response
    } catch (error: any) {
        console.log(error.response)
        return error.response?.data || { success: false, message: error.message }
    }
}

export const getFromFillupByStudentId = async (studentId: string): Promise<ApiSuccessResponse<IGetFromFillupByStudentId[]>> => {
    try {
        const response = await httpClient.get<IGetFromFillupByStudentId[]>(`/from-fillup/${studentId}`)
        return response
    } catch (error: any) {
        return error.response?.data || { success: false, message: error.message }
    }
}
