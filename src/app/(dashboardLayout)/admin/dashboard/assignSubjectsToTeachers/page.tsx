import React from 'react'
import { getAllTeacher } from '@/services/admin-srever-action/teachers-managements.service'
import { getAllSubject } from '@/services/admin-srever-action/subject-managements.service'
import { assignSubjectsToTeacher, updatePrimarySubject, deleteTeacherSubject } from '@/services/admin-srever-action/assign-subject.service'
import AssignSubjectForm from '@/components/modules/Dasboard/Admin_Dashboard/AssignSubject-managements/AssignSubjectForm'

const AssignSubjectPage = async () => {
    // Parallel fetching for initial page load
    const [teachersRes, subjectsRes] = await Promise.all([
        getAllTeacher(),
        getAllSubject()
    ])

    const teachers = teachersRes?.data || []
    const subjects = subjectsRes?.data || []

    // 1. Creation flow (Two-step as required by backend)
    const handleAssignAction = async (data: { teacherId: string; subjectsId: string[]; primarySubjectId: string }) => {
        "use server"
        await assignSubjectsToTeacher({
            teacherId: data.teacherId,
            subjectsId: data.subjectsId
        })

        return await updatePrimarySubject({
            teacherId: data.teacherId,
            subjectId: data.primarySubjectId
        })
    }

    // 2. Update flow (Set existing subject as primary)
    const handleUpdatePrimaryAction = async (data: { teacherId: string; subjectId: string }) => {
        "use server"
        return await updatePrimarySubject(data)
    }

    // 3. Delete flow (Remove assignment)
    const handleDeleteAction = async (data: { teacherId: string; subjectId: string }) => {
        "use server"
        return await deleteTeacherSubject(data)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Staff Workload Management</h1>
                <p className="text-muted-foreground mt-2">Manage teacher academic portfolios, designate core specialties, and adjust assignments.</p>
            </div>

            <AssignSubjectForm
                teachers={teachers}
                subjects={subjects}
                onAssign={handleAssignAction}
                onDelete={handleDeleteAction}
                onUpdatePrimary={handleUpdatePrimaryAction}
            />
        </div>
    )
}

export default AssignSubjectPage