"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllTeacher } from "@/services/admin-srever-action/teachers-managements.service"
import { useQuery } from "@tanstack/react-query"
import { teacherColumns } from "./teacherColumns"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements"

function TeachersManagements() {
 const { data: teachersResponse, isLoading } = useQuery({
  queryKey: ["teachers"],
  queryFn: getAllTeacher,
  refetchOnWindowFocus: true
 })
 const { data: teachers = [] } = teachersResponse || {}

 const handleView = (id: ITeacher) => {
  console.log(id)
 }
 const handleEdit = (id: ITeacher) => {
  console.log(id)
 }
 const handleDelete = (id: ITeacher) => {
  console.log(id)
 }

 return (
  <div>
   <DataTable
    data={teachers}
    columns={teacherColumns}
    emptyMessage="No Data found"
    isLoading={isLoading}
    actions={
     {
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete
     }
    }
   />
  </div>
 )
}

export default TeachersManagements