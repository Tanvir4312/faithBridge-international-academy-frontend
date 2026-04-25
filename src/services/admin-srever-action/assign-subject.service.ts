"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"

/**
 * Assigns subjects to a teacher.
 * Payload structure matches the user requirements:
 * {
 *   teacherId: string,
 *   subjectsId: string[],
 *   primarysubjectsId: string
 * }
 */
export const assignSubjectsToTeacher = async (data: {
  teacherId: string;
  subjectsId: string[];
}): Promise<ApiSuccessResponse<any>> => {
  try {
    const response = await httpClient.post("/teacher-subject/assign-subjects", data)
    return response as ApiSuccessResponse<any>
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to assign subject";
    throw new Error(message);
  }
}

export const updatePrimarySubject = async (data: {
  teacherId: string;
  subjectId: string;
}): Promise<ApiSuccessResponse<any>> => {
  try {
    const response = await httpClient.patch("/teacher-subject/update", data)
    return response as ApiSuccessResponse<any>
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to set primary subject";
    throw new Error(message);
  }
}

export const deleteTeacherSubject = async (data: {
  teacherId: string;
  subjectId: string;
}): Promise<ApiSuccessResponse<any>> => {
  try {
    const response = await httpClient.delete("/teacher-subject/delete", { data })
    return response as ApiSuccessResponse<any>
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to delete assigned subject";
    throw new Error(message);
  }
}
