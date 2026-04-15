"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements"

export const getAllTeacher = async (): Promise<ApiSuccessResponse<ITeacher[]>> => {
 const response = await httpClient.get<ITeacher[]>("/teacher")
 return response
}