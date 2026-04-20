"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IStudentPaymentInfo } from "@/types/Dashboard/student-dashboard-types/studentPayment.types"

export const getAllStudentPaymentInfo = async (studentId: string): Promise<ApiSuccessResponse<IStudentPaymentInfo[]>> => {
 const response = await httpClient.get<IStudentPaymentInfo[]>(`/payments/${studentId}`)
 return response
}