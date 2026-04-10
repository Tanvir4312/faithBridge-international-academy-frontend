"use server";

import { httpClient } from "@/lib/axios/httpClient";



// interface INotice {
//   id: number;
//   title: string;
//   details?: string;
//   type?: "GENERAL" | "CLASS_SPECIFIC";
//   authorId: string;
//   noticeClasses?: string[];
// }

export const getNotices  = async () => {
  const notices = await httpClient.get("/notices");
  return notices;
};
