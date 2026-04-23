"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types"
import { ITeacher, IUpdateTeacherPayload } from "@/types/Dashboard/admin-dashboard-types/teachers-managements.types"
import { createTeacherValidationSchema, ICreateTeacherPayload } from "@/zod/teacherZodValidation"

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
export const updateTeacher = async (id: string, data: FormData): Promise<ApiSuccessResponse<IUpdateTeacherPayload>> => {
  const response = await httpClient.put<IUpdateTeacherPayload>(`/teacher/${id}`, data, {
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

export const createTeacher = async (data: ICreateTeacherPayload): Promise<ICreateTeacherPayload | ApiErrorResponse> => {
  const parsPayload = createTeacherValidationSchema.safeParse(data)
  if (!parsPayload.success) {
    const firstError = parsPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    }
  }
  try {
    const response = await httpClient.post<ICreateTeacherPayload>("/users/create-teacher", parsPayload.data)
    return response
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message }
  }
}