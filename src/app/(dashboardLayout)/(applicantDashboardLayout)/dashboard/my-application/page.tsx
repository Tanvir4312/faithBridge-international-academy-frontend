import MyApplicationClient from '@/components/modules/Dasboard/Applicant_Dashboard/MyApplicationClient/MyApplicationClient';
import { getMyApplicationInfo } from '@/services/applicant-server-action/application.service';
import { getUserInfo } from '@/services/authService';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';

const MyApplicationPage = async () => {
    const userInfo = await getUserInfo()
    const applicantId = userInfo?.application?.id
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["my-application", applicantId],
        queryFn: () => getMyApplicationInfo(applicantId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MyApplicationClient
                    applicantId={applicantId}
                />
            </HydrationBoundary>
        </div>
    );
};




export default MyApplicationPage;