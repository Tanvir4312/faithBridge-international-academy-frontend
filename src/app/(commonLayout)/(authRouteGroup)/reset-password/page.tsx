import ResetPasswordForm from '@/components/modules/auth/PasswordResetForm';
import React from 'react';


const ResetPasswordPage = async ({ searchParams }: { searchParams: Promise<{ email?: string }> }) => {
    const params = await searchParams;
    const email = params.email || "";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background p-4">
            <div className="w-full max-w-6xl flex items-center justify-center">
                <ResetPasswordForm email={email} />
            </div>
        </div>
    );
};

export default ResetPasswordPage;