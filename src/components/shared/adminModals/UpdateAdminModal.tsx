"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { updateAdmin } from '@/services/admin-srever-action/allAdmin.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Camera, Save, X, Phone, Fingerprint, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const updateAdminSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters").optional().or(z.literal('')),
    contactNumber: z.string().min(11, "Contact number must be at least 11 characters").max(15, "Contact number must be at most 15 characters").optional().or(z.literal('')),
})

type UpdateFormValues = z.infer<typeof updateAdminSchema>

interface UpdateAdminModalProps {
    admin: any
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const UpdateAdminModal = ({ admin, isOpen, onOpenChange }: UpdateAdminModalProps) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateAdminSchema as any),
        defaultValues: {
            name: '',
            contactNumber: '',
        }
    })

    useEffect(() => {
        if (admin) {
            form.reset({
                name: admin.name || '',
                contactNumber: admin.contactNumber || '',
            })
            setImagePreview(admin.profilePhoto || null)
        }
    }, [admin, form])

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            if (!admin) throw new Error("No admin selected")
            return updateAdmin(admin.id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] })
            router.refresh()
            toast.success("Admin profile updated successfully", {
                description: "Security protocols have been updated.",
                className: "bg-indigo-600 text-white border-none shadow-2xl",
            })
            onOpenChange(false)
        },
        onError: (error: any) => {
            toast.error("Process Failed", {
                description: error.message || "Authorization update declined.",
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
        const payload: any = { ...values }
        if (selectedFile) {
            payload.profilePhoto = selectedFile
        }
        mutation.mutate(payload)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95%] sm:w-[90%] lg:max-w-3xl p-0 overflow-y-auto max-h-[90vh] custom-scrollbar border-none shadow-2xl rounded-[2.5rem] bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Update Command Profile</DialogTitle>
                    <DialogDescription>Modify administrative authorization details.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Hero Header */}
                    <div className="relative h-40 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 flex items-center px-8 sm:px-12">
                        <div className="absolute inset-0 bg-[url('/circuit-board.png')] opacity-10" />
                        
                        <div className="relative flex items-center gap-6 sm:gap-10 w-full z-10 transition-transform duration-500">
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white bg-opacity-50">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="128px" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-indigo-50">
                                        <User className="h-12 w-12 text-indigo-400" />
                                    </div>
                                )}
                                <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-[2px]">
                                    <Camera className="h-8 w-8 text-white" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>

                            <div className="flex-1 text-white min-w-0">
                                <h2 className="text-xl sm:text-3xl font-black tracking-tighter uppercase leading-tight truncate">
                                    {admin?.name || "Access Update"}
                                </h2>
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70 flex items-center gap-2 mt-1">
                                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                                    Security Clearance: Root
                                </p>
                            </div>
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white z-50">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>

                    <div className="p-8 sm:p-12 space-y-10">
                        {/* Core Data Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                                    <Fingerprint className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">Identity Protocol</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Field>
                                    <FieldLabel className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2">Full Legal Name</FieldLabel>
                                    <Input {...form.register('name')} className="rounded-2xl border-indigo-100 bg-indigo-50/30 focus:bg-white transition-all h-14 font-bold shadow-sm" />
                                    <FieldError errors={[{ message: form.formState.errors.name?.message }]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2">Contact Terminal</FieldLabel>
                                    <Input {...form.register('contactNumber')} className="rounded-2xl border-indigo-100 bg-indigo-50/30 focus:bg-white transition-all h-14 font-bold shadow-sm" />
                                    <FieldError errors={[{ message: form.formState.errors.contactNumber?.message }]} />
                                </Field>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center gap-6 shadow-xl relative overflow-hidden group">
                             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                             <ShieldCheck className="h-10 w-10 text-indigo-500 shrink-0" />
                             <div>
                                <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-1">Encrypted Transaction</p>
                                <p className="text-[10px] text-gray-400 leading-relaxed">All administrative modifications are logged in the high-security ledger for audit compliance.</p>
                             </div>
                        </div>
                    </div>

                    <DialogFooter className="px-8 pb-8 pt-0 flex-row gap-4">
                        <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-indigo-100 hover:bg-gray-50" onClick={() => onOpenChange(false)}>
                            Cancel Ops
                        </Button>
                        <Button type="submit" className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-200 transition-transform active:scale-95" disabled={mutation.isPending}>
                            {mutation.isPending ? "Syncing..." : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Update Profile
                                </div>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateAdminModal
