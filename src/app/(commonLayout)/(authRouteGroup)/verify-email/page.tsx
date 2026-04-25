import { getUserInfo } from '../../../../services/authService';
import React from 'react';
import VerifyEmailForm from '@/components/modules/auth/VerifyEmailForm';
import { redirect } from 'next/navigation';
import { getDefaultDashboardRoute, UserRole } from '../../../../lib/authUtils';

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
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background p-4">
            <div className="w-full max-w-6xl flex items-center justify-center">
                <VerifyEmailForm email={email} />
            </div>
        </div>
    );
};

export default VerifyEmailPage;