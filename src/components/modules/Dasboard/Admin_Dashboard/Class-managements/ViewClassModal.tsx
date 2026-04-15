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
import { ScrollArea } from "@/components/ui/scroll-area"
import { School, Users, Calendar, UserCircle, History, Info, Mail } from "lucide-react"
import { IClass } from '@/types/Dashboard/admin-dashboard-types/class-managements.types'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ViewClassModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classData: IClass;
}

const ViewClassModal = ({ open, onOpenChange, classData }: ViewClassModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 flex flex-col custom-scrollbar border-none shadow-2xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>Class Details: {classData.name}</DialogTitle>
                    <DialogDescription>Viewing detailed information for class {classData.name}</DialogDescription>
                </DialogHeader>

                {/* Hero Header */}
                <div className="relative h-40 bg-primary/10 flex items-center px-8 border-b">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/30 shadow-inner">
                            <School className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-3xl font-extrabold tracking-tight">Class {classData.name}</h2>
                                {classData.section && <Badge variant="secondary" className="font-bold">SECTION {classData.section}</Badge>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {classData.students?.length || 0} Students</span>
                                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Created {classData.createdAt ? format(new Date(classData.createdAt), 'MMM yyyy') : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-8 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Parent Academic Level */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Info className="h-4 w-4" /> Academic Level Context
                            </h3>
                            <div className="p-5 rounded-2xl bg-muted/30 border border-primary/10 flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                    <AvatarImage src={classData.AcademicLevel?.image} />
                                    <AvatarFallback>{classData.AcademicLevel?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-lg leading-tight">{classData.AcademicLevel?.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{classData.AcademicLevel?.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Class Teacher */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <UserCircle className="h-4 w-4" /> Appointed Educator
                            </h3>
                            <div className="p-5 rounded-2xl bg-muted/30 border border-primary/10 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full border-2 border-background shadow-sm bg-primary/10 flex items-center justify-center">
                                    <UserCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-tight">{classData.classTeacher?.teacher.name || "TBD"}</p>
                                    <Badge variant="outline" className="mt-1 font-bold text-[10px] text-primary border-primary/20">CLASS TEACHER</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Users className="h-4 w-4" /> Enrolled Students
                            </h3>
                            <Badge className="font-bold">{classData.students?.length || 0} Registered</Badge>
                        </div>
                        
                        {classData.students && classData.students.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {classData.students.map((student) => (
                                    <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary/30 transition-colors shadow-sm">
                                        <Avatar className="h-10 w-10 ring-2 ring-primary/5">
                                            <AvatarImage src={student.profileImage} />
                                            <AvatarFallback className="font-bold text-xs">{student.nameEn?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="truncate">
                                            <p className="text-xs font-bold truncate">{student.nameEn}</p>
                                            <p className="text-[10px] text-muted-foreground">ID: {student.registrationId}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 bg-muted/20 border-2 border-dashed rounded-2xl text-center text-muted-foreground">
                                <p className="text-sm italic">No students are currently enrolled in this class.</p>
                            </div>
                        )}
                    </div>

                    {/* History Tracking */}
                    {classData.studentHistories && classData.studentHistories.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <History className="h-4 w-4" /> Academic Logs
                            </h3>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {classData.studentHistories.map((log) => (
                                    <Badge key={log.id} variant="secondary" className="whitespace-nowrap flex gap-2 py-1.5 px-3">
                                        <Calendar className="h-3 w-3 opacity-50" />
                                        Session Year: {log.year}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewClassModal
