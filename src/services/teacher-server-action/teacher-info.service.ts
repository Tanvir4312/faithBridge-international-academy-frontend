"use server"
import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { TeacherInfoResponse } from "@/types/Dashboard/teacher-dashboard-types/info.types"

export const gettAllInfoForTeacher = async (id: string): Promise<ApiSuccessResponse<TeacherInfoResponse>> => {
 const response = await httpClient.get<TeacherInfoResponse>(`/teacher/${id}`)
 return response
}