"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateExam } from '@/services/admin-srever-action/exams-managements.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ClipboardList, Calendar, Clock, Save, X, ShieldAlert } from 'lucide-react'
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

const examUpdateSchema = z.object({
  name: z.string().min(2, "Exam name too short").max(100, "Exam name too long").optional().or(z.literal('')),
  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4 digit year (e.g. 2026)").optional().or(z.literal('')),
  formFillupStart: z.string().optional().or(z.literal('')),
  formFillupEnd: z.string().optional().or(z.literal('')),
  examDate: z.string().optional().or(z.literal('')),
}).refine(
  (data) => {
    if (data.formFillupEnd && data.formFillupStart) {
      return new Date(data.formFillupEnd) > new Date(data.formFillupStart);
    }
    return true;
  },
  {
    message: "Form fill-up end date must be after start date",
    path: ["formFillupEnd"],
  }
).refine(
    (data) => {
        if (data.examDate && data.formFillupEnd) {
            return new Date(data.examDate) > new Date(data.formFillupEnd);
        }
        return true;
    },
    {
        message: "Exam date must be after registration deadline",
        path: ["examDate"],
    }
);

type UpdateFormValues = z.infer<typeof examUpdateSchema>

interface UpdateExamsModalProps {
    exam: IExamsData | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const UpdateExamsModal = ({ exam, isOpen, onOpenChange }: UpdateExamsModalProps) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(examUpdateSchema),
        defaultValues: {
            name: '',
            year: '',
            formFillupStart: '',
            formFillupEnd: '',
            examDate: '',
        }
    })

    useEffect(() => {
        if (exam) {
            form.reset({
                name: exam.name || '',
                year: exam.year || '',
                formFillupStart: exam.formFillupStart ? format(new Date(exam.formFillupStart), "yyyy-MM-dd'T'HH:mm") : '',
                formFillupEnd: exam.formFillupEnd ? format(new Date(exam.formFillupEnd), "yyyy-MM-dd'T'HH:mm") : '',
                examDate: exam.examDate ? format(new Date(exam.examDate), "yyyy-MM-dd'T'HH:mm") : '',
            })
        }
    }, [exam, form])

    const mutation = useMutation({
        mutationFn: async (data: UpdateFormValues) => {
            if (!exam) throw new Error("No exam selected")
            // Clean empty strings
            const payload: any = {}
            Object.entries(data).forEach(([key, value]) => {
                if (value !== '') payload[key] = value
            })
            const res = await updateExam(exam.id, payload)
            if (!res.success) {
                throw new Error(res.message || "Failed to update exam details")
            }
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exams'] })
            router.refresh()
            toast.success("Examination parameters synchronized", {
                description: "The exam schedule has been updated successfully.",
                className: "bg-indigo-600 text-white border-none shadow-2xl",
            })
            onOpenChange(false)
        },
        onError: (error: any) => {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during synchronization."
            toast.error("Synchronization Failed", {
                description: errorMessage,
            })
        }
    })

    const onSubmit = (values: UpdateFormValues) => {
        mutation.mutate(values)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95%] sm:w-[90%] lg:max-w-3xl p-0 overflow-y-auto max-h-[90vh] custom-scrollbar border-none shadow-2xl rounded-[2.5rem] bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Examination Registry</DialogTitle>
                    <DialogDescription>Modify scheduling and administrative parameters for official examinations.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Premium Header */}
                    <div className="relative h-40 bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-950 flex items-center px-8 sm:px-12 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10" />
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
                        
                        <div className="relative flex items-center gap-6 sm:gap-10 w-full z-10">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl shrink-0">
                                <ClipboardList className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400" />
                            </div>

                            <div className="flex-1 text-white min-w-0">
                                <h1 className="text-xl sm:text-3xl font-black tracking-tighter uppercase leading-tight truncate">
                                    {exam?.name || "Accessing Registry"}
                                </h1>
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70 flex items-center gap-2 mt-1">
                                    <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" />
                                    Exam Cycle: {exam?.year || "N/A"}
                                </p>
                            </div>
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white z-50">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>

                    <div className="p-8 sm:p-12 space-y-12">
                        {/* Core Data Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm shadow-indigo-100">
                                    <ClipboardList className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">Core Blueprint</h3>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-2.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Examination Title</Label>
                                    <Input {...form.register('name')} placeholder="e.g. Annual Midterm Examination" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white font-bold" />
                                    {form.formState.errors.name && <p className="text-[10px] text-destructive font-bold ml-1">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Academic Year</Label>
                                    <Input {...form.register('year')} placeholder="2026" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white font-bold" />
                                    {form.formState.errors.year && <p className="text-[10px] text-destructive font-bold ml-1">{form.formState.errors.year.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Scheduling Section */}
                        <div className="space-y-8 pt-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm shadow-indigo-100">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">Timeline Matrix</h3>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Registration Launch</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                                        <Input type="datetime-local" {...form.register('formFillupStart')} className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white font-bold" />
                                    </div>
                                    {form.formState.errors.formFillupStart && <p className="text-[10px] text-destructive font-bold ml-1">{form.formState.errors.formFillupStart.message}</p>}
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Registration Deadline</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive opacity-40" />
                                        <Input type="datetime-local" {...form.register('formFillupEnd')} className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white font-bold" />
                                    </div>
                                    {form.formState.errors.formFillupEnd && <p className="text-[10px] text-destructive font-bold ml-1">{form.formState.errors.formFillupEnd.message}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Commencement Date (Exam Day)</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500/60" />
                                        <Input type="datetime-local" {...form.register('examDate')} className="h-14 pl-12 rounded-2xl border-emerald-50 bg-emerald-50/20 focus:bg-white font-bold" />
                                    </div>
                                    {form.formState.errors.examDate && <p className="text-[10px] text-destructive font-bold ml-1">{form.formState.errors.examDate.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Audit Notice */}
                        <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                             <ShieldAlert className="h-10 w-10 text-indigo-500 shrink-0" />
                             <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-1">Administrative Audit Active</h4>
                                <p className="text-[10px] text-gray-400 leading-relaxed max-w-md">Modified scheduling parameters will be broadcasted to all registered candidates and faculty members globally.</p>
                             </div>
                        </div>
                    </div>

                    <DialogFooter className="px-8 pb-10 pt-0 flex flex-col sm:flex-row gap-4">
                        <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-gray-100 hover:bg-gray-50" onClick={() => onOpenChange(false)}>
                            Cancel Ops
                        </Button>
                        <Button type="submit" className="flex-[2] h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={mutation.isPending}>
                            {mutation.isPending ? "Syncing Grid..." : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Update Examination
                                </div>
                            )}
                        </Button>
                    </DialogFooter>
                </form>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                `}</style>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateExamsModal
