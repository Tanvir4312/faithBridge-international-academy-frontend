import Header from '@/components/modules/Home_Page/Header/Header';
import Navbar from '@/components/modules/Home_Page/Navbar/Navbar';
import { UserRole } from '@/lib/authUtils';
import { getUserInfo } from '@/services/authService';
import { getSingleNotice } from '@/services/common-server-action/getNoticeById.service';
import React from 'react';

const NoticeDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: notice } = await getSingleNotice(id);

    const userInfo = await getUserInfo()

    let userRole = userInfo?.role

    const unifySuperAdminAndAdmin = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole as UserRole
    userRole = unifySuperAdminAndAdmin

    if (!notice) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-2xl font-bold text-slate-800">Notice Not Found</h1>
                <p className="text-slate-500 mt-2">The notice you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(notice.createdAt));

    return (
        <div>
            <Header />
            <Navbar
                userRole={userRole as UserRole}
            />
            <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <article className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                        <div className="p-8 md:p-12 space-y-10 text-center">
                            {/* Date Header */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center justify-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mb-2">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <time
                                    dateTime={notice.createdAt}
                                    className="block text-sm font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase"
                                >
                                    {formattedDate}
                                </time>
                                <div className="h-px w-12 bg-slate-200 dark:bg-slate-800 mx-auto mt-4"></div>
                            </div>

                            {/* Notice Title */}
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                                {notice.title}
                            </h2>

                            {/* Details Content */}
                            <section className="relative px-4">
                                <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert mx-auto">
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap italic">
                                        "{notice.details}"
                                    </p>
                                </div>
                            </section>

                            {/* Footer Branding */}
                            <footer className="pt-10">
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">FaithBridge Academy</span>
                                </div>
                            </footer>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
};

export default NoticeDetailsPage;