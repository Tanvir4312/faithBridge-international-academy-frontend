import AllAdminTable from '@/components/modules/Dasboard/Admin_Dashboard/Admins-managements/AllAdminTable';
import { getAllAdmin } from '@/services/admin-srever-action/allAdmin.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const AdminsManagementsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const queryParamsObj = await searchParams;

   
    const queryParamsString = Object.keys(queryParamsObj).map(key => {
        const value = queryParamsObj[key];
        if (Array.isArray(value)) {
            return value.map((val) => `${key}=${val}`).join('&');
        }
        return `${key}=${value}`;
    }).join('&');



    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["all-admins", queryParamsString],
        queryFn: () => getAllAdmin(queryParamsString),
        staleTime: 10 * 60 * 60 * 1000, // 10 hours
        gcTime: 9 * 60 * 60 * 1000, // 9 hours
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <AllAdminTable 
                    queryParamsString={queryParamsString}
                    queryParamsObj={queryParamsObj}
                />
            </HydrationBoundary>
        </div>
    );
};

export default AdminsManagementsPage;