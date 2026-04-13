"use server"

import { ApiSuccessResponse } from "@/types/api.types";
import { httpClient } from "@/lib/axios/httpClient";
import { IAdminsData } from "@/types/Dashboard/admin-dashboard-types/types";

interface IAllAdminsPagination {
  page: number;
  limit: number;
  current_Page: number;
  total_page: number;
  total: number;
}

interface IAllAdminsPayload {
  data: IAdminsData[];
  meta: IAllAdminsPagination;
}

export const getAllAdmin = async (queryParamsString: string): Promise<ApiSuccessResponse<IAllAdminsPayload>> => {
    try {
        console.log("getAllAdmin called with:", queryParamsString);
        const response = await httpClient.get<IAllAdminsPayload>(queryParamsString ? `/admin?${queryParamsString}` : '/admin');
        return response;
    } catch (error) {
        console.error("Error fetching all admins:", error);
        throw error; 
    }
}