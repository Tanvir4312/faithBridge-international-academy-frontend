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
    Loader2,
    XCircle
} from "lucide-react"
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types'
import { FromFillupStatus } from '@/types/Dashboard/shared_Enums/enums'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
    const [selectedStatus, setSelectedStatus] = useState<string>(data?.status || FromFillupStatus.PENDING)

    // Reset selected status when data changes or modal opens
    React.useEffect(() => {
        if (data) {
            setSelectedStatus(data.status);
        }
    }, [data, open]);

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
            <DialogContent className="w-[98vw] sm:max-w-[500px] h-auto max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-[2.5rem] sm:rounded-3xl flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Status: {data.student.nameEn}</DialogTitle>
                    <DialogDescription>
                        Approve or modify the application status for this student.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Compact Header */}
                    <div className="bg-primary p-6 sm:p-8 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <FileText className="h-20 sm:h-24 w-20 sm:w-24" />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <Avatar className="h-14 sm:h-16 w-14 sm:w-16 border-2 border-white/20 shadow-lg">
                                <AvatarImage src={data.student.profileImage} />
                                <AvatarFallback className="bg-white text-primary font-bold">
                                    {data.student.nameEn.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">{data.student.nameEn}</h2>
                                <p className="text-[10px] sm:text-sm font-bold opacity-80 text-white/80 leading-tight mt-1 text-left">Reg: {data.registrationNo}</p>
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
                                    <CreditCard className="h-3 w-3" /> Payment
                                </p>
                                <Badge variant={data.paymentStatus === 'PAID' ? 'outline' : 'destructive'}
                                    className={`font-black text-[8px] sm:text-[10px] uppercase h-5 px-2 ${data.paymentStatus === 'PAID' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : ''}`}>
                                    {data.paymentStatus}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 text-left">
                                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 shrink-0 mt-0.5" />
                                <p className="text-[10px] sm:text-xs font-bold leading-relaxed text-left">
                                    Approving this application will automatically generate an admit card and email it to the student.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest text-left block px-1">
                                    Change Status To
                                </label>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={setSelectedStatus}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger className="w-full h-12 rounded-xl sm:rounded-2xl border-muted-foreground/20 bg-muted/20 font-bold focus:ring-primary/20">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-muted-foreground/20 shadow-xl">
                                        <SelectItem value={FromFillupStatus.APPROVED} className="font-bold text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 rounded-xl m-1">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4" /> APPROVED
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={FromFillupStatus.REJECTED} className="font-bold text-destructive focus:bg-destructive/5 focus:text-destructive rounded-xl m-1">
                                            <div className="flex items-center gap-2">
                                                <XCircle className="h-4 w-4" /> REJECTED
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                onClick={() => handleUpdateStatus(selectedStatus)}
                                disabled={isSubmitting || selectedStatus === data.status}
                                className={`w-full h-12 rounded-xl sm:rounded-2xl font-black text-white gap-2 shadow-lg transition-all active:scale-[0.98] text-xs sm:text-sm ${selectedStatus === FromFillupStatus.APPROVED
                                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                                    : 'bg-destructive hover:bg-destructive/90 shadow-destructive/20'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : selectedStatus === FromFillupStatus.APPROVED ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    <XCircle className="h-4 w-4" />
                                )}
                                {selectedStatus === data.status ? 'NO CHANGES' : `CONFIRM ${selectedStatus}`}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                                className="w-full h-10 rounded-xl sm:rounded-2xl font-bold text-muted-foreground hover:bg-muted/50 text-[10px] sm:text-xs"
                            >
                                DISCARD CHANGES
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateFromFillupStatusModal
