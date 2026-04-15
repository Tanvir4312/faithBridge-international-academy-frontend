import StudentsManagement from '@/components/modules/Dasboard/Students-managements/StudentsManagement';
import { getAllStudent } from '@/services/admin-srever-action/students-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const StudentsManagementspage = async ({
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


    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["students", queryParamsString],
        queryFn: () => getAllStudent(queryParamsString),
        staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day
        gcTime: 1000 * 60 * 60 * 20 // 20 hours
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <StudentsManagement
                    queryParamsString={queryParamsString}
                    queryParamsObj={queryParamsObj}
                />
            </HydrationBoundary>
        </div>
    );
};

export default StudentsManagementspage;