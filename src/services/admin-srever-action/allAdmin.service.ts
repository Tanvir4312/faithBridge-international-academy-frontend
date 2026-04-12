"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { IAllAdminsData } from "@/types/Dashboard/admin-dashboard-types/types";

export const getAllAdmin = async () => {
    try {
        const response = await httpClient.get<IAllAdminsData[]>("/admin")
        return response;
    } catch (error) {
        console.error("Error fetching all admins:", error);
        throw error; 
    }
}