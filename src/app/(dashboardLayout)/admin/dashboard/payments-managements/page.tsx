import PaymentsManagements from '@/components/modules/Dasboard/Admin_Dashboard/Payments-managements/PaymentsManagements';
import { getAllPayments } from '@/services/admin-srever-action/payments-managements.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const PaymentsManagementspage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["payments"],
        queryFn: getAllPayments,
        staleTime: 1000 * 60 * 60, //1 hour
        gcTime: 1000 * 60 * 50 //50 minutes
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PaymentsManagements />
            </HydrationBoundary>
        </div>
    );
};

export default PaymentsManagementspage;