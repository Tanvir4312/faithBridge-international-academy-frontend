import ClassManagements from '@/components/modules/Dasboard/Admin_Dashboard/Class-managements/ClassManagements';
import { getAllClass } from '@/services/admin-srever-action/class-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const ClassManagementsPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["classes"],
        queryFn: getAllClass
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClassManagements />
            </HydrationBoundary>

        </div>
    );
};

export default ClassManagementsPage;