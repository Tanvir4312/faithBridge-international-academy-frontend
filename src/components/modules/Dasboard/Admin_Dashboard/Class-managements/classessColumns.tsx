import { IClass } from "@/types/Dashboard/admin-dashboard-types/class-managements.types";
import { ColumnDef } from "@tanstack/react-table";

export const classessColumns: ColumnDef<IClass>[] = [
 {
  id: "index",
  header: "Index",
  cell: ({ row }) => row.index + 1,
 },
 {
  id: "name",
  accessorKey: "name",
  header: "Class Name",
  enableSorting: false,
 },

 {
  id: "classTeacher",
  accessorKey: "classTeacher",
  header: "Class Teacher",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <span>{row.original?.classTeacher?.teacher?.name || "N/A"}</span>
   )
  }
 },
 {
  id: "students",
  accessorKey: "students",
  header: "TotalStudents",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <span>{row.original?.students?.length}</span>
   )
  }
 },

]