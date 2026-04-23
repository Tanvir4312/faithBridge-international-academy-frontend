import { ColumnDef } from "@tanstack/react-table";
import { IExamsData } from "@/types/Dashboard/admin-dashboard-types/exams-managements";
import { formatDate } from "date-fns";

export const examColumns: ColumnDef<IExamsData>[] = [
 {
  id: "name",
  accessorKey: "name",
  header: "Name",
  enableSorting: false
 },
 {
  id: "year",
  accessorKey: "year",
  header: "Year",
  enableSorting: false
 },
 {
  id: "formFillupStart",
  accessorKey: "formFillupStart",
  header: "Form Fillup Start",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original?.formFillupStart), "MMMM d, yyyy");
   return date;
  }
 },
 {
  id: "formFillupEnd",
  accessorKey: "formFillupEnd",
  header: "Form Fillup End",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original?.formFillupEnd), "MMMM d, yyyy");
   return date;
  }
 },
 {
  id: "examDate",
  accessorKey: "examDate",
  header: "Exam Date",
  enableSorting: false,
  cell: ({ row }) => {
   if (!row.original?.examDate) return "N/A";
   const date = formatDate(new Date(row.original?.examDate), "MMMM d, yyyy");
   return date;
  }
 },
 {
  id: "createdAt",
  accessorKey: "createdAt",
  header: "Created At",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original?.createdAt), "MMMM d, yyyy");
   return date;
  }
 },


]