
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllNotice } from "@/services/admin-srever-action/notices-managements";
import NoticeScroll from "@/components/modules/Home_Page/NoticeScroll/NoticeScroll";

const NoticesPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["notices"],
    queryFn: getAllNotice,
    staleTime: 60 * 1000 * 60 * 24, // 1 day
    gcTime: 60 * 1000 * 60 * 20, // 20 hours
  })
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeScroll />
    </HydrationBoundary>
  );
};

export default NoticesPage;
