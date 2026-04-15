import { ColumnDef } from "@tanstack/react-table";

import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements";
import UserInfoCell from "@/components/shared/cell/userInfoCell";
import StatusBadgeCell from "@/components/shared/cell/statusBadgeCell";

export const teacherColumns: ColumnDef<ITeacher>[] = [



 {
  id: "name",
  accessorKey: "name",
  header: "Teacher Name",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <UserInfoCell
     name={row.original.name}
     email={row.original.email}
     profilePhoto={row.original.profilePhoto}
    />
   )

  }
 },
 {
  id: "contactNumber",
  accessorKey: "contactNumber",
  header: "Contact Number",
  enableSorting: false,
  cell: ({ row }) => {
   const teacherContactNumber = row.original.contactNumber;
   return teacherContactNumber
  }
 },
 {
  id: "gender",
  accessorKey: "gender",
  header: "Gender",
  enableSorting: false
 },
 {
  id: "status",
  accessorKey: "user.status",
  header: "Status",
  enableSorting: false,
  cell: ({ row }) => {
   const status = row.original.user.status
   return (
    <StatusBadgeCell
     status={status}
    />
   )
  }
 }





]