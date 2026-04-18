"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"
import { IUsersManagements } from "@/types/Dashboard/admin-dashboard-types/users-managements.types"

interface IAllAdminsPagination {
 limit: number;
 current_Page: number;
 total_page: number;
 total: number;
}

interface IStudentPayload {
 data: IUsersManagements[];
 meta: IAllAdminsPagination;
}

export const getAllUser = async (queryParamsString: string): Promise<ApiSuccessResponse<IStudentPayload>> => {
 const response = await httpClient.get<IStudentPayload>(queryParamsString ? `/users?${queryParamsString}` : "/users")
 return response
}

export const changeUserStatus = async (userId: string, payload: { userStatus: string }): Promise<ApiSuccessResponse<any>> => {
    const response = await httpClient.put(`/admin/change-user-status/${userId}`, payload);
    return response;
 }
 
 export const changeUserRole = async (userId: string, payload: { role: string }): Promise<ApiSuccessResponse<any>> => {
    const response = await httpClient.put(`/admin/change-user-role/${userId}`, payload);
    return response;
 }