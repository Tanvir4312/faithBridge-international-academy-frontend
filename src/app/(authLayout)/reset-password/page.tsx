import React from 'react';
import ResetPasswordForm from '@/components/modules/auth/PasswordResetForm';

const ResetPasswordPage = async ({ searchParams }: { searchParams: Promise<{ email?: string }> }) => {
    const params = await searchParams;
    const email = params.email || "";

    return (
        <ResetPasswordForm email={email} />
    );
};

export default ResetPasswordPage;