import SubjectManagement from '@/components/modules/Dasboard/Admin_Dashboard/Subject-managements/SubjectManagement';
import { getAllSubject } from '@/services/admin-srever-action/subject-managements.service';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';

const SubjectsManagementsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["subjects"],
        queryFn: getAllSubject,
        staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
        gcTime: 1000 * 60 * 60 * 24 * 30, // 1 month
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <SubjectManagement />
            </HydrationBoundary>
        </div>
    );
};




export default SubjectsManagementsPage;