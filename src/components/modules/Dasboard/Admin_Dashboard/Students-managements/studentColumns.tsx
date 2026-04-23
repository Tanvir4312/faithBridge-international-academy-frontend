import StatusBadgeCell from "@/components/shared/cell/statusBadgeCell"
import UserInfoCell from "@/components/shared/cell/userInfoCell"
import { IStudent } from "@/types/Dashboard/admin-dashboard-types/students-managements.types"
import { ColumnDef } from "@tanstack/react-table"

export const studentColumns: ColumnDef<IStudent>[] = [
 {
  id: "name",
  accessorKey: "nameEn",
  header: "Name",
  enableSorting: false,
  cell: ({ row }) => {

   return (
    <div>
     <UserInfoCell
      name={row.original?.nameEn}
      email={row.original?.user?.email}
      profilePhoto={row.original?.profileImage}
     />
    </div>
   )
  }
 },
 {
  id: "registrationId",
  accessorKey: "registrationId",
  header: "Registration ID",
  enableSorting: true,
 },

 {
  id: "classRoll",
  accessorKey: "classRoll",
  header: "Class Roll",
  enableSorting: false
 },
 {
  id: "gender",
  accessorKey: "gender",
  header: "Gender",
  enableSorting: false,
 },

 {
  id: "status",
  accessorKey: "status",
  header: "Status",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <StatusBadgeCell
     status={row.original?.user?.status}
    />
   )
  }
 },
 {
  accessorKey: "class.name",
  header: "Class",
  enableSorting: false,
 },
]