
import ExamsManagements from '@/components/modules/Dasboard/Admin_Dashboard/Exams-managements/ExamsManagements';
import { getAllExam } from '@/services/admin-srever-action/exams-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const ExamsManagementsPage
    = async () => {
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery({
            queryKey: ["exams"],
            queryFn: getAllExam,
            staleTime: 1000 * 60 * 60 * 24 * 5, // 5 days
            gcTime: 1000 * 60 * 60 * 24 * 10, // 10 days
        })
        return (
            <div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ExamsManagements />
                </HydrationBoundary>
            </div>
        );
    };

export default ExamsManagementsPage
    ;