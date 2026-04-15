"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"

import { IStudent } from "@/types/Dashboard/admin-dashboard-types/students-managements.types"

interface IAllAdminsPagination {

 limit: number;
 current_Page: number;
 total_page: number;
 total: number;
}

interface IStudentPayload {
 data: IStudent[];
 meta: IAllAdminsPagination;
}

export const getAllStudent = async (queryParamsString: string): Promise<ApiSuccessResponse<IStudentPayload>> => {
 const response = await httpClient.get<IStudentPayload>(queryParamsString ? `/student?${queryParamsString}` : "/student")
 return response
}