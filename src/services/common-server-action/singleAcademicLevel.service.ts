"use server"
import { httpClient } from "@/lib/axios/httpClient";
import { ApiSuccessResponse } from "@/types/api.types";
import { IAcademicLevel } from "@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types";


export const getSingleAcademicLevel = async (id: string): Promise<ApiSuccessResponse<IAcademicLevel>> => {
 const response = await httpClient.get<IAcademicLevel>(`/academic-level/${id}`);
 return response;
}