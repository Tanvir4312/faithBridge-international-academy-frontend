
import NoticesManagements from '@/components/modules/Dasboard/Admin_Dashboard/Notices-managements/NoticesManagements.service';
import { getAllNotice } from '@/services/admin-srever-action/notices-managements';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const NoticesManagementspage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["notices"],
        queryFn: getAllNotice,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoticesManagements />
            </HydrationBoundary>
        </div>
    );
};

export default NoticesManagementspage;