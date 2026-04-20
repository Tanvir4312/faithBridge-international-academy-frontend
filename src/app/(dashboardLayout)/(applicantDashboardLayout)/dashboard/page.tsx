import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserInfo } from '@/services/authService';
import { getMyApplicationInfo } from '@/services/applicant-server-action/application.service';
import ApplicantDashboardHomeClient from '@/components/modules/Dasboard/Applicant_Dashboard/ApplicantDashboardHomeClient/ApplicantDashboardHomeClient';

const DashboardPage = async () => {
    const userInfo = await getUserInfo()
    const applicantId = userInfo?.application?.id
    const queryClient = new QueryClient();
    
    // We prefetch using the same query key format
    if (applicantId) {
        await queryClient.prefetchQuery({
            queryKey: ["my-application"],
            queryFn: () => getMyApplicationInfo(applicantId),
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