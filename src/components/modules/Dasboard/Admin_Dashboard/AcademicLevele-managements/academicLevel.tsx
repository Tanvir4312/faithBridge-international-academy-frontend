"use client"

import React from 'react'
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service'
import { useQuery } from '@tanstack/react-query'
import AcademicLevelTable from './AcademicLevelTable'
import CreateAcademicLevelModal from './CreateAcademicLevelModal'
import { Skeleton } from '@/components/ui/skeleton'
import { Layers } from 'lucide-react'

const AcademicLevel = () => {
    const { data: academicLevelResponse, isLoading, refetch } = useQuery({
        queryKey: ["academic-levels"],
        queryFn: () => getAllAcademicLevel(),
        refetchOnWindowFocus: true,
    })

    const academicLevels = academicLevelResponse?.data || []

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Academic Levels</h1>
                        <p className="text-muted-foreground text-sm">Organize and manage school tiers and class groupings.</p>
                    </div>
                </div>
                
                <CreateAcademicLevelModal onSuccess={() => refetch()} />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                </div>
            ) : (
                <AcademicLevelTable 
                    data={academicLevels} 
                    onRefresh={() => refetch()} 
                />
            )}
        </div>
    )
}

export default AcademicLevel