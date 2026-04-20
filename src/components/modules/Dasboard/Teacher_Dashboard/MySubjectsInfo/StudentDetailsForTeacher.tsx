"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BadgeCheck,
    Fingerprint,
    Heart,
    HandIcon,
    Dna,
    Shield,
    Layers,
    GraduationCap
} from "lucide-react"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface StudentDetailsForTeacherProps {
    student: any | null
    classData: any | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const StudentDetailsForTeacher = ({ student, classData, isOpen, onOpenChange }: StudentDetailsForTeacherProps) => {

    if (!student) return null

    const formattedDob = student.dob
        ? format(new Date(student.dob), "MMMM d, yyyy")
        : "N/A"

    const InfoCard = ({ icon: Icon, label, value, colorClass = "text-primary" }: any) => (
        <div className="bg-muted/30 p-4 rounded-2xl border border-muted-foreground/10 hover:border-primary/20 transition-all flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <Icon size={14} className={colorClass} />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
            </div>
            <p className="text-sm font-bold truncate">{value || "N/A"}</p>
        </div>
    )

    const SectionHeader = ({ icon: Icon, title }: any) => (
        <div className="flex items-center gap-3 px-1 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
                <Icon size={18} className="text-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">{title}</h3>
            <div className="flex-1 h-[1px] bg-muted-foreground/10" />
        </div>
    )

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 border-none rounded-[2rem] md:rounded-[3rem] shadow-2xl bg-background focus-visible:outline-none overflow-y-auto max-h-[90vh] custom-scrollbar">

                <DialogHeader className="sr-only">
                    <DialogTitle>Student Details - {student.nameEn}</DialogTitle>
                    <DialogDescription>
                        Complete profile information for student {student.nameEn} with registration ID {student.registrationId}.
                    </DialogDescription>
                </DialogHeader>

                {/* HERO HEADER */}
                <div className="relative overflow-hidden px-6 md:px-12 pt-12 pb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800" />
                    <div className="absolute inset-0 bg-[url('/circuit-board.png')] opacity-10" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative flex flex-col md:flex-row items-center gap-8 text-white">
                        <div className="relative group overflow-visible">
                            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white/20 shadow-2xl rounded-[2.5rem]">
                                <AvatarImage src={student.profileImage} className="object-cover" />
                                <AvatarFallback className="text-4xl font-black bg-white/10">{student.nameEn.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -bottom-2 -right-2 bg-white text-indigo-700 hover:bg-white px-4 py-1.5 rounded-full font-black text-[10px] shadow-xl border-none">
                                ROLL {student.classRoll}
                            </Badge>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{student.nameEn}</h2>
                                <Badge variant="outline" className="border-white/30 text-white/90 bg-white/5 uppercase text-[10px] tracking-widest font-bold">
                                    {student.gender}
                                </Badge>
                            </div>
                            <p className="text-lg font-medium text-white/70 italic">{student.nameBn}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10">
                                    <Fingerprint size={14} className="text-white/60" />
                                    REG: {student.registrationId}
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10">
                                    <Heart size={14} className="text-red-400" />
                                    BLOOD: {student.bloodGroup}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-6 md:p-12 space-y-12">

                    {/* BIOMETRIC & BIO DATA */}
                    <div className="space-y-6">
                        <SectionHeader icon={BadgeCheck} title="Academic Identity" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoCard icon={Fingerprint} label="Registration ID" value={student.registrationId} />
                            <InfoCard icon={Shield} label="Application ID" value={student.applicationId?.slice(0, 13) + "..."} />
                            <InfoCard icon={Calendar} label="Date of Birth" value={formattedDob} />

                            <InfoCard icon={GraduationCap} label="Assigned Class" value={classData?.name || "Active Session"} />
                            <InfoCard icon={Dna} label="Religion" value={student.religion} />
                        </div>
                    </div>

                    {/* GUARDIAN INFO */}
                    <div className="space-y-6">
                        <SectionHeader icon={HandIcon} title="Family Verification" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-muted/20 p-6 rounded-3xl border space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">F</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Father's Name</p>
                                        <p className="font-bold text-lg">{student.fatherName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted/20 p-6 rounded-3xl border space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold">M</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Mother's Name</p>
                                        <p className="font-bold text-lg">{student.motherName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <InfoCard icon={Phone} label="Guardian Contact" value={student.guardianMobile} colorClass="text-green-500" />
                            <InfoCard icon={Phone} label="Student Contact" value={student.studentMobile || "Unlisted"} colorClass="text-indigo-500" />
                            <InfoCard icon={BadgeCheck} label="B.C. NO" value={student.birthCertificateNo} colorClass="text-orange-500" />

                        </div>
                    </div>

                    {/* ADDRESSES */}
                    <div className="space-y-6">
                        <SectionHeader icon={MapPin} title="Geospatial Data" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">Present Residence</p>
                                <div className="bg-muted/30 p-5 rounded-3xl border border-dashed text-sm font-medium leading-relaxed italic">
                                    {student.presentAddress}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">Permanent Domicile</p>
                                <div className="bg-muted/30 p-5 rounded-3xl border border-dashed text-sm font-medium leading-relaxed italic">
                                    {student.permanentAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="shrink-0 p-8 border-t bg-muted/20 flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Teacher Observation Node • Session 2026</p>
                    <Badge variant="secondary" className="px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">Active File</Badge>
                </div>
            </DialogContent>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </Dialog>
    )
}

export default StudentDetailsForTeacher
