"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"

export interface IClassTeacherPayload {
    classId: string;
    teacherId: string;
}

export const assignClassTeacher = async (data: IClassTeacherPayload): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.post<ApiSuccessResponse<any>>("/class-teacher", data)
        return response
    } catch (error: any) {
        return error?.response?.data;
    }
}
export const getAllClassTeachers = async (): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.get("/class-teacher")
        return response as ApiSuccessResponse<any>
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Failed to fetch class teachers";
        throw new Error(message);
    }
}
