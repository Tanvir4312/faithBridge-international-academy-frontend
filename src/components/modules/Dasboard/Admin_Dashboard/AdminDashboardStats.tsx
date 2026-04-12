"use client"
import ApplicationBarChart from '@/components/shared/barChart/ApplicationBarChart';
import ApplicationPieChart from '@/components/shared/pieChart/ApplicationPieChart';
import StatsCard from '@/components/shared/statsCard/statsCard';
import { getAdminDashboardStats } from '@/services/admin-srever-action/adminDashboard.service';
import { ApiSuccessResponse } from '@/types/api.types';
import { IAdminDashboardStats } from '@/types/Dashboard/admin-dashboard-types/types';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdminDashboardStats = () => {
    const { data: adminDashboardStats } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: getAdminDashboardStats,
        refetchOnWindowFocus: "always" // Refetch data when the window regains focus
    })
    const { data } = adminDashboardStats as ApiSuccessResponse<IAdminDashboardStats>;

    return (
        <div>
            <div className='grid grid-cols-3 gap-5 mb-5'>
                <StatsCard
                    title="Total Applications"
                    value={data?.applicantCount || 0}
                    iconName="FileTextIcon"
                    description="Number of applications submitted"
                />
                <StatsCard
                    title="Total Students"
                    value={data?.studentCount || 0}
                    iconName="FileTextIcon"
                    description="Number of students enrolled"
                />
                <StatsCard
                    title="Total Teachers"
                    value={data?.teacherCount || 0}
                    iconName="FileTextIcon"
                    description="Number of teachers employed"
                />
                <StatsCard
                    title="Total Super Admins"
                    value={data?.superAdminCount || 0}
                    iconName="FileTextIcon"
                    description="Number of super admins"
                />
                <StatsCard
                    title="Total Admins"
                    value={data?.adminCount || 0}
                    iconName="FileTextIcon"
                    description="Number of admins"
                />
                <StatsCard
                    title="Total Payments"
                    value={data?.paymentCount || 0}
                    iconName="FileTextIcon"
                    description="Number of payments received"
                />
                <StatsCard
                    title="Total Revenue"
                    value={data?.totalRevenue || 0}
                    iconName="FileTextIcon"
                    description="Total revenue generated"
                />
            </div>
            <ApplicationBarChart
                data={data?.barChartData}
            />
            <ApplicationPieChart
                data={data?.pieChartData}
            />
        </div>

    );
};

export default AdminDashboardStats;