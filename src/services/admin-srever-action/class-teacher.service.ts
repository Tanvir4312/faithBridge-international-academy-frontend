"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ApiSuccessResponse } from "@/types/api.types"

export interface IClassTeacherPayload {
    classId: string;
    teacherId: string;
}

export const assignClassTeacher = async (data: IClassTeacherPayload): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.post("/class-teacher", data)
        return response as ApiSuccessResponse<any>
    } catch (error: any) {
        // Deeply extract the most specific error message available
        const data = error?.response?.data;
        const backendMessage = data?.message;
        const errorSources = data?.errorSources;

        let finalMessage = "Failed to assign class teacher";

        // 1. Try to get message from errorSources (most specific)
        if (errorSources && Array.isArray(errorSources) && errorSources?.length > 0) {
            finalMessage = errorSources[0].message;
        }
        // 2. Fallback to main backend message
        else if (backendMessage) {
            finalMessage = backendMessage;
        }
        // 3. Fallback to axios error message
        else if (error?.message) {
            finalMessage = error.message;
        }

        // 4. CLEANUP: If the message is a cryptic Prisma error or just "in", make it user-friendly
        const isPrismaError = finalMessage.includes("Prisma Client Known Request Error") || finalMessage.toLowerCase() === "in";

        if (isPrismaError) {
            // Check for common unique constraint error (P2002)
            if (finalMessage.includes("unique constraint") || finalMessage.includes("already exist") || finalMessage.toLowerCase() === "in") {
                finalMessage = "This Class Teacher assignment already exists.";
            } else {
                finalMessage = "A database conflict occurred. Please verify your selection.";
            }
        }

        throw new Error(finalMessage);
    }
}

export const getAllClassTeachers = async (): Promise<ApiSuccessResponse<any>> => {
    try {
        const response = await httpClient.get("/class-teacher")
        return response as ApiSuccessResponse<any>
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Failed to fetch class teachers";
        throw new Error(message);
    }
}
