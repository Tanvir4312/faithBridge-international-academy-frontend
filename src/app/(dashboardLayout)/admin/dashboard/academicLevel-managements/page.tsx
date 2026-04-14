import AcademicLevel from '@/components/modules/Dasboard/Admin_Dashboard/AcademicLevele-managements/academicLevel';
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const AcademicLevelManagementsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["academic-levels"],
        queryFn: getAllAcademicLevel,
        staleTime: 1000 * 60 * 60 * 20, // 20 hours
        gcTime: 1000 * 60 * 60 * 19, // 19 hours
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <AcademicLevel />
            </HydrationBoundary>
        </div>
    );
};

export default AcademicLevelManagementsPage;