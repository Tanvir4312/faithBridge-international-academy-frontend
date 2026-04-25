import PaymentSuccessClient from '@/components/modules/Dasboard/Student_Dashboard/PaymentSuccessClient/PaymentSuccessClient';
import { getUserInfo } from '../../../../../services/authService';
import { getAllStudentPaymentInfo } from '@/services/student-server-action/payment.info.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

const PaymentSuccessPage = async () => {
    const userInfo = await getUserInfo()
    if (!userInfo) {
        return redirect("/login")
    }
    const studentId = userInfo?.student?.id
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["payment-info"],
        queryFn: () => getAllStudentPaymentInfo(studentId),
        staleTime: 60 * 1000 * 60 * 24,//1 day
        gcTime: 60 * 1000 * 60 * 23//23 hours
    })

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PaymentSuccessClient
                    studentId={studentId}
                />
            </HydrationBoundary>
        </div>
    );
};

export default PaymentSuccessPage;