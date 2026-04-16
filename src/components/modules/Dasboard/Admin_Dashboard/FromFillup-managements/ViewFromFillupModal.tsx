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
import { 
    User, 
    CreditCard, 
    Phone, 
    Calendar, 
    MapPin, 
    Home, 
    GraduationCap, 
    ClipboardCheck, 
    FileText, 
    Heart, 
    Users, 
    Smartphone,
    Download
} from "lucide-react"
import { IFromFillupData } from '@/types/Dashboard/admin-dashboard-types/fromFillup-managements.types'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface ViewFromFillupModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: IFromFillupData | null;
}

const ViewFromFillupModal = ({ open, onOpenChange, data }: ViewFromFillupModalProps) => {
    if (!data) return null;

    const { student, exam, class: cls } = data;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[850px] max-h-[92vh] p-0 overflow-hidden border-none shadow-2xl flex flex-col bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Form Fillup Details: {student.nameEn}</DialogTitle>
                    <DialogDescription>
                        Complete application and student profile for {exam.name}.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {/* Header Section */}
                    <div className="bg-primary p-10 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <FileText className="h-48 w-48" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                            <Avatar className="h-32 w-32 border-8 border-white/20 shadow-2xl ring-4 ring-primary-foreground/10">
                                <AvatarImage src={student.profileImage} />
                                <AvatarFallback className="bg-white text-primary font-black text-4xl">
                                    {student.nameEn.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-4">
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <Badge variant="secondary" className="font-black bg-white/20 text-white border-none px-4 py-1 text-[10px] tracking-[0.1em] uppercase">
                                        Application ID: {student.applicationId?.slice(0, 8)}
                                    </Badge>
                                    <Badge variant={data.paymentStatus === 'PAID' ? 'secondary' : 'destructive'} 
                                           className={`font-black tracking-[0.1em] uppercase px-4 py-1 text-[10px] border-none ${data.paymentStatus === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 ' : ''}`}>
                                        {data.paymentStatus}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-4xl font-black tracking-tighter text-white">{student.nameEn}</h2>
                                    <p className="text-xl font-bold opacity-80 text-white/90">{student.nameBn}</p>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-white/70">
                                        <GraduationCap className="h-4 w-4" />
                                        Class {cls.name}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-white/70">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                        Roll: {data.classRoll}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        {/* Status Bar */}
                        <div className="md:col-span-12 p-6 bg-muted/30 border-b flex flex-col md:flex-row justify-between items-center gap-6 px-10">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${data.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    <ClipboardCheck className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1 text-left">Current Status</p>
                                    <p className="text-xl font-black uppercase tracking-tight leading-none text-left">{data.status}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4">
                                {data.admitCard && (
                                    <Button asChild variant="outline" className="rounded-full font-black text-xs gap-2 border-primary/20 hover:bg-primary/5 h-11 px-6">
                                        <a href={data.admitCard} target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                            Download Admit Card
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* General Information */}
                        <div className="md:col-span-8 p-10 space-y-10 border-r text-left">
                            <section className="space-y-6 text-left">
                                <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                                    <User className="h-4 w-4" />
                                    Student Profile Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                                    <InfoItem icon={<Calendar />} label="Date of Birth" value={student.dob ? format(new Date(student.dob), 'MMMM dd, yyyy') : 'N/A'} />
                                    <InfoItem icon={<CreditCard />} label="Birth Cert. No" value={student.birthCertificateNo || 'N/A'} />
                                    <InfoItem icon={<Users />} label="Gender" value={student.gender} className="capitalize" />
                                    <InfoItem icon={<Heart />} label="Blood Group" value={student.bloodGroup} className="text-red-600 font-black" />
                                    <InfoItem icon={<Users />} label="Religion" value={student.religion} />
                                    <InfoItem icon={<Smartphone />} label="Student Mobile" value={student.studentMobile || 'N/A'} />
                                </div>
                            </section>

                            <section className="space-y-6 pt-6 border-t border-dashed text-left">
                                <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Users className="h-4 w-4" />
                                    Guardian Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                                    <InfoItem icon={<User />} label="Father's Name" value={student.fatherName} />
                                    <InfoItem icon={<User />} label="Mother's Name" value={student.motherName} />
                                    <InfoItem icon={<Phone />} label="Guardian Mobile" value={student.guardianMobile} />
                                </div>
                            </section>

                            <section className="space-y-6 pt-6 border-t border-dashed text-left">
                                <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                                    <MapPin className="h-4 w-4" />
                                    Address Information
                                </h3>
                                <div className="space-y-6 text-left">
                                    <div className="space-y-2 text-left">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 tracking-widest text-left">Present Address</p>
                                        <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 flex gap-3 text-left">
                                            <Home className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                            <p className="text-sm font-semibold text-foreground/80 leading-relaxed text-left">{student.presentAddress}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 tracking-widest text-left">Permanent Address</p>
                                        <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 flex gap-3 text-left">
                                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                            <p className="text-sm font-semibold text-foreground/80 leading-relaxed text-left">{student.permanentAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar: Application Details */}
                        <div className="md:col-span-4 p-10 bg-muted/10 space-y-10 text-left">
                            <section className="space-y-6 text-left">
                                <h3 className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                    <ClipboardCheck className="h-4 w-4" />
                                    Application
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-[2rem] bg-background border shadow-sm ring-1 ring-primary/5 text-left">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 text-left">Examination</p>
                                        <p className="text-lg font-black text-foreground leading-tight text-left">{exam.name}</p>
                                        <p className="text-xs font-bold text-muted-foreground mt-1 text-left">{exam.year} Cycle</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-background border shadow-sm ring-1 ring-primary/5 text-left">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 text-left">Registration No</p>
                                        <p className="text-2xl font-black text-primary tabular-nums text-left">{data.registrationNo}</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-background border shadow-sm ring-1 ring-primary/5 text-left">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 text-left">Submission Date</p>
                                        <p className="text-sm font-bold text-left">{format(new Date(data.createdAt), 'MMM dd, yyyy')}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-tighter text-left">at {format(new Date(data.createdAt), 'hh:mm a')}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const InfoItem = ({ icon, label, value, className }: { icon: React.ReactNode, label: string, value?: string | null, className?: string }) => (
    <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-2 opacity-60">
            <div className="text-primary [&_svg]:h-3.5 [&_svg]:w-3.5">
                {icon}
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {label}
            </p>
        </div>
        <p className={`font-bold text-foreground/90 text-sm ${className} text-left`}>
            {value || 'Not Disclosed'}
        </p>
    </div>
)

export default ViewFromFillupModal
