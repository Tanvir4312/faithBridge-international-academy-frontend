"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field'
import { IStudent } from '@/types/Dashboard/admin-dashboard-types/students-managements.types'
import { updateStudent } from '@/services/admin-srever-action/students-managements.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Camera, Save, X, Phone, MapPin, Fingerprint, Languages } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Schema matching backend requirements
const updateStudentSchema = z.object({
    nameBn: z.string().min(2, "বাংলা নাম খুব ছোট").max(100, "বাংলা নাম খুব বড়").optional().or(z.literal('')),
    nameEn: z.string().min(2, "English name too short").max(100, "English name too long").optional().or(z.literal('')),
    fatherName: z.string().min(2, "Father's name too short").max(100, "Father's name too long").optional().or(z.literal('')),
    motherName: z.string().min(2, "Mother's name too short").max(100, "Mother's name too long").optional().or(z.literal('')),
    guardianMobile: z.string().regex(/^\+?\d{10,15}$/, "Guardian mobile must be a valid number").optional().or(z.literal('')),
    studentMobile: z.string().regex(/^\+?\d{10,15}$/, "Student mobile must be a valid number").optional().or(z.literal('')),
    presentAddress: z.string().min(5, "Present address too short").max(250, "Present address too long").optional().or(z.literal('')),
    permanentAddress: z.string().min(5, "Permanent address too short").max(250, "Permanent address too long").optional().or(z.literal('')),
})

type UpdateFormValues = z.infer<typeof updateStudentSchema>

interface UpdateStudentModalProps {
    student: IStudent | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const UpdateStudentModal = ({ student, isOpen, onOpenChange }: UpdateStudentModalProps) => {
    const queryClient = useQueryClient()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateStudentSchema as any),
        defaultValues: {
            nameEn: '',
            nameBn: '',
            fatherName: '',
            motherName: '',
            guardianMobile: '',
            studentMobile: '',
            presentAddress: '',
            permanentAddress: '',
        }
    })

    useEffect(() => {
        if (student) {
            form.reset({
                nameEn: student.nameEn || '',
                nameBn: student.nameBn || '',
                fatherName: student.fatherName || '',
                motherName: student.motherName || '',
                guardianMobile: student.guardianMobile || '',
                studentMobile: student.studentMobile || '',
                presentAddress: student.presentAddress || '',
                permanentAddress: student.permanentAddress || '',
            })
            setImagePreview(student.profileImage || null)
        }
    }, [student, form])

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            if (!student) throw new Error("No student selected")
            return updateStudent(student.id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
            toast.success("Student profile updated successfully", {
                description: "The registry has been synchronized with your changes.",
                className: "bg-emerald-500 text-white border-none shadow-2xl",
            })
            onOpenChange(false)
        },
        onError: (error: any) => {
            toast.error("Failed to update student", {
                description: error.message || "An unexpected error occurred during high-priority update.",
            })
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = (values: UpdateFormValues) => {
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            const val = values[key as keyof UpdateFormValues]
            if (val) formData.append(key, val)
        })
        if (selectedFile) {
            formData.append("profileImage", selectedFile)
        }
        mutation.mutate(formData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95%] sm:w-[92%] lg:max-w-4xl p-0 overflow-y-auto overflow-x-hidden border-none shadow-2xl rounded-[2.5rem] bg-background max-h-[96vh] custom-scrollbar">
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Student Registry</DialogTitle>
                    <DialogDescription>Apply modifications to the high-security student dossier.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    {/* Premium Header */}
                    <div className="relative h-40 sm:h-52 bg-gradient-to-br from-primary via-primary/95 to-primary/80 flex items-center px-6 sm:px-12 group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                        <div className="relative flex items-center gap-6 md:gap-10 w-full z-10 transition-transform duration-500 group-hover:translate-x-2 min-w-0">
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white group-hover:rotate-2 transition-transform">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-muted">
                                        <User className="h-12 w-12 text-muted-foreground/30" />
                                    </div>
                                )}
                                <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-[2px]">
                                    <Camera className="h-8 w-8 text-white" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>

                            <div className="flex-1 text-white min-w-0">
                                <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight truncate mb-1 md:mb-2">
                                    {student?.nameEn || "Update Profile"}
                                </h2>
                                <p className="text-[10px] sm:text-[11px] font-black tracking-[0.4em] uppercase opacity-70 flex items-center gap-2">
                                    <Fingerprint className="h-4 w-4" />
                                    ID: {student?.registrationId || "N/A"}
                                </p>
                            </div>
                        </div>

                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                    </div>

                    {/* Scrollable Form Body */}
                    <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12 space-y-10 lg:space-y-12">

                        {/* Name Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                <Languages className="h-5 w-5 text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/80">Identity Profile</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Full Name (English)</FieldLabel>
                                    <Input {...form.register('nameEn')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.nameEn?.message }]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Native Name (Bangla)</FieldLabel>
                                    <Input {...form.register('nameBn')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.nameBn?.message }]} />
                                </Field>
                            </div>
                        </div>

                        {/* Family Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                                <User className="h-5 w-5 text-emerald-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/80">Parental Guardians</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Father's Registered Name</FieldLabel>
                                    <Input {...form.register('fatherName')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.fatherName?.message }]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Mother's Registered Name</FieldLabel>
                                    <Input {...form.register('motherName')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.motherName?.message }]} />
                                </Field>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                                <Phone className="h-5 w-5 text-amber-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/80">Communication</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Guardian Contact Hotline</FieldLabel>
                                    <Input {...form.register('guardianMobile')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.guardianMobile?.message }]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Student Personal Number</FieldLabel>
                                    <Input {...form.register('studentMobile')} className="rounded-2xl border-muted bg-muted/30 focus:bg-white transition-all h-12 sm:h-14 font-bold" />
                                    <FieldError errors={[{ message: form.formState.errors.studentMobile?.message }]} />
                                </Field>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-l-4 border-purple-500 pl-4">
                                <MapPin className="h-5 w-5 text-purple-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/80">Geographic Context</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Current Mailing Residence</FieldLabel>
                                    <Textarea {...form.register('presentAddress')} className="rounded-[1.5rem] border-muted bg-muted/30 focus:bg-white transition-all min-h-[100px] font-bold py-4" />
                                    <FieldError errors={[{ message: form.formState.errors.presentAddress?.message }]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[11px] font-black uppercase tracking-widest opacity-60">Permanent Home Domicile</FieldLabel>
                                    <Textarea {...form.register('permanentAddress')} className="rounded-[1.5rem] border-muted bg-muted/30 focus:bg-white transition-all min-h-[100px] font-bold py-4" />
                                    <FieldError errors={[{ message: form.formState.errors.permanentAddress?.message }]} />
                                </Field>
                            </div>
                        </div>

                    </div>

                    {/* Integrated Action Footer */}
                    <DialogFooter className="px-2 sm:px-6 py-4 bg-muted/20 border-t border-muted-foreground/5 w-full">
                        <div className="grid grid-cols-2 gap-1.5 w-full max-w-full">
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-10 sm:h-12 px-1 rounded-full font-black uppercase tracking-tighter text-[7.5px] sm:text-[10px] hover:bg-muted"
                                onClick={() => onOpenChange(false)}
                            >
                                <span className="truncate">Abort Update</span>
                            </Button>
                            <Button
                                type="submit"
                                className="w-full h-10 sm:h-12 px-1 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-tighter text-[7.5px] sm:text-[10px] shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-95"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? (
                                    <div className="flex items-center gap-1">
                                        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span className="truncate">Wait...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 justify-center">
                                        <Save className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                        <span className="truncate">Commit</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateStudentModal
