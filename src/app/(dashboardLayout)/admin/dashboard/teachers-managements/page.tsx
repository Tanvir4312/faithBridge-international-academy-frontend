import TeachersManagements from '@/components/modules/Dasboard/Admin_Dashboard/Teachers-managements/Teachers-managements';
import { getAllTeacher } from '@/services/admin-srever-action/teachers-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const TeachersManagementsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["teachers"],
        queryFn: getAllTeacher,
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 1
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TeachersManagements />
            </HydrationBoundary>

        </div>
    );
};

export default TeachersManagementsPage;