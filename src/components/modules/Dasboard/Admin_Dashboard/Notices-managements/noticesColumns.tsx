import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types";

export const noticesColumns: ColumnDef<INoticeData>[] = [
 {
  id: "title",
  accessorKey: "title",
  header: "Title",
  enableSorting: false,

 },

 {
  id: "type",
  accessorKey: "type",
  header: "Type",
  enableSorting: false
 },
 {
  id: "name",
  accessorKey: "name",
  header: "Class",
  enableSorting: false,
  cell: ({ row }) => {
   const className = row.original.noticeClasses.map((classData) => classData?.class?.name).join(", ");
   if (!className) {
    return <span>-</span>;
   }
   return className;
  }
 },

 {
  id: "Notice Time",
  accessorKey: "createdAt",
  header: "Notice Time",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original.createdAt), "MMMM d, yyyy");
   return date;
  }
 },




]