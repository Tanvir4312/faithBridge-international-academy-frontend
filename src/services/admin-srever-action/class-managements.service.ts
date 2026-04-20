"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IClass } from "@/types/Dashboard/admin-dashboard-types/class-managements.types"

export const getAllClass = async (): Promise<ApiSuccessResponse<IClass[]>> => {
  try {
    const response = await httpClient.get<IClass[]>("/classes")
    return response
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message }
  }
}


export const createClass = async (data: any): Promise<ApiSuccessResponse<IClass>> => {
  const response = await httpClient.post<IClass>("/classes/create-class", data)
  return response
}

