"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllSubject } from '@/services/admin-srever-action/subject-managements.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { subjectsColumns } from './subjectsColumns'
import { ISubject } from '@/types/Dashboard/admin-dashboard-types/subject-managements.types'

const SubjectManagement = () => {
 const { data: subjectResponse, isLoading } = useQuery({
  queryKey: ["subjects"],
  queryFn: getAllSubject,
  refetchOnWindowFocus: true
 })

 const { data: subjects = [] } = subjectResponse || {}
 const handleView = (id: ISubject) => {
  console.log("view", id)
 }
 return (
  <div>
   <DataTable
    data={subjects}
    columns={subjectsColumns}
    isLoading={isLoading}
    emptyMessage='No subjects found'
    actions={{
     onView: handleView
    }}
   />
  </div>
 )
}

export default SubjectManagement