"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IMyApplicationInfo } from "@/types/Dashboard/applicant-dashboard-types/applicant-dashboard.types"

export const createApplication = async (payload: FormData): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.post<any>("/application/create-application", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Failed to create application";
        throw new Error(message);
    }
}

export const getMyApplicationInfo = async (applicationId: string): Promise<ApiSuccessResponse<IMyApplicationInfo>> => {
    const response = await httpClient.get<IMyApplicationInfo>(`/application/my-application/${applicationId}`)
    return response
}
