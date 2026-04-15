"use client"

import React, { useState } from 'react'
import DataTable from '@/components/shared/table/DataTable'
import { IClass } from '@/types/Dashboard/admin-dashboard-types/class-managements.types'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { School, UserCircle, Calendar } from 'lucide-react'
import ViewClassModal from './ViewClassModal'


interface ClassTableProps {
    data: IClass[];
    onRefresh: () => void;
}

const ClassTable = ({ data, onRefresh }: ClassTableProps) => {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<IClass | null>(null)

    const columns: ColumnDef<IClass>[] = [
        {
            accessorKey: "name",
            header: "Class Name",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-lg">
                        <School className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-bold text-base">{row.original.name}</span>
                </div>
            )
        },
        {
            accessorKey: "AcademicLevel",
            header: "Academic Level",
            enableSorting: false,
            cell: ({ row }) => (
                <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5">
                    {row.original.AcademicLevel?.name || "Unassigned"}
                </Badge>
            )
        },
        {
            accessorKey: "classTeacher",
            header: "Class Teacher",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                        {row.original.classTeacher?.teacher.name || "None Assigned"}
                    </span>
                </div>
            )
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                    <Calendar className="h-3 w-3" />
                    {row.original.createdAt ? format(new Date(row.original.createdAt), 'MMM dd, yyyy') : "N/A"}
                </div>
            )
        }
    ]

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={data}
                actions={{
                    onView: (item) => {
                        setSelectedClass(item)
                        setIsViewDialogOpen(true)
                    }
                }}
            />

            {selectedClass && (
                <ViewClassModal
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                    classData={selectedClass}
                />
            )}
        </div>
    )
}

export default ClassTable
