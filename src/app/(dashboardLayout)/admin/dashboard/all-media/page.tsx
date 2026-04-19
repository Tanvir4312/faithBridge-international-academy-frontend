import AllMediaClient from "@/components/modules/Dasboard/Admin_Dashboard/AllMediaClient/AllMediaClient"
import { getAllMedia } from "@/services/admin-srever-action/all-media.service"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const AllMedia = async () => {
 const queryClient = new QueryClient()

 await queryClient.prefetchQuery({
  queryKey: ["all-media"],
  queryFn: getAllMedia,
  staleTime: 1000 * 60 * 60 * 24, // 1 day
  gcTime: 1000 * 60 * 60 * 22 // 22 hours
 })
 return (
  <div>
   <HydrationBoundary state={dehydrate(queryClient)}>
    <AllMediaClient />
   </HydrationBoundary>
  </div>
 )
}

export default AllMedia