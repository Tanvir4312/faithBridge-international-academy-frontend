"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ITeacher } from '@/types/Dashboard/admin-dashboard-types/teachers-managements'
import { ISubject } from '@/types/Dashboard/admin-dashboard-types/subject-managements.types'
import { BookOpen, UserCircle, CheckCircle2, Star, Trash2, ShieldCheck, Info } from 'lucide-react'
import { getSingleTeacher } from '@/services/admin-srever-action/teachers-managements.service'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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

    const handleNewSubjectToggle = (id: string) => {
        setNewSelectedSubjects(prev => {
            const isSelected = prev.includes(id)
            if (isSelected) {
                const filtered = prev.filter(sid => sid !== id)
                if (newPrimarySubject === id) setNewPrimarySubject("")
                return filtered
            } else {
                const next = [...prev, id]
                if (!newPrimarySubject) setNewPrimarySubject(id)
                return next
            }
        })
    }

    const handleAssignNew = async () => {
        if (!selectedTeacherId || newSelectedSubjects.length === 0) return

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Left: Teacher Selection & Current Assignments */}
            <Card className="lg:col-span-12 shadow-md border-primary/20">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <UserCircle className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Teacher Workload Manager</CardTitle>
                                <CardDescription>Manage subject assignments and specialties.</CardDescription>
                            </div>
                        </div>
                        <div className="w-full md:w-80">
                            <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                                <SelectTrigger className="h-11 font-medium bg-background border-primary/30">
                                    <SelectValue placeholder="Select a teacher to manage..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map(t => (
                                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
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
                    <Card className="lg:col-span-5 h-fit shadow-lg border-green-200">
                        <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <span className="font-bold text-lg">Active Assignments</span>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {assignedSubjects.length} Assigned
                            </Badge>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            {isLoadingTeacher ? (
                                <div className="py-10 text-center space-y-3">
                                    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                    <p className="text-sm text-muted-foreground">Syncing with server...</p>
                                </div>
                            ) : assignedSubjects.length === 0 ? (
                                <div className="text-center py-8 rounded-lg border-2 border-dashed border-muted text-muted-foreground flex flex-col items-center gap-2">
                                    <Info className="h-8 w-8 opacity-20" />
                                    No subjects currently assigned.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {assignedSubjects.map((sub) => (
                                        <div key={sub.subjectId} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${sub.isPrimary ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-300 shadow-sm' : 'bg-background hover:border-muted-foreground/30'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded flex items-center justify-center font-bold ${sub.isPrimary ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>
                                                    {sub.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{sub.name}</p>
                                                    {sub.isPrimary && <Badge className="h-4 text-[9px] bg-amber-500 hover:bg-amber-600 px-1">PRIMARY EXPERT</Badge>}
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {!sub.isPrimary && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:bg-amber-100" title="Make Primary" onClick={() => handleSetPrimary(sub.subjectId, sub.name)}>
                                                        <Star className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50" title="Delete Assignment" onClick={() => {
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
                    <Card className="lg:col-span-7 shadow-lg">
                        <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                <span className="font-bold text-lg">Assign New Subjects</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {availableSubjects.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground text-sm flex flex-col items-center gap-2">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                    All available subjects have been assigned to this teacher.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {availableSubjects.map((subject) => {
                                        const isChecked = newSelectedSubjects.includes(subject.id)
                                        const isPrimary = newPrimarySubject === subject.id
                                        return (
                                            <div key={subject.id} 
                                                 className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${isChecked ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-muted-foreground/30'}`}
                                                 onClick={() => handleNewSubjectToggle(subject.id)}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox checked={isChecked} onCheckedChange={() => handleNewSubjectToggle(subject.id)} onClick={e => e.stopPropagation()} />
                                                        <span className="font-bold">{subject.name}</span>
                                                    </div>
                                                </div>
                                                {isChecked && (
                                                    <div className="pt-2 border-t border-primary/20 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                        <RadioGroup value={newPrimarySubject} onValueChange={setNewPrimarySubject} className="flex items-center">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value={subject.id} id={`new-primary-${subject.id}`} />
                                                                <Label htmlFor={`new-primary-${subject.id}`} className={`text-xs font-bold cursor-pointer flex items-center gap-1 ${isPrimary ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                    <Star className={`h-3 w-3 ${isPrimary ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                                                    Mark Primary
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="border-t bg-muted/5 p-6 space-x-4 flex justify-end">
                            <Button variant="outline" size="lg" onClick={() => { setNewSelectedSubjects([]); setNewPrimarySubject("") }}>Reset Selection</Button>
                            <Button size="lg" className="min-w-[200px] font-bold shadow-lg" disabled={isSubmitting || newSelectedSubjects.length === 0} onClick={handleAssignNew}>
                                {isSubmitting ? "Assigning New..." : "Assign & Save"}
                            </Button>
                        </CardFooter>
                    </Card>
                </>
            )}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-red-600">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base pt-2">
                            This will remove <span className="font-bold text-foreground">"{subjectToDelete?.name}"</span> from the teacher's current workload. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-medium">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAssigned} className="bg-red-600 hover:bg-red-700 font-bold px-6">
                            Confirm Deletion
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AssignSubjectForm
