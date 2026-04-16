"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Trash2,
    AlertTriangle,
    FileText,
    GraduationCap,
    CreditCard,
    XCircle
} from "lucide-react"
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types'
import { deleteFromFillup } from '@/services/admin-srever-action/fromFillup-managements.service'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

interface DeleteFromFillupModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: IFromFillupData | null;
    onSuccess: () => void;
}

const DeleteFromFillupModal = ({ open, onOpenChange, data, onSuccess }: DeleteFromFillupModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    if (!data) return null;

    const handleDelete = async () => {
        setIsSubmitting(true)
        try {
            const res = await deleteFromFillup(data.id)
            if (res.success) {
                toast.success("Application deleted successfully")
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(res.message || "Failed to delete application")
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
            setShowConfirm(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-[98vw] sm:max-w-[500px] h-auto max-h-[92vh] sm:max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-[2.5rem] sm:rounded-3xl flex flex-col">
                    <DialogHeader className="sr-only">
                        <DialogTitle>View Details for Deletion: {data.student.nameEn}</DialogTitle>
                        <DialogDescription>
                            Review the application details before proceeding with deletion.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {/* Status Header - Danger Mode */}
                        <div className="bg-destructive/10 p-6 sm:p-8 relative overflow-hidden text-destructive">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Trash2 className="h-20 sm:h-24 w-20 sm:w-24" />
                            </div>
                            <div className="relative z-10 flex items-center gap-4">
                                <Avatar className="h-14 sm:h-16 w-14 sm:w-16 border-2 border-destructive/20 shadow-lg">
                                    <AvatarImage src={data.student.profileImage} />
                                    <AvatarFallback className="bg-destructive text-white font-bold">
                                        {data.student.nameEn.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight">{data.student.nameEn}</h2>
                                    <p className="text-[10px] sm:text-sm font-bold opacity-80 leading-tight mt-1 text-left uppercase">Reg: {data.registrationNo}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                            {/* Summary Info */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1 text-left">
                                    <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 text-left">
                                        <GraduationCap className="h-3 w-3" /> Class
                                    </p>
                                    <p className="font-bold text-foreground text-xs sm:text-base text-left">{data.class.name}</p>
                                </div>
                                <div className="p-3 sm:p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1 text-left">
                                    <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 text-left">
                                        <CreditCard className="h-3 w-3" /> Status
                                    </p>
                                    <Badge variant="outline"
                                        className="font-black text-[8px] sm:text-[10px] uppercase h-5 px-2 text-amber-600 border-amber-200 bg-amber-50">
                                        {data.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-xl sm:rounded-2xl bg-red-50 border border-red-100 text-red-700 text-left">
                                    <AlertTriangle className="h-4 sm:h-5 w-4 sm:w-5 shrink-0 mt-0.5" />
                                    <p className="text-[10px] sm:text-xs font-bold leading-relaxed text-left">
                                        Warning: This application will be permanently removed. ONLY "PENDING" applications can be deleted.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons Stacking for Mobile */}
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <Button
                                    onClick={() => setShowConfirm(true)}
                                    disabled={isSubmitting || data.status !== 'PENDING'}
                                    className="w-full h-12 rounded-xl sm:rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-600/20 text-xs sm:text-sm"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    DELETE APPLICATION
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSubmitting}
                                    className="w-full h-12 rounded-xl sm:rounded-2xl font-bold text-muted-foreground text-xs sm:text-sm"
                                >
                                    CANCEL & CLOSE
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog - Responsive */}
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent className="w-[95vw] sm:max-w-[450px] rounded-[2rem] sm:rounded-3xl border-none shadow-2xl p-6 sm:p-8">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="h-16 sm:h-20 w-16 sm:w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="h-10 sm:h-12 w-10 sm:w-12 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-xl sm:text-2xl font-black tracking-tight uppercase">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs sm:text-base font-medium opacity-80">
                            You are about to permanently delete the application for <span className="font-bold text-foreground text-destructive">{data.student.nameEn}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-6">
                        <AlertDialogCancel className="w-full sm:flex-1 h-12 rounded-xl sm:rounded-2xl border-muted-foreground/20 font-bold text-xs sm:text-sm order-2 sm:order-1">
                            No, Keep It
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="w-full sm:flex-1 h-12 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black border-none text-xs sm:text-sm order-1 sm:order-2"
                        >
                            Yes, Delete It
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteFromFillupModal
