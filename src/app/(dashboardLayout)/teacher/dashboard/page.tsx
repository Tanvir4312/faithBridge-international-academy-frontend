import TeacherDashboardInfo from '@/components/modules/Dasboard/Teacher_Dashboard/MySubjectsInfo/TeacherDashboardInfo';
import { getUserInfo } from '@/services/authService';
import { gettAllInfoForTeacher } from '@/services/teacher-server-action/teacher-info.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const TeacherDashboardPage = async () => {
    const userInfo = await getUserInfo();
    const teacherId = userInfo?.teacher?.id;
    const queryClient = new QueryClient();

    // Prefetch for SSR performance
    await queryClient.prefetchQuery({
        queryKey: ["teacher-info", teacherId],
        queryFn: () => gettAllInfoForTeacher(teacherId),
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TeacherDashboardInfo teacherId={teacherId} />
            </HydrationBoundary>
        </div>
    );
};

export default TeacherDashboardPage;