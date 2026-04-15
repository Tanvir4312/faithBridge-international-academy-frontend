"use client"

import React from 'react'
import { getAllClass } from "@/services/admin-srever-action/class-managements.service";
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service';
import { getAllTeacher } from '@/services/admin-srever-action/teachers-managements.service';
import { useQuery } from "@tanstack/react-query";
import { School } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ClassTable from './ClassTable';
import CreateClassModal from './CreateClassModal';

const ClassManagements = () => {
    const { data: classResponse, isLoading, refetch } = useQuery({
        queryKey: ["classes"],
        queryFn: () => getAllClass()
    })

    const { data: levelsResponse } = useQuery({
        queryKey: ["academic-levels"],
        queryFn: () => getAllAcademicLevel()
    })

    const { data: teachersResponse } = useQuery({
        queryKey: ["teachers"],
        queryFn: () => getAllTeacher()
    })

    const classes = classResponse?.data || []
    const academicLevels = levelsResponse?.data || []
    const teachers = teachersResponse?.data || []

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <School className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Class Management</h1>
                        <p className="text-muted-foreground text-sm">Organize student groups, assign sections, and manage class teachers.</p>
                    </div>
                </div>
                
                <CreateClassModal 
                    academicLevels={academicLevels} 
                    teachers={teachers} 
                    onSuccess={() => refetch()} 
                />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                </div>
            ) : (
                <ClassTable 
                    data={classes} 
                    onRefresh={() => refetch()} 
                />
            )}
        </div>
    );
};

export default ClassManagements;