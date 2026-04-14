"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service'
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import { useQuery } from '@tanstack/react-query'
import { academicLevelColumns } from './academicLevelColumns'

const AcademicLevel = () => {
 const { data: academicLevelDataResponse, isLoading } = useQuery({
  queryKey: ["academic-levels"],
  queryFn: getAllAcademicLevel,
  refetchOnWindowFocus: true,
 })
 const { data: academicLevelData = [] } = academicLevelDataResponse || {}

 const hadleVewAdmin = (admin: IAcademicLevel) => {
  console.log("View admin:", admin);
 }
 const handleEditAdmin = (admin: IAcademicLevel) => {
  console.log("Edit admin:", admin);
 }
 const handleDeleteAdmin = (admin: IAcademicLevel) => {
  console.log("Delete admin:", admin);
 }

 return (
  <div>
   <DataTable
    data={academicLevelData}
    columns={academicLevelColumns}
    emptyMessage="No academic level data available."
    isLoading={isLoading}

    actions={
     {
      onView: hadleVewAdmin,
      onEdit: handleEditAdmin,
      onDelete: handleDeleteAdmin
     }
    }
   ></DataTable>
  </div>
 )
}

export default AcademicLevel 