"use client"

import { getFromFillupByStudentId } from "@/services/student-server-action/fromFillup.service";
import { useQuery } from "@tanstack/react-query";
import { fromFillupColumns } from "../../Admin_Dashboard/FromFillup-managements/fromFillupColumns";
import DataTable from "@/components/shared/table/DataTable";
import { IGetFromFillupByStudentId } from "@/types/Dashboard/student-dashboard-types/get-fromFillup.types";
import { studentFromFillupColumns } from "./studentFromFillupColumns";

const StudentDashboardClient = ({ studentId }: { studentId: string }) => {
 const { data: studentFromFillupResponse, isLoading, isError } = useQuery({
  queryKey: ["get-student-from-fillup"],
  queryFn: () => getFromFillupByStudentId(studentId),
  refetchOnMount: true,
  refetchOnWindowFocus: true,
 })
 const studentFromFillups = studentFromFillupResponse?.data || []
 return (
  <div>
   <DataTable
    data={studentFromFillups}
    columns={studentFromFillupColumns}
   />
  </div>
 );
};

export default StudentDashboardClient;