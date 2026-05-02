import ClassTeacherManagements from '@/components/modules/Dasboard/Admin_Dashboard/Class_Teacher_maanagements/ClassTeacherManagements';
import { getAllClassTeachers } from '@/services/admin-srever-action/class-teacher.service'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const ClassTeacherManagement = async () => {
 const queryClient = new QueryClient();
 await queryClient.prefetchQuery({
  queryKey: ["class-teachers"],
  queryFn: getAllClassTeachers,
  staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week are cashing in cache data
  gcTime: 1000 * 60 * 60 * 24 * 6,// six days are cashing in cache data
 })

 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <ClassTeacherManagements />
   </HydrationBoundary>
  </div>
 )
}

export default ClassTeacherManagement