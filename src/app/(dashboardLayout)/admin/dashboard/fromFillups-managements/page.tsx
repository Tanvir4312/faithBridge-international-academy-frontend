import FromFillupsManagements from '@/components/modules/Dasboard/Admin_Dashboard/FromFillup-managements/FromFillupsManagements';
import { getAllFromFillup } from '@/services/admin-srever-action/fromFillup-managements.service';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';

const FromFillupsManagementsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["from-fillup"],
        queryFn: getAllFromFillup,
        staleTime: 60 * 1000 * 5, // 5 minutes
        gcTime: 60 * 1000 * 10, // 10 minutes
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <FromFillupsManagements />
            </HydrationBoundary>
        </div>
    );
};

export default FromFillupsManagementsPage;