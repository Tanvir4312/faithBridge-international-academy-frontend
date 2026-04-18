"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import { IVerifyEmailPayload, verifyEmailSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/authService";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";

export const verifyEmailAction = async (
  payload: IVerifyEmailPayload
) => {
  const userInfo = await getUserInfo();
  const parsedPayload = verifyEmailSchema.safeParse(payload);


  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || "Invalid Input",
    };
  }

  try {
    const response = await httpClient.post<any>(
      "/auth/verify-email",
      parsedPayload.data
    );

    if (response?.success) {
      if (userInfo?.role) {
        redirect(getDefaultDashboardRoute(userInfo?.role as UserRole));
      } else {

        redirect(`/login?email=${parsedPayload.data.email}&verified=true`);
      }
    }


  } catch (err: any) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof err.digest === "string" &&
      err.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    return {
      success: false,
      message: err.message || err?.response?.data?.message || "Email verification failed",
    };
  }
};
