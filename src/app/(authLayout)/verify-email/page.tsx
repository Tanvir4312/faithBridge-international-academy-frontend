import { getUserInfo } from '@/services/authService';
import React from 'react';
import VerifyEmailForm from '@/components/modules/auth/VerifyEmailForm';
import { redirect } from 'next/navigation';
import { getDefaultDashboardRoute, UserRole } from '@/lib/authUtils';

const VerifyEmailPage = async ({ searchParams }: { searchParams: Promise<{ email?: string }> }) => {
    const userInfo = await getUserInfo();
    const params = await searchParams;

    // If user is already verified, redirect them to their dashboard
    if (userInfo?.emailVerified) {
        const target = getDefaultDashboardRoute(userInfo.role as UserRole);
        redirect(target);
    }

    const email = userInfo?.email || params.email || "";

    return (
        <VerifyEmailForm email={email} />
    );
};

export default VerifyEmailPage;