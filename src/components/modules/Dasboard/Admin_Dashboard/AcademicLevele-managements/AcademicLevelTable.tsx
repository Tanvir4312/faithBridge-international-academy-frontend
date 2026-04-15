"use client"

import React, { useState } from 'react'
import DataTable from '@/components/shared/table/DataTable'
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from 'lucide-react'
import { deleteAcademicLevel } from "@/services/admin-srever-action/academicLevel.service"
import { toast } from 'sonner'

// Direct imports for the modals in the same directory

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import UpdateAcademicLevelModal from './UpdateAcademicLevelModal'
import ViewAcademicLevelModal from './ViewAcademicLevelModal'

interface AcademicLevelTableProps {
    data: IAcademicLevel[];
    onRefresh: () => void;
}

const AcademicLevelTable = ({ data, onRefresh }: AcademicLevelTableProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [selectedLevel, setSelectedLevel] = useState<IAcademicLevel | null>(null)

    const columns: ColumnDef<IAcademicLevel>[] = [
        {
            accessorKey: "image",
            header: "Icon",
            enableSorting: false,
            cell: ({ row }) => (
                <Avatar className="h-10 w-10 border shadow-sm">
                    <AvatarImage src={row.original.image} alt={row.original.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {row.original.name?.[0] || "?"}
                    </AvatarFallback>
                </Avatar>
            )
        },
        {
            accessorKey: "name",
            header: "Level Name",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-bold text-base">{row.original.name}</span>

                </div>
            )
        },
        {
            accessorKey: "classes",
            header: "Associated Classes",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.classes && row.original.classes.length > 0 ? (
                        row.original.classes.slice(0, 3).map((cls) => (
                            <Badge key={cls.id} variant="secondary" className="text-[10px] font-bold">
                                {cls.name}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-muted-foreground text-xs italic">No classes</span>
                    )}
                    {(row.original.classes?.length || 0) > 3 && (
                        <Badge variant="outline" className="text-[10px]">
                            +{(row.original.classes?.length || 0) - 3} more
                        </Badge>
                    )}
                </div>
            )
        },
        {
            accessorKey: "createdAt",
            header: "Created Date",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3 w-3" />
                    {row.original.createdAt ? format(new Date(row.original.createdAt), 'MMM dd, yyyy') : "N/A"}
                </div>
            )
        }
    ]

    const handleDelete = async () => {
        if (!selectedLevel) return
        try {
            await deleteAcademicLevel(selectedLevel.id)
            toast.success("Academic level deleted successfully")
            onRefresh()
        } catch (error: any) {
            toast.error(error?.message || "Failed to delete academic level")
        } finally {
            setIsDeleteDialogOpen(false)
            setSelectedLevel(null)
        }
    }

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={data}

                actions={{
                    onView: (item) => {
                        setSelectedLevel(item)
                        setIsViewDialogOpen(true)
                    },
                    onEdit: (item) => {
                        setSelectedLevel(item)
                        setIsUpdateDialogOpen(true)
                    },
                    onDelete: (item) => {
                        setSelectedLevel(item)
                        setIsDeleteDialogOpen(true)
                    }
                }}
            />

            {/* Modals triggered from state */}
            {selectedLevel && (
                <>
                    <UpdateAcademicLevelModal
                        open={isUpdateDialogOpen}
                        onOpenChange={setIsUpdateDialogOpen}
                        level={selectedLevel}
                        onSuccess={() => {
                            onRefresh()
                            setIsUpdateDialogOpen(false)
                        }}
                    />
                    <ViewAcademicLevelModal
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                        level={selectedLevel}
                    />
                </>
            )}

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-red-600">Permanently Delete Level?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base pt-2">
                            You are about to delete <span className="font-bold text-foreground">"{selectedLevel?.name}"</span>
                            and its associated class mappings. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 font-bold px-6">
                            Confirm Deletion
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AcademicLevelTable
