"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import DataTable from "@/components/shared/table/DataTable"
import { getAllTeacher } from "@/services/admin-srever-action/teachers-managements.service"
import { teacherColumns } from "./teacherColumns"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements.types"
import TeacherDetailsModal from "../../../../shared/teacherModals/TeacherDetailsModal"
import UpdateTeacherModal from "@/components/shared/teacherModals/UpdateTeacherModal"
import DeleteTeacherModal from "@/components/modules/Dasboard/Admin_Dashboard/Teachers-managements/DeleteTeacherModal"
import CreateTeacherModal from "@/components/modules/Dasboard/Admin_Dashboard/Teachers-managements/CreateTeacherModal"

function TeachersManagements() {
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: teachersResponse, isLoading, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeacher,
    refetchOnWindowFocus: true
  })



  const teachers = teachersResponse?.data || []

  // const teachers = teachersArr?.filter((teacher) => (teacher.user.emailVerified && !teacher.user.needPasswordChange)) || []

  const handleView = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsViewModalOpen(true)
  }

  const handleEdit = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsEditModalOpen(true)
  }

  const handleDelete = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>
        <CreateTeacherModal onSuccess={() => refetch()} />
      </div>

      <DataTable
        data={teachers}
        columns={teacherColumns}
        emptyMessage="No Data found"
        isLoading={isLoading}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete
        }}
      />

      <TeacherDetailsModal
        teacher={selectedTeacher}
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      <UpdateTeacherModal
        teacher={selectedTeacher}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />

      <DeleteTeacherModal
        teacher={selectedTeacher}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </div>
  )
}

export default TeachersManagements