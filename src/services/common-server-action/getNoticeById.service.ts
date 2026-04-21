"use server"


import { httpClient } from "@/lib/axios/httpClient";
import { ApiSuccessResponse } from "@/types/api.types";
import { IGetSingleNoticeData } from "@/types/Dashboard/Common-types/getNotice.types";

export const getSingleNotice = async (id: string): Promise<ApiSuccessResponse<IGetSingleNoticeData>> => {
 const response = await httpClient.get<IGetSingleNoticeData>(`/notices/${id}`)
 return response
}