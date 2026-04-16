"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements"

export const getAllTeacher = async (): Promise<ApiSuccessResponse<ITeacher[]>> => {
  const response = await httpClient.get<ITeacher[]>("/teacher")
  return response
}

export const getSingleTeacher = async (id: string): Promise<ApiSuccessResponse<ITeacher>> => {
  const response = await httpClient.get<ITeacher>(`/teacher/${id}`)
  return response
}

/**
 * Updates a teacher's profile.
 * Aligned with the latest flat backend structure.
 */
export const updateTeacher = async (id: string, data: FormData): Promise<ApiSuccessResponse<ITeacher>> => {
  const response = await httpClient.put<ITeacher>(`/teacher/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response
}

/**
 * Soft deletes a teacher.
 */
export const deleteTeacher = async (id: string): Promise<ApiSuccessResponse<any>> => {
  const response = await httpClient.delete(`/teacher/${id}`)
  return response
}