import MyClassNotices from "@/components/modules/Dasboard/Student_Dashboard/My-Class-Notices/MyClassNotices"
import { getAllNotice } from "@/services/admin-srever-action/notices-managements"
import { getUserInfo } from "@/services/authService"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const MyClassNoticePage = async () => {
 const queryClient = new QueryClient()
 const userInfo = await getUserInfo()

 const studentClass = userInfo?.student?.class?.name
 console.log(studentClass)

 await queryClient.prefetchQuery({
  queryKey: ["notices"],
  queryFn: () => getAllNotice(),
  staleTime: 1000 * 60 * 60 * 24, //24 hours
  gcTime: 1000 * 60 * 60 * 23 //23 hours
 })


 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <MyClassNotices
     studentClass={studentClass}
    />
   </HydrationBoundary>
  </div>
 )
}

export default MyClassNoticePage