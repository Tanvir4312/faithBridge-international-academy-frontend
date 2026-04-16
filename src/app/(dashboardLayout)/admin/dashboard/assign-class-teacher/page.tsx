import React from 'react';
import { getAllTeacher } from '@/services/admin-srever-action/teachers-managements.service';
import { getAllClass } from '@/services/admin-srever-action/class-managements.service';
import ClassTeacherManagement from '@/components/modules/Dasboard/Admin_Dashboard/AssignClassTeacher-managements/ClassTeacherManagement';

const AssignClassTeacherPage = async () => {
    // Parallel data fetching for performance
    const [teachersRes, classesRes] = await Promise.all([
        getAllTeacher(),
        getAllClass()
    ])

    const teachers = teachersRes?.data || []
    const classes = classesRes?.data || []

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen">
            <ClassTeacherManagement 
                teachers={teachers}
                classes={classes}
            />
        </div>
    );
};

export default AssignClassTeacherPage;