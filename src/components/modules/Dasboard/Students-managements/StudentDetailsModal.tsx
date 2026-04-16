"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IStudent } from '@/types/Dashboard/admin-dashboard-types/students-managements.types'
import { formatDate } from 'date-fns'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Droplets,
    Fingerprint,
    BookOpen,
    Users,
    ShieldCheck,
    Briefcase,
    Heart,
    GraduationCap,
    X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface StudentDetailsModalProps {
    student: IStudent | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const StudentDetailsModal = ({ student, isOpen, onOpenChange }: StudentDetailsModalProps) => {
    if (!student) return null

    const InfoSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 px-1 font-black">
                <div className="p-2.5 bg-primary/10 rounded-2xl text-primary flex-shrink-0">
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[12px] sm:text-sm font-black uppercase tracking-[0.4em] text-primary/70">{title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                {children}
            </div>
        </div>
    )

    const InfoItem = ({ label, value, icon: Icon, fullWidth = false, truncate = false }: { label: string, value: string | null | undefined, icon?: any, fullWidth?: boolean, truncate?: boolean }) => (
        <div className={`p-4 sm:p-5 rounded-[1.5rem] bg-muted/30 border border-muted transition-all hover:bg-muted/50 hover:border-primary/20 group ${fullWidth ? 'sm:col-span-2' : ''}`}>
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className="p-2.5 bg-background rounded-xl shadow-sm group-hover:text-primary transition-colors flex-shrink-0">
                        <Icon className="h-4 w-4" />
                    </div>
                )}
                <div className="flex flex-col min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1.5">{label}</span>
                    <span className={`text-xs sm:text-sm font-bold leading-tight text-foreground/90 ${truncate ? 'truncate block' : 'break-all'}`}>
                        {value || 'Not Provided'}
                    </span>
                </div>
            </div>
        </div>
    )

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95%] sm:w-[92%] lg:max-w-5xl rounded-[2.5rem] sm:rounded-[3.5rem] border-none shadow-2xl p-0 overflow-y-auto overflow-x-hidden bg-background max-h-[96vh] custom-scrollbar focus-visible:ring-0 mx-auto">
                <div className="relative font-inter">
                    {/* Accessibility Header */}
                    <div className="sr-only">
                        <DialogHeader>
                            <DialogTitle>Student Registry: {student.nameEn}</DialogTitle>
                            <DialogDescription>Full record for {student.registrationId}</DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Highly Responsive Fluid Hero */}
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 h-[480px] sm:h-[520px] lg:h-96 bg-gradient-to-br from-primary via-primary/95 to-primary/80 -z-10" />

                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                        <div className="pt-12 sm:pt-20 pb-16 px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center lg:items-end gap-8 sm:gap-14 text-white">
                            <div className="relative group flex-shrink-0">
                                <div className="absolute -inset-3 bg-white/20 rounded-full lg:rounded-[3.5rem] blur-md opacity-75 group-hover:opacity-100 transition duration-700" />
                                <div className="h-40 w-40 sm:h-48 lg:h-56 sm:w-48 lg:w-56 rounded-full lg:rounded-[3.2rem] overflow-hidden border-[6px] border-white shadow-2xl relative bg-white">
                                    {student.profileImage ? (
                                        <Image
                                            src={student.profileImage}
                                            alt={student.nameEn}
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-muted">
                                            <User className="h-20 sm:h-28 text-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 lg:-bottom-3 lg:-right-3 p-3 sm:p-4 bg-emerald-500 rounded-3xl border-4 border-white shadow-2xl">
                                    <ShieldCheck className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                                </div>
                            </div>

                            <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 min-w-0">
                                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-1">
                                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-xl px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase rounded-full shadow-lg">
                                        {student.user.role}
                                    </Badge>
                                    <Badge className="bg-emerald-500 text-white border-none px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase shadow-xl shadow-emerald-500/40 rounded-full">
                                        {student.user.status}
                                    </Badge>
                                </div>
                                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-widest sm:tracking-tighter leading-[1.1] sm:leading-[1] uppercase truncate min-w-0 drop-shadow-2xl">
                                    {student.nameEn}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-8 text-white/95">
                                    <div className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-3">
                                        <Mail className="h-4.5 w-4.5 sm:h-5 sm:w-5 opacity-80 flex-shrink-0" />
                                        <span className="truncate max-w-[200px] sm:max-w-none text-xs sm:text-sm md:text-base tracking-normal">{student.user.email}</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/30 hidden lg:block" />
                                    <div className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-3">
                                        <GraduationCap className="h-4.5 w-4.5 sm:h-5 sm:w-5 opacity-80 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm md:text-base tracking-normal">Batch {new Date(student.createdAt).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Precision Responsive Grid Body */}
                    <div className="px-4 sm:px-8 lg:px-20 py-10 sm:py-16 lg:py-20 space-y-12 sm:space-y-16 lg:space-y-24">

                        {/* Summary Identifiers */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                            <div className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] bg-primary text-white shadow-2xl shadow-primary/30 flex flex-col justify-center relative overflow-hidden group min-h-[140px] sm:min-h-[170px]">
                                <Fingerprint className="absolute -right-6 -top-6 h-36 w-36 opacity-10 group-hover:scale-125 transition-transform duration-1000" />
                                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Registration ID</span>
                                <p className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-black font-mono tracking-tighter">{student.registrationId}</p>
                            </div>
                            <div className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] bg-muted/40 border border-muted-foreground/10 flex flex-col justify-center min-h-[140px] sm:min-h-[170px]">
                                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Academic Class</span>
                                <p className="text-xl sm:text-2xl md:text-lg lg:text-2xl font-black uppercase text-foreground/90">{student.class?.name || 'Unassigned'}</p>
                            </div>
                            <div className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] bg-muted/40 border border-muted-foreground/10 flex flex-col justify-center min-h-[140px] sm:min-h-[170px]">
                                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Roll Number</span>
                                <p className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl font-black text-primary leading-none tracking-tighter">#{student.classRoll}</p>
                            </div>
                        </div>

                        <Separator className="bg-muted-foreground/5 h-[1.5px]" />

                        {/* Professional Information Sections */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24">

                            {/* Personal & Character Cluster */}
                            <div className="space-y-16 lg:space-y-20">
                                <InfoSection title="Personal Profile" icon={User}>
                                    <InfoItem label="Full Name (EN)" value={student.nameEn} />
                                    <InfoItem label="Native Name (BN)" value={student.nameBn} />
                                    <InfoItem label="Date of Birth" value={student.dob ? formatDate(new Date(student.dob), "MMMM d, yyyy") : 'Not Provided'} icon={Calendar} />
                                    <InfoItem label="Gender" value={student.gender} icon={Users} />
                                    <InfoItem label="Blood Type" value={student.bloodGroup} icon={Droplets} />
                                    <InfoItem label="Nationality" value={student.nationality || 'Bangladeshi'} icon={ShieldCheck} />
                                </InfoSection>

                                <InfoSection title="Parental Guardians" icon={Users}>
                                    <InfoItem label="Father's Legal Name" value={student.fatherName} icon={Briefcase} />
                                    <InfoItem label="Mother's Legal Name" value={student.motherName} icon={Heart} />
                                </InfoSection>
                            </div>

                            {/* Communication & Global Context Cluster */}
                            <div className="space-y-16 lg:space-y-20">
                                <InfoSection title="Communication" icon={Phone}>
                                    <InfoItem label="Guardian Hotline" value={student.guardianMobile} icon={Phone} />
                                    <InfoItem label="Student Personal No" value={student.studentMobile || 'N/A'} icon={Phone} />
                                    <InfoItem label="Residential Address" value={student.presentAddress} icon={MapPin} fullWidth />
                                    <InfoItem label="Permanent Home" value={student.permanentAddress} icon={MapPin} fullWidth />
                                </InfoSection>

                                <InfoSection title="Registry Data" icon={GraduationCap}>
                                    <InfoItem label="Application ID" value={student.applicationId} icon={Fingerprint} truncate />
                                    <InfoItem label="Level of Study" value={student.class?.academicLevel?.name || 'Academic'} icon={BookOpen} />
                                </InfoSection>
                            </div>
                        </div>

                        {/* Highly Responsive Verification Segment */}
                        <div className="p-6 sm:p-10 lg:p-14 rounded-[3rem] sm:rounded-[4.5rem] bg-emerald-50/50 border border-emerald-100 flex flex-col lg:flex-row items-center lg:justify-between gap-8 sm:gap-12 group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
                            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left relative z-10 min-w-0 flex-1">
                                <div className="p-5 bg-white rounded-[2rem] shadow-xl shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-700">
                                    <ShieldCheck className="h-10 w-10 sm:h-12 w-12 text-emerald-600" />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <p className="text-base sm:text-xl md:text-2xl font-black text-emerald-900 uppercase tracking-[0.3em] sm:tracking-[0.4em] leading-tight">Official Verification</p>
                                    <p className="text-[10px] sm:text-sm font-bold text-emerald-600/70 uppercase">
                                        Registry Entry: {formatDate(new Date(student.createdAt), "MMMM d, yyyy")}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-auto relative z-10">
                                <Badge className="w-full lg:w-auto bg-emerald-600 text-white font-black px-8 sm:px-12 py-3.5 sm:py-5 rounded-full uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-2xl shadow-emerald-600/40 text-[10px] sm:text-xs md:text-sm border-none justify-center whitespace-nowrap">
                                    Authenticated Record
                                </Badge>
                            </div>
                        </div>

                        <div className="h-10 sm:h-20" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default StudentDetailsModal
