"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { ITeacher } from '@/types/Dashboard/admin-dashboard-types/teachers-managements.types'
import {
    X,
    Save,
    CheckCircle2,
    Briefcase,
    User,
    Mail,
    Phone,
    MapPin,
    Camera
} from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTeacher } from '@/services/admin-srever-action/teachers-managements.service'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const updateTeacherSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters").max(30).optional().or(z.literal('')),
    email: z.string().email("Invalid email").optional().or(z.literal('')),
    contactNumber: z.string().min(11).max(15).optional().or(z.literal('')),
    address: z.string().min(10).max(100).optional().or(z.literal('')),
    qualification: z.string().min(2).max(50).optional().or(z.literal('')),
    designation: z.string().min(2).max(50).optional().or(z.literal('')),
})

type UpdateFormValues = z.infer<typeof updateTeacherSchema>

interface UpdateTeacherModalProps {
    teacher: ITeacher | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const UpdateTeacherModal = ({ teacher, isOpen, onOpenChange }: UpdateTeacherModalProps) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateTeacherSchema),
        defaultValues: {
            name: '', email: '', contactNumber: '', address: '',
            qualification: '', designation: '',
        }
    })

    useEffect(() => {
        if (teacher) {
            form.reset({
                name: teacher.name || '',
                email: teacher.email || '',
                contactNumber: teacher.contactNumber || '',
                address: teacher.address || '',
                qualification: teacher.qualification || '',
                designation: teacher.designation || '',
            })
            setPreviewImage(teacher.profilePhoto)
        }
    }, [teacher, form])

    const mutation = useMutation({
        mutationFn: (formData: FormData) => updateTeacher(teacher!.id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] })
            router.refresh()
            toast.success("Teacher profile updated successfully")
            onOpenChange(false)
        },
        onError: (error: any) => toast.error(error?.message || "Failed to update teacher")
    })

    const onSubmit = (values: UpdateFormValues) => {
        const formData = new FormData()

        // Append all fields directly to FormData (flat structure)
        // This allows Multer to populate req.body correctly for the spread operator
        Object.keys(values).forEach(key => {
            const val = values[key as keyof UpdateFormValues]
            if (val !== undefined && val !== '') {
                formData.append(key, val)
            }
        })

        if (selectedFile) {
            formData.append('profilePhoto', selectedFile)
        }

        mutation.mutate(formData)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setPreviewImage(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    if (!teacher) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>

            <DialogContent
                showCloseButton={false}
                className="max-w-[95vw] md:max-w-4xl p-0 border-none shadow-3xl rounded-[2rem] md:rounded-[3rem] bg-background overflow-y-auto max-h-[95vh] custom-scrollbar focus-visible:ring-0"
            >
                {/* Accessibility */}
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Teacher Registry</DialogTitle>
                    <DialogDescription>Edit profile for {teacher.name}</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">

                    {/* --- 1. Hero Header (Will scroll with form) --- */}
                    <div className="relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-800" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10" />

                        {/* Close Button Inside Header */}
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-black/20 hover:bg-black/40 text-white z-50 backdrop-blur-md">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>

                        <div className="relative pt-12 pb-12 px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 z-10">
                            <div className="relative group shrink-0">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] border-4 border-white/30 bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl relative transition-transform duration-500 group-hover:rotate-3">
                                    {previewImage ? (
                                        <Image src={previewImage} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-white/5 text-white/40">
                                            <User size={56} />
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex flex-col items-center justify-center backdrop-blur-sm">
                                        <Camera className="text-white mb-1" size={24} />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">Update</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left text-white">
                                <Badge className="bg-white/20 text-white border-none backdrop-blur-md mb-4 px-4 py-1 rounded-full uppercase text-[10px] tracking-[0.2em] font-black">
                                    Registry Modification
                                </Badge>
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight drop-shadow-xl">
                                    {form.watch('name') || teacher.name}
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mt-2">Teacher ID: {teacher.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- 2. Form Body (Natural flow, no internal scroll) --- */}
                    <div className="px-6 md:px-12 py-12 space-y-16 bg-background">

                        {/* Section: Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <CustomField label="Full Legal Name" error={form.formState.errors.name?.message}>
                                <Input {...form.register('name')} className="field-input" />
                            </CustomField>
                            <CustomField label="Professional Email" error={form.formState.errors.email?.message}>
                                <Input {...form.register('email')} className="field-input" />
                            </CustomField>
                        </div>

                        {/* Section: Professional */}
                        <div className="space-y-8">
                            <SectionDivider icon={Briefcase} title="Career Credentials" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <CustomField label="Designation">
                                    <Input {...form.register('designation')} className="field-input" />
                                </CustomField>
                                <CustomField label="Qualification">
                                    <Input {...form.register('qualification')} className="field-input" />
                                </CustomField>
                            </div>
                        </div>


                        {/* Section: Communication */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                            <CustomField label="Contact Phone">
                                <Input {...form.register('contactNumber')} className="field-input" />
                            </CustomField>
                            <CustomField label="Permanent Address">
                                <Input {...form.register('address')} className="field-input" />
                            </CustomField>
                        </div>
                    </div>

                    {/* --- 3. Footer (Will also scroll with form) --- */}
                    <div className="px-6 md:px-12 py-8 bg-muted/20 border-t flex flex-col md:flex-row gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-14 flex-1 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel Edit
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="h-14 flex-[2] rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-indigo-600/30"
                        >
                            {mutation.isPending ? "Synchronizing..." : "Save Modifications"}
                        </Button>
                    </div>
                </form>
            </DialogContent>

            <style jsx global>{`
                .field-input {
                    border-radius: 1.2rem !important;
                    height: 3.5rem !important;
                    font-weight: 700 !important;
                    background: white !important;
                    border: 2px solid #f1f5f9 !important;
                }
                .field-input:focus {
                    border-color: #4f46e5 !important;
                    box-shadow: none !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </Dialog>
    )
}

// Sub-components for cleaner code
const SectionDivider = ({ icon: Icon, title }: any) => (
    <div className="flex items-center gap-4 opacity-70">
        <Icon size={18} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{title}</span>
        <div className="flex-1 h-[1px] bg-muted-foreground/10" />
    </div>
)

const CustomField = ({ label, children, error }: any) => (
    <Field className="space-y-3">
        <FieldLabel className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">{label}</FieldLabel>
        {children}
        <FieldError errors={[{ message: error }]} />
    </Field>
)

export default UpdateTeacherModal