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
import { BookOpen, User, Phone, ShieldCheck, Hash, Layers, GraduationCap } from "lucide-react"
import { ISubject } from "@/types/Dashboard/admin-dashboard-types/subject-managements.types"

interface ViewSubjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    subject: ISubject | null;
}

const ViewSubjectModal = ({ open, onOpenChange, subject }: ViewSubjectModalProps) => {
    if (!subject) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[98vw] sm:max-w-[700px] max-h-[92vh] p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] sm:rounded-3xl bg-background flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>{subject.name}</DialogTitle>
                    <DialogDescription>
                        Comprehensive breakdown of the subject curriculum and teaching staff.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {/* Header Banner */}
                    <div className="bg-primary/10 p-8 sm:p-12 text-primary relative overflow-hidden border-b border-primary/10">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                            <BookOpen className="h-48 sm:h-64 w-48 sm:w-64" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="px-3 py-1 bg-primary text-white font-black text-[10px] tracking-widest uppercase">
                                    Course Profile
                                </Badge>
                                <div className="flex items-center gap-2 text-primary/60">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">Verified Curriculum</span>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-left leading-[1.1] uppercase">
                                {subject.name}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 sm:p-12 space-y-10 sm:space-y-12">
                        {/* Meta Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary/40">
                                    <Hash className="h-4 w-4" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">System ID</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-muted/50 border border-muted-foreground/10">
                                    <p className="text-xs sm:text-sm font-black text-primary uppercase tracking-tighter">
                                        {subject.id}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary/40">
                                    <Layers className="h-4 w-4" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Academic Status</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-2 rounded-xl text-xs uppercase border-none shadow-sm">
                                        Active Subject
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Teacher Subject Matrix */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center gap-2 text-primary/40">
                                    <GraduationCap className="h-5 w-5" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Assignee Matrix</span>
                                </div>
                                <Badge variant="outline" className="font-black text-[10px] uppercase border-primary/20 text-primary px-3">
                                    {subject.teacherSubjects?.length || 0} Faculty Members
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                {subject.teacherSubjects && subject.teacherSubjects?.length > 0 ? (
                                    subject.teacherSubjects?.map((ts, idx) => (
                                        <div key={idx} className="group p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-background transition-all duration-300 relative overflow-hidden">
                                            {/* Decorative Background Icon */}
                                            <User className="absolute -right-4 -bottom-4 h-24 w-24 opacity-5 pointer-events-none" />

                                            <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                                                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                                                    <User className="h-6 w-6 sm:h-8 sm:w-8" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-[10px] sm:text-xs font-black text-primary/60 uppercase tracking-widest">
                                                        {ts.teacher.designation || "Faculty Member"}
                                                    </p>
                                                    <h4 className="text-md sm:text-xl font-black uppercase tracking-tight truncate">
                                                        {ts.teacher.name}
                                                    </h4>
                                                    <p className="text-[10px] sm:text-xs font-bold text-muted-foreground/80 italic leading-none pb-2">
                                                        {ts.teacher.qualification}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-muted">
                                                        <div className="flex items-center gap-1.5 text-foreground/60">
                                                            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                                                            <span className="text-[10px] sm:text-xs font-bold">{ts.teacher.contactNumber}</span>
                                                        </div>
                                                        {ts.isPrimary && (
                                                            <div className="flex items-center gap-1.5 text-foreground/60 animate-in fade-in slide-in-from-left-2 duration-500">
                                                                <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                                                <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-tighter">Primary Lead</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 border-2 border-dashed border-muted rounded-[2rem] text-center space-y-3">
                                        <User className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                                        <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">No Faculty Assigned</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-10 border-t bg-muted/10">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-full h-14 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Close Profile
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewSubjectModal
