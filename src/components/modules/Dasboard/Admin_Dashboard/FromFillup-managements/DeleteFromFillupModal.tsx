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
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-3xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>View Details for Deletion: {data.student.nameEn}</DialogTitle>
                        <DialogDescription>
                            Review the application details before proceeding with deletion.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Compact Header */}
                    <div className="bg-destructive/10 p-6 relative overflow-hidden text-destructive">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Trash2 className="h-24 w-24" />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-destructive/20 shadow-lg">
                                <AvatarImage src={data.student.profileImage} />
                                <AvatarFallback className="bg-destructive text-white font-bold">
                                    {data.student.nameEn.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <h2 className="text-xl font-black tracking-tight leading-tight">{data.student.nameEn}</h2>
                                <p className="text-sm font-bold opacity-80 leading-tight mt-1 text-left">Reg: {data.registrationNo}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Summary Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1 text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 text-left">
                                    <GraduationCap className="h-3 w-3" /> Class
                                </p>
                                <p className="font-bold text-foreground text-left">{data.class.name}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1 text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 text-left">
                                    <CreditCard className="h-3 w-3" /> Status
                                </p>
                                <Badge variant="outline"
                                    className="font-black text-[10px] uppercase h-5 px-2 text-amber-600 border-amber-200 bg-amber-50">
                                    {data.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-left">
                                <AlertTriangle className="h-5 w-5 shrink-0" />
                                <p className="text-xs font-bold leading-relaxed text-left">
                                    Warning: Deleting this application is permanent. You can only delete applications that are in PENDING status.
                                </p>
                            </div>
                        </div>

                        {/* Red Delete Button with White Text */}
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => setShowConfirm(true)}
                                disabled={isSubmitting || data.status !== 'PENDING'}
                                className="h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-600/20"
                            >
                                <Trash2 className="h-4 w-4" />
                                DELETE APPLICATION
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                                className="h-12 rounded-2xl font-bold text-muted-foreground"
                            >
                                CANCEL & GO BACK
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="h-12 w-12 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-black tracking-tight">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base font-medium">
                            This will permanently delete the application for <span className="font-bold text-foreground">{data.student.nameEn}</span>. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-3 mt-4">
                        <AlertDialogCancel className="h-12 rounded-2xl border-muted-foreground/20 font-bold px-8">
                            No, Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black px-8 border-none"
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
