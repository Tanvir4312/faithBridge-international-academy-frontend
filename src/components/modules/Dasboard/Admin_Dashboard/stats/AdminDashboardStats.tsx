"use client"
import ApplicationBarChart from '@/components/shared/barChart/ApplicationBarChart';
import ApplicationPieChart from '@/components/shared/pieChart/ApplicationPieChart';
import StatsCard from '@/components/shared/statsCard/statsCard';
import { getAdminDashboardStats } from '@/services/admin-srever-action/adminDashboard.service';
import { ApiSuccessResponse } from '@/types/api.types';
import { IAdminDashboardStats } from '@/types/Dashboard/admin-dashboard-types/admins-dashboardStat.types';


import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdminDashboardStats = () => {
    const { data: adminDashboardStats, isLoading, isError } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: getAdminDashboardStats,
        refetchOnWindowFocus: "always" // Refetch data when the window regains focus
    })
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-64 text-indigo-500 font-bold animate-pulse">Loading dashboard statistics...</div>
    }

    if (isError || adminDashboardStats?.success === false) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-rose-500 text-white rounded-2xl shadow-xl shadow-rose-100 mb-4 font-black uppercase text-xs">Error: Access Blocked</div>
                <h3 className="text-xl font-black text-rose-900 tracking-tight">Failed to fetch statistics</h3>
                <p className="text-rose-600 font-medium max-w-md mt-2 italic leading-relaxed">
                    {adminDashboardStats?.message || "There was a problem retrieving the latest dashboard statistics. Your account may have insufficient privileges or has been deactivated."}
                </p>
                <div className="mt-6 text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em]">{new Date().toLocaleTimeString()}</div>
            </div>
        );
    }

    const data = adminDashboardStats?.data;

    return (
        <div className="space-y-8 pb-10">
            {/* Main Stats Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
                <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-semibold border border-indigo-100 dark:border-indigo-800">
                    Live Updates Active
                </div>
            </div>

            {/* Financial & Critical Stats */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <StatsCard
                    title="Total Revenue"
                    value={`$${data?.totalRevenue?.toLocaleString() || 0}`}
                    iconName="DollarSign"
                    description="Total revenue from paid applications"
                    className="bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30"
                />
                <StatsCard
                    title="Success Payments"
                    value={data?.paymentStats?.successPaymentCount || 0}
                    iconName="CheckCircle"
                    description={`${data?.paymentStats?.unpaidPaymentCount || 0} pending payments`}
                    className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30"
                />
                <StatsCard
                    title="Approved Applicants"
                    value={data?.applicantStats?.approvedApplicantCount || 0}
                    iconName="UserCheck"
                    description={`${data?.applicantStats?.pendingApplicantCount || 0} pending applications`}
                    className="bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30"
                />
            </div>

            {/* Applicant Statistics Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                    Application Metrics
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
                    <StatsCard
                        title="Paid"
                        value={data?.applicantStats?.paidApplicantCount || 0}
                        iconName="CreditCard"
                        className="bg-white/50"
                    />
                    <StatsCard
                        title="Unpaid"
                        value={data?.applicantStats?.unpaidApplicantCount || 0}
                        iconName="Clock"
                        className="bg-white/50"
                    />
                    <StatsCard
                        title="Approved"
                        value={data?.applicantStats?.approvedApplicantCount || 0}
                        iconName="CheckSquare"
                        className="bg-white/50"
                    />
                    <StatsCard
                        title="Pending"
                        value={data?.applicantStats?.pendingApplicantCount || 0}
                        iconName="AlertCircle"
                        className="bg-white/50"
                    />
                    <StatsCard
                        title="Rejected"
                        value={data?.applicantStats?.rejectedApplicantCount || 0}
                        iconName="XCircle"
                        className="bg-white/50"
                    />
                </div>
            </div>

            {/* User Statistics Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                    User Management
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    <StatsCard
                        title="Active Users"
                        value={data?.userStats?.activeUserCount || 0}
                        iconName="User"
                        description={`${data?.userStats?.inactiveUserCount || 0} inactive / ${data?.userStats?.suspendedUserCount || 0} suspended`}
                    />
                    <StatsCard
                        title="Active Teachers"
                        value={data?.userStats?.activeTeacherCount || 0}
                        iconName="GraduationCap"
                        description={`${data?.userStats?.inactiveTeacherCount || 0} inactive`}
                    />
                    <StatsCard
                        title="Active Admins"
                        value={data?.userStats?.activeAdminCount || 0}
                        iconName="Shield"
                        description={`${data?.userStats?.inactiveAdminCount || 0} inactive`}
                    />
                    <StatsCard
                        title="Total Active"
                        value={(data?.userStats?.activeUserCount || 0) + (data?.userStats?.activeTeacherCount || 0) + (data?.userStats?.activeAdminCount || 0)}
                        iconName="Users"
                        description="Combined active staff and students"
                    />
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Application Status Distribution</h3>
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    </div>
                    <ApplicationPieChart data={data?.pieChartData || []} />
                </div>
                
                <div className="bg-white dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Monthly Application Growth</h3>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <ApplicationBarChart data={data?.barChartData || []} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardStats;