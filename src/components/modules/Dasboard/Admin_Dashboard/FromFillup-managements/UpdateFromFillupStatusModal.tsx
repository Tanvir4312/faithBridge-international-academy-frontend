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
    CheckCircle2, 
    AlertCircle, 
    FileText, 
    GraduationCap, 
    CreditCard,
    Loader2
} from "lucide-react"
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types'
import { updateFromFillupStatus } from '@/services/admin-srever-action/fromFillup-managements.service'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UpdateFromFillupStatusModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: IFromFillupData | null;
    onSuccess: () => void;
}

const UpdateFromFillupStatusModal = ({ open, onOpenChange, data, onSuccess }: UpdateFromFillupStatusModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!data) return null;

    const handleUpdateStatus = async (newStatus: string) => {
        setIsSubmitting(true)
        try {
            const res = await updateFromFillupStatus(data.id, newStatus)
            if (res.success) {
                toast.success(`Application ${newStatus.toLowerCase()} successfully`)
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(res.message || "Failed to update status")
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-3xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Status: {data.student.nameEn}</DialogTitle>
                    <DialogDescription>
                        Approve or modify the application status for this student.
                    </DialogDescription>
                </DialogHeader>

                {/* Compact Header */}
                <div className="bg-primary p-6 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <FileText className="h-24 w-24" />
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-white/20 shadow-lg">
                            <AvatarImage src={data.student.profileImage} />
                            <AvatarFallback className="bg-white text-primary font-bold">
                                {data.student.nameEn.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <h2 className="text-xl font-black tracking-tight text-white leading-tight">{data.student.nameEn}</h2>
                            <p className="text-sm font-bold opacity-80 text-white/80 leading-tight mt-1 text-left">Reg: {data.registrationNo}</p>
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
                                <CreditCard className="h-3 w-3" /> Payment
                            </p>
                            <Badge variant={data.paymentStatus === 'PAID' ? 'outline' : 'destructive'} 
                                   className={`font-black text-[10px] uppercase h-5 px-2 ${data.paymentStatus === 'PAID' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : ''}`}>
                                {data.paymentStatus}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 text-left">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-xs font-bold leading-relaxed text-left">
                                Approving this application will automatically generate an admit card and email it to the student.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={() => handleUpdateStatus('APPROVED')}
                            disabled={isSubmitting || data.status === 'APPROVED'}
                            className="h-12 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-lg shadow-emerald-600/20"
                        >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                            {data.status === 'APPROVED' ? 'ALREADY APPROVED' : 'APPROVE & SEND ADMIT CARD'}
                        </Button>
                        
                        <Button 
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                            className="h-12 rounded-2xl font-bold text-muted-foreground"
                        >
                            CANCEL
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateFromFillupStatusModal
