import { getAllTeacherQuery } from "@/services/admin-srever-action/teachers-managements.service"
import { getAllSubject } from "@/services/admin-srever-action/subject-managements.service"
import { getAllClass } from "@/services/admin-srever-action/class-managements.service"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import TeachersInformation from "@/components/modules/NavbarRoutes/aboute/Teachers_Information/TeachersInformation"

const TeacherInformationPage = async () => {
 const queryClient = new QueryClient()
 await queryClient.prefetchQuery({
  queryKey: ["teachers"],
  queryFn: getAllTeacherQuery,
  staleTime: 60 * 60 * 24 * 1000,//1 day
  gcTime: 60 * 60 * 24 * 1000,//1 day

 })
 await queryClient.prefetchQuery({
  queryKey: ["subjects"],
  queryFn: getAllSubject,
  staleTime: 60 * 60 * 24 * 1000,
  gcTime: 60 * 60 * 24 * 1000,
 })
 await queryClient.prefetchQuery({
  queryKey: ["classes"],
  queryFn: getAllClass,
  staleTime: 60 * 60 * 24 * 1000,
  gcTime: 60 * 60 * 24 * 1000,
 })

 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <TeachersInformation />
   </HydrationBoundary>
  </div>
 )
}

export default TeacherInformationPage