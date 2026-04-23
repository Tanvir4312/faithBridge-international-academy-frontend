"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Clock, Users, } from "lucide-react"
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements'
import { format } from 'date-fns'


interface ViewExamsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    exam: IExamsData | null;
}

const ViewExamsModal = ({ open, onOpenChange, exam }: ViewExamsModalProps) => {
    if (!exam) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl flex flex-col bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Exam Details: {exam.name}</DialogTitle>
                    <DialogDescription>
                        Full view of exam settings and registered student profiles.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {/* Hero Banner Section */}
                    <div className="bg-primary p-10 md:p-14 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <ClipboardList className="h-48 w-48" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <div className="space-y-4 max-w-2xl text-left">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="font-black uppercase tracking-[0.1em] bg-white/20 text-white border-none px-4 py-1 text-[11px]">
                                        {exam.year} Session
                                    </Badge>
                                    <Badge variant="outline" className="font-black uppercase tracking-[0.1em] text-white border-white/30 px-4 py-1 text-[11px]">
                                        Official Examination
                                    </Badge>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-sm">{exam.name}</h2>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 shadow-2xl min-w-[200px] text-center">
                                <p className="text-[10px] font-black opacity-70 uppercase tracking-[0.3em] mb-2 text-white">Total Candidates</p>
                                <p className="text-5xl font-black tabular-nums text-white">{exam.formFillups?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Full Width */}
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Timeline & Summary Combined in Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Opening Date */}
                            <div className="p-6 rounded-[2.5rem] bg-muted/30 border border-muted shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Opening Date</p>
                                        <p className="text-xl font-black mt-1">{format(new Date(exam.formFillupStart), 'MMM dd, yyyy')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="p-6 rounded-[2.5rem] bg-destructive/5 border border-destructive/10 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-destructive uppercase tracking-widest leading-none">Registration Deadline</p>
                                        <p className="text-xl font-black mt-1">{format(new Date(exam.formFillupEnd), 'MMM dd, yyyy')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats Summary */}
                            <div className="p-6 rounded-[2.5rem] bg-background border shadow-xl flex items-center justify-around">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Paid</p>
                                    <p className="text-2xl font-black text-emerald-600">
                                        {exam.formFillups?.filter(f => f.paymentStatus === 'PAID')?.length || 0}
                                    </p>
                                </div>
                                <div className="h-8 w-[1px] bg-muted" />
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Pending</p>
                                    <p className="text-2xl font-black text-amber-600">
                                        {exam.formFillups?.filter(f => f.paymentStatus !== 'PAID')?.length || 0}
                                    </p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default ViewExamsModal
