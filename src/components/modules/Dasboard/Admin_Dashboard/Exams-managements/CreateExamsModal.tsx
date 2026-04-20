"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2, Calendar, Save, Type, Clock } from "lucide-react"
import { toast } from 'sonner'
import { createExam } from '@/services/admin-srever-action/exams-managements.service'
import { IExamCreatePayload } from '@/types/Dashboard/admin-dashboard-types/exams-managements'

interface CreateExamsModalProps {
    onSuccess: () => void;
}

const CreateExamsModal = ({ onSuccess }: CreateExamsModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const payload: IExamCreatePayload = {
            name: formData.get('name') as string,
            year: formData.get('year') as string,
            formFillupStart: formData.get('formFillupStart') as string,
            formFillupEnd: formData.get('formFillupEnd') as string,
            examDate: formData.get('examDate') as string,
        }

        if (!payload.name || !payload.year || !payload.formFillupStart || !payload.formFillupEnd) {
            toast.error("All fields are required")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await createExam(payload)
            if (res.success) {
                toast.success("Exam created successfully")
                onSuccess()
                setIsOpen(false)
            } else {
                toast.error(res.message || "Failed to create exam")
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Plus className="h-5 w-5" />
                    CREATE EXAM
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[98vw] sm:max-w-[550px] h-auto max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-[2.5rem] sm:rounded-3xl flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>Create New Exam</DialogTitle>
                    <DialogDescription>
                        Schedule a new examination for the academic year.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Header Banner */}
                    <div className="bg-primary p-8 sm:p-10 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Calendar className="h-32 sm:h-40 w-32 sm:w-40" />
                        </div>
                        <div className="relative z-10 space-y-2 text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white m-0 uppercase">Board</h2>
                            </div>
                            <p className="text-white/70 text-[10px] sm:text-sm font-bold sm:ml-[72px] text-left uppercase tracking-widest">New Examination</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} id="create-exam-form" className="p-8 sm:p-10 space-y-8 text-left">
                        <div className="space-y-6 text-left">
                            {/* Exam Name */}
                            <div className="space-y-3 text-left">
                                <Label htmlFor="name" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">
                                    Exam Name <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative text-left flex items-center">
                                    <Type className="absolute left-4 h-4 w-4 text-primary z-20" />
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="e.g., Annual Exam 2026"
                                        required
                                        className="pl-12 h-14 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Year Selection */}
                            <div className="space-y-3 text-left">
                                <Label htmlFor="year" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">
                                    Academic Year <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative text-left flex items-center">
                                    <Calendar className="absolute left-4 h-4 w-4 text-primary z-20" />
                                    <Input
                                        id="year"
                                        name="year"
                                        placeholder="e.g., 2026"
                                        required
                                        className="pl-12 h-14 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-3 text-left">
                                    <Label htmlFor="formFillupStart" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">
                                        Fillup Start <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative text-left flex items-center">
                                        <Clock className="absolute left-4 h-4 w-4 text-primary z-20" />
                                        <Input
                                            id="formFillupStart"
                                            name="formFillupStart"
                                            type="datetime-local"
                                            required
                                            className="pl-12 h-14 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold text-xs sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 text-left">
                                    <Label htmlFor="formFillupEnd" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">
                                        Fillup End <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative text-left flex items-center">
                                        <Clock className="absolute left-4 h-4 w-4 text-primary z-20" />
                                        <Input
                                            id="formFillupEnd"
                                            name="formFillupEnd"
                                            type="datetime-local"
                                            required
                                            className="pl-12 h-14 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold text-xs sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 text-left">
                                    <Label htmlFor="examDate" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">
                                        Exam Date
                                    </Label>
                                    <div className="relative text-left flex items-center">
                                        <Clock className="absolute left-4 h-4 w-4 text-primary z-20" />
                                        <Input
                                            id="examDate"
                                            name="examDate"
                                            type="datetime-local"
                                            required
                                            className="pl-12 h-14 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold text-xs sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Stacking for Mobile */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-dashed">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:flex-1 h-14 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white gap-3 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 text-sm sm:text-base"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                                SAVE EXAMINATION
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto h-14 rounded-2xl font-bold text-muted-foreground px-8 hover:bg-muted text-xs sm:text-sm"
                            >
                                DISCARD
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateExamsModal
