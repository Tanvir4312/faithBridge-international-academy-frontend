"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IClassTeacher } from "@/types/Dashboard/admin-dashboard-types/class-teacher.types"
import UserInfoCell from "@/components/shared/cell/userInfoCell"
import { format } from "date-fns"


export const classTeacherColumn: ColumnDef<IClassTeacher>[] = [
 {
  id: "name",
  accessorKey: 'name',
  header: 'Name',
  enableSorting: false,
  cell: ({ row }) => {

   return (
    <UserInfoCell
     name={row.original?.teacher.name}
     email={row.original?.teacher.email}
     profilePhoto={row.original?.teacher.profilePhoto || undefined}
    />
   )
  }
 },
 {
  id: "class",
  accessorKey: "class.name",
  header: "Class Teacher",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <span className="text-sm capitalize">{row.original?.class.name}</span>
   )
  }
 },


 {
  id: "contactNumber",
  accessorKey: "teacher.contactNumber",
  header: "Contact Number",
  enableSorting: false,

 },

 {
  accessorKey: "teacher.gender",
  header: "Gender",
  enableSorting: false,
  cell: ({ row }) => {
   const gender = row.original?.teacher.gender.toUpperCase();
   return (
    <span className="text-sm capitalize">{gender}</span>
   )
  }
 },
 {
  accessorKey: "teacher.classTeacher.createdAt",
  header: "Assigned Date",
  enableSorting: false,
  cell: ({ row }) => {
   return (
    <span className="text-sm capitalize">{format(new Date(row.original?.teacher.classTeacher.createdAt), "MMM dd, yyyy")}</span>
   )
  }
 },
]