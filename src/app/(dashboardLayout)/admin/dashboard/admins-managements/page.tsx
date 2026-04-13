import AllAdminTable from '@/components/modules/Dasboard/Admin_Dashboard/Admins-managements/AllAdminTable';
import { getAllAdmin } from '@/services/admin-srever-action/allAdmin.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const AdminsManagementsPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["all-admins"],
        queryFn: getAllAdmin,
        staleTime: 10 * 60 * 60 * 1000, // 10 hours
        gcTime: 9 * 60 * 60 * 1000, // 9 hours
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <AllAdminTable />
            </HydrationBoundary>
        </div>
    );
};

export default AdminsManagementsPage;