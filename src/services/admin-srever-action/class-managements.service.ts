"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IClass } from "@/types/Dashboard/admin-dashboard-types/class-managements.types"

export const getAllClass = async (): Promise<ApiSuccessResponse<IClass[]>> => {
 const response = await httpClient.get<IClass[]>("/classes")
 return response
}