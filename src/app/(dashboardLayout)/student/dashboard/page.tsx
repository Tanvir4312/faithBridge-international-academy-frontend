import StudentDashboardClient from '@/components/modules/Dasboard/Student_Dashboard/Student_Dashboard_Client/StudentDashboardClient';
import { getUserInfo } from '@/services/authService';
import { getFromFillupByStudentId } from '@/services/student-server-action/fromFillup.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const StudentDashboardPage = async () => {
    const userInfo = await getUserInfo()
    const studentId = userInfo?.student?.id

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["get-student-from-fillup"],
        queryFn: () => getFromFillupByStudentId(studentId),
        staleTime: 1000 * 60 * 60 * 24,//1 day
        gcTime: 1000 * 60 * 60 * 24 * 2//2 days
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <StudentDashboardClient
                    studentId={studentId}
                />
            </HydrationBoundary>
        </div>
    );
};

export default StudentDashboardPage;