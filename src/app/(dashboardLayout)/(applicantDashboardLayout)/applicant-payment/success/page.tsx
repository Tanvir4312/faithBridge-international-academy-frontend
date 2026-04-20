import ApplicantPaymentSuccessInfo from '@/components/modules/Dasboard/Applicant_Dashboard/ApplicantPaymentSuccessInfo/ApplicantPaymentSuccessInfo';
import { getAllApplicantPaymentInfo } from '@/services/applicant-server-action/applicant-paymentInfo.service';
import { getUserInfo } from '@/services/authService';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const PaymentSuccess = async () => {
    const userInfo = await getUserInfo()
    if (!userInfo) {
        return <div>User not found</div>
    }

    const applicantId = userInfo?.application?.id
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["applicant-payment-info"],
        queryFn: () => getAllApplicantPaymentInfo(applicantId),
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ApplicantPaymentSuccessInfo
                    applicantId={applicantId}
                />
            </HydrationBoundary>
        </div>
    );
};

export default PaymentSuccess;