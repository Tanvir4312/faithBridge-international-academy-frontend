import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { IPayment } from "@/types/Dashboard/admin-dashboard-types/payment-managements.types";
import PaymentStatusBadgeCell from "@/components/shared/cell/paymentStatusBadgeCell";

export const paymentsColumns: ColumnDef<IPayment>[] = [
 {
  id: "paymentFor",
  accessorKey: "paymentFor",
  header: "Payment For",
  enableSorting: false,

 },
 {
  id: "amount",
  accessorKey: "amount",
  header: "Amount",
  enableSorting: false,

 },

 {
  id: "status",
  accessorKey: "status",
  header: "Status",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <PaymentStatusBadgeCell status={row.original.status} />
   )
  }
 },

 {
  id: "transactionId",
  accessorKey: "transactionId",
  header: "Transaction ID",
  enableSorting: false,
 },

 {
  id: "createdAt",
  accessorKey: "createdAt",
  header: "Payment Time",
  enableSorting: false,
  cell: ({ row }) => {
   const date = formatDate(new Date(row.original.createdAt), "MMMM d, yyyy");
   return date;
  }
 },




]