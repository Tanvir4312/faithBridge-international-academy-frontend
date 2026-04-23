import ApplicationsManagement from '@/components/modules/Dasboard/Admin_Dashboard/Applications-managements/ApplicationsManagementTable';
import { getAllApplication } from '@/services/admin-srever-action/applications-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const ApplicationsManagementsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const queryParamsObj = await searchParams;


    const queryParamsString = Object.keys(queryParamsObj)?.map(key => {
        const value = queryParamsObj[key];
        if (Array.isArray(value)) {
            return value?.map((val) => `${key}=${val}`).join('&');
        }
        return `${key}=${value}`;
    }).join('&');

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["applications", queryParamsString],
        queryFn: () => getAllApplication(queryParamsString),
        staleTime: 1000 * 60 * 5, //5 minutes
        gcTime: 1000 * 60 * 9,//9 minutes
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ApplicationsManagement queryParamsString={queryParamsString} queryParamsObj={queryParamsObj} />
            </HydrationBoundary>
        </div>
    );
};

export default ApplicationsManagementsPage;