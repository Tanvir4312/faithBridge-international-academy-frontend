"use client"
import DataTable from '@/components/shared/table/DataTable'
import { getAllSubject } from '@/services/admin-srever-action/subject-managements.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { subjectsColumns } from './subjectsColumns'
import { ISubject } from '@/types/Dashboard/admin-dashboard-types/subject-managements.types'
import { useState } from 'react'
import ViewSubjectModal from './ViewSubjectModal'
import { BookOpen } from 'lucide-react'

const SubjectManagement = () => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null)

    const { data: subjectResponse, isLoading } = useQuery({
        queryKey: ["subjects"],
        queryFn: getAllSubject,
        refetchOnWindowFocus: true
    })

    const { data: subjects = [] } = subjectResponse || {}

    const handleView = (data: ISubject) => {
        setSelectedSubject(data)
        setIsViewModalOpen(true)
    }

    return (
        <div className="space-y-6 p-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background p-6 rounded-[2rem] border shadow-sm text-left">
                <div className="space-y-1 text-left">
                    <h1 className="text-3xl font-black tracking-tight text-primary flex items-center gap-3 lowercase">
                        <BookOpen className="h-8 w-8" />
                        Subjects Repository
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest pl-1">Oversee school curriculum and faculty assignments</p>
                </div>
            </div>

            <DataTable
                data={subjects}
                columns={subjectsColumns}
                isLoading={isLoading}
                emptyMessage='No subjects found'
                actions={{
                    onView: handleView
                }}
            />

            <ViewSubjectModal
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                subject={selectedSubject}
            />
        </div>
    )
}

export default SubjectManagement