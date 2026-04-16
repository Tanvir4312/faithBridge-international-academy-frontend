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
import { Calendar, User, ClipboardList, Clock, CreditCard, Phone, Mail, MapPin, Briefcase, CheckCircle2 } from "lucide-react"
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ViewExamsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    exam: IExamsData | null;
}

const ViewExamsModal = ({ open, onOpenChange, exam }: ViewExamsModalProps) => {
    if (!exam) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[950px] max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl flex flex-col bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Exam Details: {exam.name}</DialogTitle>
                    <DialogDescription>
                        Full view of exam settings and registered student profiles.
                    </DialogDescription>
                </DialogHeader>

                {/* Using a standard div for guaranteed scrolling behavior */}
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
                                    {exam.isDeleted && (
                                        <Badge variant="destructive" className="font-black px-4 py-1 shadow-lg ring-2 ring-white/10">ARCHIVED</Badge>
                                    )}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-sm">{exam.name}</h2>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 shadow-2xl min-w-[200px] text-center">
                                <p className="text-[10px] font-black opacity-70 uppercase tracking-[0.3em] mb-2 text-white">Total Candidates</p>
                                <p className="text-5xl font-black tabular-nums text-white">{exam.formFillups?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-full">
                        {/* Sidebar: Details & Settings */}
                        <div className="md:col-span-4 p-8 md:p-10 bg-muted/20 border-r space-y-12">
                            <section className="space-y-6">
                                <h3 className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                    <div className="h-1 w-4 rounded-full bg-primary" />
                                    Timeline
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-5 rounded-3xl bg-background border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-primary/5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Opening Date</p>
                                        </div>
                                        <p className="text-lg font-black text-foreground leading-none">
                                            {format(new Date(exam.formFillupStart), 'MMM dd, yyyy')}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-bold mt-2 uppercase opacity-60">
                                            {format(new Date(exam.formFillupStart), 'hh:mm a')}
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-3xl bg-background border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-destructive/5">
                                        <div className="flex items-center gap-3 mb-3 text-destructive">
                                            <div className="p-2 rounded-xl bg-destructive/10">
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">Deadline</p>
                                        </div>
                                        <p className="text-lg font-black text-foreground leading-none">
                                            {format(new Date(exam.formFillupEnd), 'MMM dd, yyyy')}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-bold mt-2 uppercase opacity-60">
                                            {format(new Date(exam.formFillupEnd), 'hh:mm a')}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                    <div className="h-1 w-4 rounded-full bg-primary" />
                                    Quick Stats
                                </h3>
                                <div className="grid gap-4 bg-background p-6 rounded-[2rem] border shadow-inner">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-muted-foreground font-bold group-hover:text-primary transition-colors">Registered</span>
                                        <span className="text-sm font-black">{exam.formFillups?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-muted-foreground font-bold group-hover:text-emerald-600 transition-colors">Paid</span>
                                        <span className="text-sm font-black text-emerald-600">
                                            {exam.formFillups?.filter(f => f.paymentStatus === 'PAID').length || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-muted-foreground font-bold group-hover:text-amber-600 transition-colors">Pending</span>
                                        <span className="text-sm font-black text-amber-600">
                                            {exam.formFillups?.filter(f => f.paymentStatus !== 'PAID').length || 0}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Main Hub: Student Profiles */}
                        <div className="md:col-span-8 p-8 md:p-12 space-y-10 bg-background min-h-[400px]">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 text-left">
                                    <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
                                        <User className="h-6 w-6 text-primary" />
                                        Candidate Roster
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-50">Detailed Student profiles for this session</p>
                                </div>
                                <Badge variant="secondary" className="px-4 py-1.5 font-black text-[10px] uppercase rounded-full border shadow-sm">
                                    LIVE FEED
                                </Badge>
                            </div>

                            {exam.formFillups && exam.formFillups.length > 0 ? (
                                <div className="grid gap-6">
                                    {exam.formFillups.map((fillup) => (
                                        <div key={fillup.id} className="group relative p-6 rounded-[2.5rem] border bg-card hover:bg-muted/10 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-left">
                                            <div className="relative">
                                                <Avatar className="h-24 w-24 border-8 border-background shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out z-10">
                                                    <AvatarImage src={fillup.student.profileImage} />
                                                    <AvatarFallback className="bg-primary text-white font-black text-3xl">
                                                        {fillup.student.nameEn.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg z-20 group-hover:rotate-12 transition-transform">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 space-y-4 w-full">
                                                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                                                    <div className="space-y-1 text-center sm:text-left w-full">
                                                        <h4 className="font-black text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">{fillup.student.nameEn}</h4>
                                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
                                                            <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 tracking-wider">REG: {fillup.student.registrationId}</span>
                                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-black uppercase tracking-widest">
                                                                <CreditCard className="h-3.5 w-3.5" /> Roll {fillup.classRoll}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                                                        <Badge variant={fillup.paymentStatus === 'PAID' ? 'outline' : 'destructive'} 
                                                               className={`text-[11px] font-black h-7 px-4 rounded-full border-2 transition-all ${fillup.paymentStatus === 'PAID' ? 'text-emerald-700 border-emerald-200 bg-emerald-50 shadow-sm shadow-emerald-100' : 'animate-pulse'}`}>
                                                            {fillup.paymentStatus}
                                                        </Badge>
                                                        <Badge variant="secondary" className="text-[10px] font-black h-6 px-3 bg-muted/80 tracking-widest">
                                                            {fillup.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-6 pt-4 border-t border-dashed mt-4">
                                                    {fillup.student.studentMobile && (
                                                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/80 hover:text-primary transition-colors">
                                                            <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                                                <Phone className="h-3.5 w-3.5" />
                                                            </div>
                                                            {fillup.student.studentMobile}
                                                        </div>
                                                    )}
                                                    {fillup.student.gender && (
                                                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/80 uppercase tracking-tighter">
                                                            <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                                                <User className="h-3.5 w-3.5" />
                                                            </div>
                                                            {fillup.student.gender}
                                                        </div>
                                                    )}
                                                    {fillup.student.bloodGroup && (
                                                        <div className="flex items-center gap-2 text-xs font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                                            {fillup.student.bloodGroup}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 border-4 border-dashed rounded-[3rem] bg-muted/10">
                                    <div className="p-8 rounded-full bg-background shadow-2xl relative">
                                        <Briefcase className="h-16 w-16 opacity-5" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <User className="h-8 w-8 opacity-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 px-8">
                                        <p className="text-2xl font-black text-foreground/40 tracking-tight">Vortex of Silence</p>
                                        <p className="text-sm font-medium text-muted-foreground/40 max-w-sm">No candidates detected yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewExamsModal
