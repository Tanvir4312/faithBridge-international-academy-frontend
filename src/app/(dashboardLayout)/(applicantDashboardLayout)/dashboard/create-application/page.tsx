import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAdmissionTimeConfig } from '@/services/admin-srever-action/admission-time-config.service';
import CreateApplication from '@/components/modules/Dasboard/Applicant_Dashboard/CreateApplication/CreateApplication';

const CreateApplicationPage
    = async () => {
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery({
            queryKey: ["admission-config"],
            queryFn: getAdmissionTimeConfig,

        });
        return (
            <div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <CreateApplication />
                </HydrationBoundary>
            </div>
        );
    };

export default CreateApplicationPage
    ;