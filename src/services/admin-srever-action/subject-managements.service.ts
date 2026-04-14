"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { ISubject } from "@/types/Dashboard/admin-dashboard-types/subject-managements.types"

export const getAllSubject = async (): Promise<ApiSuccessResponse<ISubject[]>> => {
 const response = await httpClient.get<ISubject[]>("/subject")
 return response
}