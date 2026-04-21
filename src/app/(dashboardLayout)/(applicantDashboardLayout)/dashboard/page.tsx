import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserInfo } from '@/services/authService';
import { getMyApplicationInfo } from '@/services/applicant-server-action/application.service';
import ApplicantDashboardHomeClient from '@/components/modules/Dasboard/Applicant_Dashboard/ApplicantDashboardHomeClient/ApplicantDashboardHomeClient';

const DashboardPage = async () => {
    const userInfo = await getUserInfo()
    const applicantId = userInfo?.application?.id
    const queryClient = new QueryClient();


    if (applicantId) {
        await queryClient.prefetchQuery({
            queryKey: ["my-application", applicantId],
            queryFn: () => getMyApplicationInfo(applicantId),
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        });
    }

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ApplicantDashboardHomeClient applicantId={applicantId as string} />
            </HydrationBoundary>
        </div>
    );
};

export default DashboardPage;