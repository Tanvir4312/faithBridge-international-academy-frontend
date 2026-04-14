"use server"
interface IApplicationsMeta {
 page: number;
 limit: number;
 current_Page: number;
 total_page: number;
 total: number;
}

interface IApplicationsResponsePayload {
 data: IApplicationsData[];
 meta: IApplicationsMeta;
}


import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types";
import { IApplicationsData } from "@/types/Dashboard/admin-dashboard-types/applications-management.types"

export const getAllApplication = async (queryParamsString: string): Promise<ApiSuccessResponse<IApplicationsResponsePayload>> => {
 const response = await httpClient.get<IApplicationsResponsePayload>(queryParamsString ? `/application?${queryParamsString}` : "/application")
 return response
}