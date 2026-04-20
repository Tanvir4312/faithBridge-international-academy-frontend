"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IApplicantPaymentInfo } from "@/types/Dashboard/applicant-dashboard-types/applicant-dashboard.types"

export const getAllApplicantPaymentInfo = async (applicantId: string): Promise<ApiSuccessResponse<IApplicantPaymentInfo[]>> => {
 const response = await httpClient.get<IApplicantPaymentInfo[]>(`/payments/applicant/${applicantId}`)
 return response
}