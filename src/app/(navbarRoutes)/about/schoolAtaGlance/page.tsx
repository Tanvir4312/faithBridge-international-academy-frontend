
import SchoolAtaGlance from '@/components/modules/NavbarRoutes/aboute/SchoolAtaGlance/SchoolAtaGlance'
import { getAllStudentWithoutQuery } from '@/services/admin-srever-action/students-managements.service';
import { getAllTeacher } from '@/services/admin-srever-action/teachers-managements.service';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

const SchoolAtaGlancePage = async () => {
 const queryClient = new QueryClient()
 await queryClient.prefetchQuery({
  queryKey: ["teachers"],
  queryFn: getAllTeacher,
  staleTime: 1000 * 60 * 60 * 24,//1day
  gcTime: 1000 * 60 * 60 * 23 //23 hours 
 })


 await queryClient.prefetchQuery({
  queryKey: ["studentsCount"],
  queryFn: getAllStudentWithoutQuery,
  staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day
  gcTime: 1000 * 60 * 60 * 20 // 20 hours
 })
 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <SchoolAtaGlance />
   </HydrationBoundary>
  </div>
 )
}

export default SchoolAtaGlancePage