import React from "react";
import { getNotices } from "./_action";
import NoticesList from "@/components/modules/notices/NoticesList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const NoticesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticesList />
    </HydrationBoundary>
  );
};

export default NoticesPage;
