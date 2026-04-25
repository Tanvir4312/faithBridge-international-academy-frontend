"use server"
import { httpClient } from "@/lib/axios/httpClient";
import { ApiSuccessResponse } from "@/types/api.types";
import { IAcademicLevel } from "@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types";



export const getAllAcademicLevel = async (): Promise<ApiSuccessResponse<IAcademicLevel[]>> => {
  const response = await httpClient.get<IAcademicLevel[]>("/academic-level");
  return response;
}

export const createAcademicLevel = async (formData: FormData): Promise<ApiSuccessResponse<IAcademicLevel>> => {
  const newFormData = new FormData();
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");

  if (name) newFormData.append("name", name as string);
  if (description !== null) newFormData.append("description", description as string);
  if (image && typeof image !== "string" && image.size > 0) {
    newFormData.append("image", image);
  }

  const response = await httpClient.post<IAcademicLevel>("/academic-level/create", newFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateAcademicLevel = async (id: string, formData: FormData): Promise<ApiSuccessResponse<IAcademicLevel>> => {
  const newFormData = new FormData();
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");

  if (name) newFormData.append("name", name as string);
  if (description !== null) newFormData.append("description", description as string);
  if (image && typeof image !== "string" && image.size > 0) {
    newFormData.append("image", image);
  }

  const response = await httpClient.put<IAcademicLevel>(`/academic-level/${id}`, newFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteAcademicLevel = async (id: string): Promise<ApiSuccessResponse<any>> => {
  const response = await httpClient.delete<any>(`/academic-level/${id}`);
  return response;
};
