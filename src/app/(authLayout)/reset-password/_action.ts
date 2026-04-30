"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import { IResetPasswordPayload, resetPasswordSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const resetPasswordAction = async (
  payload: IResetPasswordPayload
) => {

  const parsedPayload = resetPasswordSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || "Invalid Input",
    };
  }

  try {
    const response = await httpClient.post<any>(
      "/auth/reset-password",
      parsedPayload.data
    );

    if (response?.success) {
      redirect("/login");
    }

    return response;
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
      message: err.message || err?.response?.data?.message || "Password reset failed",
    };
  }
};
