"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IPayment } from "@/types/Dashboard/admin-dashboard-types/payment-managements.types"

export const getAllPayments = async (): Promise<ApiSuccessResponse<IPayment[]>> => {
 const response = await httpClient.get<IPayment[]>("/payments")
 return response
}