import StatusBadgeCell from "@/components/shared/cell/statusBadgeCell"
import { IUsersManagements } from "@/types/Dashboard/admin-dashboard-types/users-managements.types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const usersColumns: ColumnDef<IUsersManagements>[] = [
 {
  id: "name",
  accessorKey: "name",
  header: "Name",
 },
 {
  id: "email",
  accessorKey: "email",
  header: "Email",
 },
 {
  id: "role",
  accessorKey: "role",
  header: "Role",
 },
 {
  id: "status",
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
   return (
    <StatusBadgeCell status={row.original.status} />
   )
  }
 },
 {
  id: "emailVerified",
  accessorKey: "emailVerified",
  header: "Email Verified",
  cell: ({ row }) => {
   return (
    row.original.emailVerified ? <p className="text-green-500">Yes</p> : <p className="text-red-500">No</p>
   )
  }
 },
 {
  id: "needPasswordChange",
  accessorKey: "needPasswordChange",
  header: "Need Password Change",
  cell: ({ row }) => {
   return (
    row.original.needPasswordChange ? <p className="text-red-500">Yes</p> : <p className="text-green-500">No</p>
   )
  }
 },
 {
  id: "createdAt",
  accessorKey: "createdAt",
  header: "Created At",
  cell: ({ row }) => {
   const date = row.original.createdAt
   const createTime = date && format(new Date(date), "yyyy-MM-dd")
   return (
    <p>{createTime}</p>
   )
  }
 },
 {
  id: "updatedAt",
  accessorKey: "updatedAt",
  header: "Updated At",
  cell: ({ row }) => {
   const date = row.original.updatedAt
   const createTime = date && format(new Date(date), "yyyy-MM-dd")
   return (
    <p>{createTime}</p>
   )
  }
 },


]