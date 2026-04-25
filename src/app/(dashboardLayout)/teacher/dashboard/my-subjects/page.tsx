import MySubjects from '@/components/modules/Dasboard/Teacher_Dashboard/MySubjectsInfo/MySubjects';
import { getUserInfo } from '../../../../../services/authService';
import { gettAllInfoForTeacher } from '@/services/teacher-server-action/teacher-info.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

const SubjectTeacherPage = async () => {
    const userInfo = await getUserInfo()
    const teacherId = userInfo?.teacher?.id
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["teacher-info"],
        queryFn: () => gettAllInfoForTeacher(teacherId)
    })
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MySubjects
                    teacherId={teacherId}
                />
            </HydrationBoundary>
        </div>
    );
};

export default SubjectTeacherPage;