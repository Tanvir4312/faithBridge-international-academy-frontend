"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ITeacher } from '@/types/Dashboard/admin-dashboard-types/teachers-managements.types'
import { ISubject } from '@/types/Dashboard/admin-dashboard-types/subject-managements.types'
import { BookOpen, UserCircle, CheckCircle2, Star, Trash2, ShieldCheck, Info } from 'lucide-react'
import { getSingleTeacher } from '@/services/admin-srever-action/teachers-managements.service'
import { Badge } from '@/components/ui/badge'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AssignSubjectFormProps {
    teachers: ITeacher[];
    subjects: ISubject[];
    onAssign: (data: { teacherId: string; subjectsId: string[]; primarySubjectId: string }) => Promise<any>;
    onDelete: (data: { teacherId: string; subjectId: string }) => Promise<any>;
    onUpdatePrimary: (data: { teacherId: string; subjectId: string }) => Promise<any>;
}

const AssignSubjectForm = ({ teachers, subjects, onAssign, onDelete, onUpdatePrimary }: AssignSubjectFormProps) => {
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>("")
    const [assignedSubjects, setAssignedSubjects] = useState<{ subjectId: string, name: string, isPrimary: boolean }[]>([])
    const [newSelectedSubjects, setNewSelectedSubjects] = useState<string[]>([])
    const [newPrimarySubject, setNewPrimarySubject] = useState<string>("")
    const [isLoadingTeacher, setIsLoadingTeacher] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [subjectToDelete, setSubjectToDelete] = useState<{ id: string, name: string } | null>(null)

    const fetchTeacherData = useCallback(async (id: string) => {
        setIsLoadingTeacher(true)
        try {
            const res = await getSingleTeacher(id)
            if (res.data) {
                const current = res.data.teacherSubjects?.map((ts: any) => ({
                    subjectId: ts.subjectId,
                    name: ts.subject?.name || "Unknown Subject",
                    isPrimary: ts.isPrimary
                })) || []
                setAssignedSubjects(current)
            }
        } catch (error) {
            toast.error("Failed to load teacher's current assignments")
        } finally {
            setIsLoadingTeacher(false)
        }
    }, [])

    useEffect(() => {
        if (selectedTeacherId) {
            fetchTeacherData(selectedTeacherId)
            setNewSelectedSubjects([])
            setNewPrimarySubject("")
        } else {
            setAssignedSubjects([])
        }
    }, [selectedTeacherId, fetchTeacherData])

    const hasExistingPrimary = assignedSubjects.some(s => s.isPrimary)

    const handleNewSubjectToggle = (id: string) => {
        setNewSelectedSubjects(prev => {
            const isSelected = prev?.includes(id)
            if (isSelected) {
                const filtered = prev?.filter(sid => sid !== id)
                if (newPrimarySubject === id) setNewPrimarySubject("")
                return filtered
            } else {
                const next = [...prev, id]
                // Only auto-select as primary if NO primary exists anywhere
                if (!newPrimarySubject && !hasExistingPrimary) setNewPrimarySubject(id)
                return next
            }
        })
    }

    const handleAssignNew = async () => {
        if (!selectedTeacherId || newSelectedSubjects?.length === 0) return

        setIsSubmitting(true)
        try {
            await onAssign({
                teacherId: selectedTeacherId,
                subjectsId: newSelectedSubjects,
                primarySubjectId: newPrimarySubject
            })
            toast.success("New subjects assigned successfully")
            fetchTeacherData(selectedTeacherId)
            setNewSelectedSubjects([])
            setNewPrimarySubject("")
        } catch (error: any) {
            toast.error(error?.message || "Assignment failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteAssigned = async () => {
        if (!subjectToDelete || !selectedTeacherId) return

        try {
            await onDelete({ teacherId: selectedTeacherId, subjectId: subjectToDelete.id })
            toast.success(`${subjectToDelete.name} removed successfully`)
            fetchTeacherData(selectedTeacherId)
        } catch (error: any) {
            toast.error(error?.message || "Failed to delete")
        } finally {
            setIsDeleteDialogOpen(false)
            setSubjectToDelete(null)
        }
    }

    const handleSetPrimary = async (subjectId: string, name: string) => {
        try {
            await onUpdatePrimary({ teacherId: selectedTeacherId, subjectId })
            toast.success(`${name} is now the primary subject`)
            fetchTeacherData(selectedTeacherId)
        } catch (error: any) {
            toast.error(error?.message || "Failed to update primary subject")
        }
    }

    // Filter out subjects already assigned
    const availableSubjects = subjects.filter(s => !assignedSubjects.some(as => as.subjectId === s.id))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 max-w-7xl mx-auto p-2 sm:p-4">
            {/* Left: Teacher Selection & Current Assignments */}
            <Card className="lg:col-span-12 shadow-sm border-primary/20 rounded-2xl sm:rounded-3xl">
                <CardHeader className="bg-primary/5 border-b p-4 sm:p-6 text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <CardTitle className="text-lg sm:text-xl font-black tracking-tight">Teacher Workload</CardTitle>
                                <CardDescription className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-70">Control subject specializations</CardDescription>
                            </div>
                        </div>
                        <div className="w-full md:w-80">
                            <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                                <SelectTrigger className="h-12 sm:h-11 font-black bg-background border-primary/30 rounded-xl sm:rounded-lg">
                                    <SelectValue placeholder="Select faculty member..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-2xl">
                                    {teachers?.map((t, idx) => (
                                        <SelectItem key={t.id || `teacher-${idx}`} value={t.id} className="font-bold">{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {selectedTeacherId && (
                <>
                    {/* Active Assignments Panel */}
                    <Card className="lg:col-span-12 xl:col-span-5 h-fit shadow-lg border-emerald-200/50 rounded-2xl sm:rounded-3xl bg-background">
                        <CardHeader className="p-4 sm:p-6 border-b flex flex-row items-center justify-between bg-emerald-50/50 rounded-t-2xl sm:rounded-t-3xl text-left">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                                <span className="font-black text-sm sm:text-lg uppercase tracking-tight">Active Roster</span>
                            </div>
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 font-black text-[9px] sm:text-[10px]">
                                {assignedSubjects?.length} SUBJECTS
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 space-y-4">
                            {isLoadingTeacher ? (
                                <div className="py-10 text-center space-y-3">
                                    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Syncing data...</p>
                                </div>
                            ) : assignedSubjects?.length === 0 ? (
                                <div className="text-center py-10 rounded-2xl border-2 border-dashed border-muted text-muted-foreground flex flex-col items-center gap-3">
                                    <Info className="h-8 w-8 opacity-20" />
                                    <p className="text-xs font-bold uppercase tracking-widest">No assigned subjects</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {assignedSubjects?.map((sub, idx) => (
                                        <div key={sub.subjectId || `assigned-${idx}`} className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${sub.isPrimary ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-300 shadow-sm' : 'bg-background hover:border-muted-foreground/30'}`}>
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-lg flex items-center justify-center font-black text-sm ${sub.isPrimary ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>
                                                    {sub.name[0]}
                                                </div>
                                                <div className="min-w-0 text-left">
                                                    <p className="font-black text-xs sm:text-sm truncate uppercase tracking-tight">{sub.name}</p>
                                                    {sub.isPrimary && <Badge className="h-4 text-[8px] sm:text-[9px] bg-amber-500 hover:bg-amber-600 px-1 font-black">SPECIALTY</Badge>}
                                                </div>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                {/* Hide Primary button if teacher already has a primary subject */}
                                                {!sub.isPrimary && !hasExistingPrimary && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-amber-600 hover:bg-amber-100 rounded-lg" title="Make Primary" onClick={() => handleSetPrimary(sub.subjectId, sub.name)}>
                                                        <Star className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:bg-red-50 rounded-lg" title="Delete Assignment" onClick={() => {
                                                    setSubjectToDelete({ id: sub.subjectId, name: sub.name })
                                                    setIsDeleteDialogOpen(true)
                                                }}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* New Selection Panel */}
                    <Card className="lg:col-span-12 xl:col-span-7 shadow-lg rounded-2xl sm:rounded-3xl border-primary/10 bg-background">
                        <CardHeader className="p-4 sm:p-6 border-b flex flex-row items-center justify-between bg-primary/5 rounded-t-2xl sm:rounded-t-3xl text-left">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                <span className="font-black text-sm sm:text-lg uppercase tracking-tight">Expand Portfolio</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            {availableSubjects?.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground text-sm flex flex-col items-center gap-3">
                                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                    <p className="font-black uppercase tracking-widest text-xs">Maximum catalog assigned</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[350px] sm:max-h-[450px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                                    {availableSubjects?.map((subject, idx) => {
                                        const isChecked = newSelectedSubjects.includes(subject.id)
                                        const isPrimarySelection = newPrimarySubject === subject.id
                                        return (
                                            <div key={subject.id || `available-${idx}`}
                                                className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${isChecked ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-muted-foreground/30'}`}
                                                onClick={() => handleNewSubjectToggle(subject.id)}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <Checkbox checked={isChecked} onCheckedChange={() => handleNewSubjectToggle(subject.id)} onClick={e => e.stopPropagation()} className="rounded-md h-5 w-5 border-2 text-primary" />
                                                        <span className="font-black text-xs sm:text-sm truncate uppercase tracking-tight">{subject.name}</span>
                                                    </div>
                                                </div>
                                                {isChecked && !hasExistingPrimary && (
                                                    <div className="pt-2 border-t border-primary/20 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                        <RadioGroup value={newPrimarySubject} onValueChange={setNewPrimarySubject} className="flex items-center">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value={subject.id} id={`new-primary-${subject.id}`} className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-primary" />
                                                                <Label htmlFor={`new-primary-${subject.id}`} className={`text-[9px] sm:text-[10px] font-black cursor-pointer flex items-center gap-1 uppercase tracking-tighter ${isPrimarySelection ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                    <Star className={`h-3 w-3 ${isPrimarySelection ? 'fill-amber-400 text-amber-400 border-none' : ''}`} />
                                                                    Expertise
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                )}
                                                {/* Visual helper for existing primary */}
                                                {isChecked && hasExistingPrimary && (
                                                    <div className="flex items-center gap-1.5 p-2 bg-muted/30 rounded-lg">
                                                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Standard Assignment</span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                        {/* Perfect Equal Width Grid Footer */}
                        <CardFooter className="border-t bg-muted/5 p-4 sm:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-2xl ml-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full font-black rounded-xl h-14 md:h-12 border-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/40 text-xs sm:text-sm uppercase tracking-widest transition-all order-2 sm:order-1"
                                    onClick={() => { setNewSelectedSubjects([]); setNewPrimarySubject("") }}
                                >
                                    RESET SELECTION
                                </Button>
                                <Button
                                    size="lg"
                                    className="w-full font-black rounded-xl h-14 md:h-12 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm bg-primary text-white uppercase tracking-widest order-1 sm:order-2"
                                    disabled={isSubmitting || newSelectedSubjects?.length === 0}
                                    onClick={handleAssignNew}
                                >
                                    {isSubmitting ? "SYNCING..." : "COMMIT CHANGES"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </>
            )}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="w-[95vw] sm:max-w-[450px] rounded-[2rem] sm:rounded-3xl border-none p-6 sm:p-8">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="h-10 w-10 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-xl sm:text-2xl font-black tracking-tight uppercase">Remove Subject?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs sm:text-sm font-bold opacity-70 pt-2">
                            This will remove <span className="text-destructive font-black">"{subjectToDelete?.name}"</span> from the faculty's workload. This action is final.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-6">
                        <AlertDialogCancel className="w-full sm:flex-1 h-12 rounded-xl sm:rounded-2xl border-muted-foreground/20 font-bold text-xs uppercase">NO, KEEP IT</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAssigned} className="w-full sm:flex-1 h-12 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-700 font-black text-xs uppercase">YES, REMOVE</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AssignSubjectForm
