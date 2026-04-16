"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { IStudent } from '@/types/Dashboard/admin-dashboard-types/students-managements.types'
import { deleteStudent } from '@/services/admin-srever-action/students-managements.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Trash2, X, AlertTriangle, Fingerprint, ShieldAlert, Info } from 'lucide-react'
import Image from 'next/image'

interface DeleteStudentModalProps {
    student: IStudent | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const DeleteStudentModal = ({ student, isOpen, onOpenChange }: DeleteStudentModalProps) => {
    const queryClient = useQueryClient()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const mutation = useMutation({
        mutationFn: async () => {
            if (!student) throw new Error("No student selected for termination")
            return deleteStudent(student.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
            toast.success("Student record deactivated", {
                description: "The registry has been cleared successfully.",
                className: "bg-red-500 text-white border-none shadow-2xl",
            })
            onOpenChange(false)
            setIsConfirmOpen(false)
        },
        onError: (error: any) => {
            toast.error("Operation failed", {
                description: error.message || "An unexpected error occurred.",
            })
        }
    })

    if (!student) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* Modal Container: Full scrollable for small devices */}
            <DialogContent
                showCloseButton={false}
                className="max-w-[95vw] sm:max-w-2xl lg:max-w-4xl p-0 border-none shadow-2xl rounded-[1.5rem] sm:rounded-[2.5rem] bg-background focus-visible:ring-0 overflow-y-auto max-h-[95vh] custom-scrollbar"
            >
                {/* Accessibility: Screen reader titles */}
                <DialogHeader className="sr-only">
                    <DialogTitle>Student Deletion Protocol</DialogTitle>
                    <DialogDescription>Reviewing registry entries for permanent deactivation.</DialogDescription>
                </DialogHeader>

                {/* 1. Warning Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-600/95 to-red-500 px-6 py-10 sm:px-12">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/extreme-diagonal.png')] opacity-10" />

                    <div className="relative flex flex-col sm:flex-row items-center gap-6 z-10">
                        {/* Profile Image */}
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-2xl sm:rounded-[2rem] overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10 flex-shrink-0">
                            {student.profileImage ? (
                                <Image src={student.profileImage} alt={student.nameEn} fill className="object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                    <User className="h-10 w-10 text-white/50" />
                                </div>
                            )}
                        </div>

                        {/* Student Identity */}
                        <div className="flex-1 text-center sm:text-left text-white overflow-hidden min-w-0">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <AlertTriangle className="h-4 w-4 text-amber-300 animate-pulse" />
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-90">Student Deletion Protocol</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight truncate px-2 sm:px-0">
                                {student.nameEn}
                            </h2>
                            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest opacity-70 flex items-center justify-center sm:justify-start gap-2 mt-1">
                                <Fingerprint className="h-3 w-3" />
                                ID: {student.registrationId}
                            </p>
                        </div>
                    </div>

                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full bg-black/10 hover:bg-black/20 text-white z-50 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </div>

                {/* 2. Information Body */}
                <div className="p-6 sm:p-10 lg:p-12 space-y-8">
                    {/* Record Details Grid */}
                    <div className="p-6 sm:p-8 rounded-[1.5rem] bg-muted/30 border border-muted-foreground/10">
                        <div className="flex items-center gap-3 mb-6 text-primary">
                            <Info className="h-5 w-5" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Record Details</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <DetailItem label="Native Name" value={student.nameBn} />
                            <DetailItem label="Assigned Class" value={student.class?.name || 'Unassigned'} />
                            <DetailItem label="Email Reference" value={student.user.email} />
                            <DetailItem label="Enrollment Date" value={new Date(student.createdAt).toLocaleDateString()} />
                        </div>
                    </div>

                    {/* Security Alert */}
                    <div className="p-6 rounded-[1.5rem] bg-red-50 border border-red-100 flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-200">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="text-red-600 font-bold uppercase text-[10px] tracking-widest mb-1">Security Impact</h4>
                            <p className="text-xs text-red-700/80 font-medium leading-relaxed">
                                This action will deactivate the user account and clear all active portal sessions. This cannot be undone from the standard registry.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Integrated Action Footer */}
                <div className="p-6 bg-muted/20 border-t border-muted-foreground/5 gap-3 flex flex-col sm:flex-row sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto h-11 px-8 rounded-full font-bold uppercase tracking-widest text-[10px]"
                        >
                            Back to Registry
                        </Button>
                    </DialogClose>

                    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="w-full sm:w-auto h-11 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-red-500/20 transition-all active:scale-95"
                            >
                                <Trash2 className="h-3.5 w-3.5 mr-2" />
                                Initiate Deletion
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2.5rem] p-8 max-w-[400px]">
                            <AlertDialogHeader className="space-y-4">
                                <div className="h-16 w-16 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 mb-2">
                                    <AlertTriangle className="h-8 w-8" />
                                </div>
                                <AlertDialogTitle className="text-xl font-black uppercase tracking-tighter text-red-600">
                                    Confirm Termination?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-medium text-sm">
                                    You are about to deactivate <strong className="text-foreground">{student.nameEn}</strong>.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-8 gap-3 sm:gap-2">
                                <AlertDialogCancel asChild>
                                    <Button variant="ghost" className="rounded-full font-bold uppercase tracking-widest text-[10px] h-11">
                                        Abort
                                    </Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button
                                        className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[10px] h-11 px-8"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            mutation.mutate()
                                        }}
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending ? "Executing..." : "Confirm Purge"}
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Reusable Detail Item
const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm sm:text-base font-bold text-foreground/80 truncate">{value}</p>
    </div>
)

export default DeleteStudentModal