import { ColumnDef } from "@tanstack/react-table";
import { IFromFillupData } from "@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types";
import { formatDate } from "date-fns";
import UserInfoCell from "@/components/shared/cell/userInfoCell";

import FromFillupStatusBadgeCell from "@/components/shared/cell/fromFillupStatusBadgeCell";
import PaymentStatusBadgeCell from "@/components/shared/cell/paymentStatusBadgeCell";

export const fromFillupColumns: ColumnDef<IFromFillupData>[] = [
 {
  id: "nameEn",
  accessorKey: "nameEn",
  header: "Name",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <UserInfoCell
     name={row.original?.student.nameEn}
     profilePhoto={row.original?.student.profileImage}
    />
   )
  }
 },

 {
  id: "registrationNo",
  accessorKey: "registrationNo",
  header: "Registration No",
  enableSorting: false
 },
 {
  id: "class",
  accessorKey: "class",
  header: "Class",
  enableSorting: false,
  cell: ({ row }) => {
   const className = row.original?.class.name;
   return className;
  }
 },
 {
  id: "exam",
  accessorKey: "exam",
  header: "Exam",
  enableSorting: false,
  cell: ({ row }) => {
   const examName = row.original?.exam?.name;
   return examName;
  }
 },
 {
  id: "year",
  accessorKey: "year",
  header: "Year",
  enableSorting: false,
  cell: ({ row }) => {
   const year = row.original?.exam?.year;
   return year;
  }
 },
 {
  id: "status",
  accessorKey: "status",
  header: "Status",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <FromFillupStatusBadgeCell status={row.original?.status} />
   )
  }
 },
 {
  id: "paymentStatus",
  accessorKey: "paymentStatus",
  header: "Payment Status",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <PaymentStatusBadgeCell status={row.original?.paymentStatus} />
   )
  }
 },
 {
  id: "createdAt",
  accessorKey: "createdAt",
  header: "From-Fillup Time",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original?.createdAt), "MMMM d, yyyy");
   return date;
  }
 },




]