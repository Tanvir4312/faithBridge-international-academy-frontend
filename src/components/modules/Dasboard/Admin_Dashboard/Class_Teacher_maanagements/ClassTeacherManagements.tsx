"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllClassTeachers } from "@/services/admin-srever-action/class-teacher.service"
import { useMemo, useState } from "react"
import DataTable from "@/components/shared/table/DataTable"
import { classTeacherColumn } from "./classTeacherColumn"
import { IClassTeacher } from "@/types/Dashboard/admin-dashboard-types/class-teacher.types"
import DeleteClassTeacherModal from "./DeleteClassTeacherModal"

const ClassTeacherManagements = () => {
 const [selectedClassTeacher, setSelectedClassTeacher] = useState<IClassTeacher | null>(null)
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

 const { data: classTeachersResponse, isLoading } = useQuery({
  queryKey: ["class-teachers"],
  queryFn: getAllClassTeachers,
  refetchOnWindowFocus: true,
 })
 const classTecher = classTeachersResponse?.data || []
 console.log("classTecher", classTecher)
 const handleDelete = (data: IClassTeacher) => {
  setSelectedClassTeacher(data)
  setIsDeleteModalOpen(true)
 }

 return (
  <div className="space-y-6">
   <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
    <div>
     <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-tight">
      Class Teacher Management
     </h1>
     <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">Manage and assign teachers to specific classes</p>
    </div>
   </div>

   <DataTable
    data={classTecher}
    columns={classTeacherColumn}
    isLoading={isLoading}
    actions={{
     onDelete: handleDelete
    }}
   />

   <DeleteClassTeacherModal
    classTeacher={selectedClassTeacher}
    isOpen={isDeleteModalOpen}
    onOpenChange={setIsDeleteModalOpen}
   />
  </div>
 )
}

export default ClassTeacherManagements