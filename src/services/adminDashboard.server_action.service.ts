"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IAdminDashboardStats } from "@/types/dashboard.types"

export const getAdminDashboardStats = async () => {
    const response = await httpClient.get<IAdminDashboardStats>("/stats")
    return response;
}

