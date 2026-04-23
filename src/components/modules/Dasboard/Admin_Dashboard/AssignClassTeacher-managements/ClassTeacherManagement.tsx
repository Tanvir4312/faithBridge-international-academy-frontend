"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Users2, School, ShieldCheck, UserCheck, Loader2, Sparkles } from 'lucide-react'
import { ITeacher } from '@/types/Dashboard/admin-dashboard-types/teachers-managements.types'

import { assignClassTeacher } from '@/services/admin-srever-action/class-teacher.service'
import { useRouter } from 'next/navigation'
import { IClass } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'

interface ClassTeacherManagementProps {
    teachers: ITeacher[];
    classes: IClass[];
}

const ClassTeacherManagement = ({ teachers, classes }: ClassTeacherManagementProps) => {
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>("")
    const [selectedClassId, setSelectedClassId] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleAssign = async () => {
        if (!selectedTeacherId || !selectedClassId) {
            toast.error("Please select both a faculty member and a class")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await assignClassTeacher({
                teacherId: selectedTeacherId,
                classId: selectedClassId
            })

            if (res.success) {
                toast.success("Class teacher designated successfully")
                setSelectedTeacherId("")
                setSelectedClassId("")
                router.refresh()
            } else {
                // Handle cases where response is 200 but success is false
                toast.error(res.message || "Execution blocked by system rules")
            }
        } catch (error: any) {
            // Handle HTTP errors (400, 404, 500 etc)
            const errorMessage = error?.message || "Internal system rejection"
            toast.error(errorMessage, {
                description: "The system could not finalize this designation.",
                duration: 5000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col gap-2 text-center sm:text-left mb-4 sm:mb-8">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-xl sm:rounded-2xl">
                        <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-primary uppercase">Class Designations</h1>
                </div>
                <p className="text-[10px] sm:text-sm font-bold text-muted-foreground uppercase tracking-widest sm:tracking-[0.2em] pl-1">Assign Lead Faculty to Class Cohorts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Teacher Selection Card */}
                <Card className="border-2 border-primary/10 shadow-xl rounded-2xl sm:rounded-[2rem] overflow-hidden group hover:border-primary/30 transition-all">
                    <CardHeader className="bg-primary/5 border-b p-4 sm:p-6 text-left">
                        <div className="flex items-center gap-2">
                            <Users2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            <CardTitle className="text-md sm:text-lg font-black uppercase tracking-tight">Faculty Selection</CardTitle>
                        </div>
                        <CardDescription className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select a qualified lead teacher</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-8">
                        <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                            <SelectTrigger className="h-12 sm:h-14 font-black bg-muted/30 border-2 border-transparent focus:border-primary rounded-xl sm:rounded-2xl transition-all text-xs sm:text-sm">
                                <SelectValue placeholder="CHOOSE FACULTY..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl sm:rounded-2xl border-none shadow-2xl">
                                {teachers?.map(t => (
                                    <SelectItem key={t.id} value={t.id} className="font-bold py-2 sm:py-3 text-xs sm:text-sm">
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Class Selection Card */}
                <Card className="border-2 border-emerald-500/10 shadow-xl rounded-2xl sm:rounded-[2rem] overflow-hidden group hover:border-emerald-500/30 transition-all">
                    <CardHeader className="bg-emerald-500/5 border-b p-4 sm:p-6 text-left">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <School className="h-4 w-4 sm:h-5 sm:w-5" />
                            <CardTitle className="text-md sm:text-lg font-black uppercase tracking-tight">Class Cohort</CardTitle>
                        </div>
                        <CardDescription className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select the target student group</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-8">
                        <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                            <SelectTrigger className="h-12 sm:h-14 font-black bg-muted/30 border-2 border-transparent focus:border-emerald-500 rounded-xl sm:rounded-2xl transition-all text-xs sm:text-sm">
                                <SelectValue placeholder="CHOOSE CLASS..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl sm:rounded-2xl border-none shadow-2xl">
                                {classes?.map(c => (
                                    <SelectItem key={c.id} value={c.id} className="font-bold py-2 sm:py-3 text-xs sm:text-sm">
                                        CLASS: {c.name.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>

            {/* Action Card */}
            <Card className="bg-primary shadow-2xl shadow-primary/30 rounded-[2.5rem] border-none overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute -right-16 -top-16 opacity-10">
                    <ShieldCheck className="h-64 w-64 text-white" />
                </div>
                <div className="absolute -left-8 -bottom-8 opacity-10">
                    <Sparkles className="h-32 w-32 text-white" />
                </div>

                <CardContent className="p-6 sm:p-12 text-center relative z-10 space-y-6">


                    <Button
                        onClick={handleAssign}
                        disabled={isSubmitting || !selectedTeacherId || !selectedClassId}
                        className="w-full h-14 sm:h-16 rounded-xl sm:rounded-[2rem] bg-white text-primary hover:bg-white/90 active:scale-95 transition-all font-black text-xs sm:text-sm uppercase tracking-normal sm:tracking-[0.2em] shadow-2xl px-8"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-3">
                                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                ESTABLISHING LINK...
                            </div>
                        ) : (
                            "Commit Designation"
                        )}
                    </Button>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 p-6 bg-muted/50 rounded-[2rem] border-2 border-dashed">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Administrative Verification Required for Future Modifications</p>
            </div>
        </div>
    )
}

export default ClassTeacherManagement
