"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const forgotPasswordAction = async (email: string) => {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address" };
  }

  try {
    const response = await httpClient.post<any>("/auth/forgot-password", { email });
    return response;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message || "Failed to send reset email",
    };
  }
};
