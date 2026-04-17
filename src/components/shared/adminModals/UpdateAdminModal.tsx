"use client"

import React, { useEffect, useState, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit, Loader2, Camera, User } from "lucide-react"
import { toast } from 'sonner'
import { updateAdmin } from "@/services/admin-srever-action/allAdmin.service"

import { updateAdminValidationSchema, IUpdateAdminPayload } from "@/zod/adminZodValidation"
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AppField from '@/components/shared/AppField'
import { IAdminsData } from '@/types/Dashboard/admin-dashboard-types/admins-management.type'

interface UpdateAdminModalProps {
    admin: IAdminsData | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const UpdateAdminModal = ({ admin, isOpen, onOpenChange }: UpdateAdminModalProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: (payload: IUpdateAdminPayload) => {
            if (!admin?.id) throw new Error("Admin ID missing")
            return updateAdmin(admin.id, payload)
        },
        onSuccess: (result: any) => {
            if (result.success || result.id) {
                queryClient.invalidateQueries({ queryKey: ["all-admins"] })
            }
        }
    })

    const form = useForm({
        defaultValues: {
            name: admin?.name || "",
            contactNumber: admin?.contactNumber || undefined,
            profilePhoto: undefined,
        } as IUpdateAdminPayload,

        onSubmit: async ({ value }) => {
            try {
                const result = await mutateAsync(value) as any

                if (!result.success && result.success !== undefined) {
                    toast.error(result.message || "Failed to update admin")
                    return
                }
                
                toast.success(result.message || "Admin updated successfully")
                onOpenChange(false)

            } catch (error: any) {
                toast.error(error?.message || "Failed to update admin")
            }
        }
    })

    // Update previews and form state when admin data changes or modal opens
    useEffect(() => {
        if (admin && isOpen) {
            form.setFieldValue("name", admin.name)
            form.setFieldValue("contactNumber", admin.contactNumber || undefined)
            form.setFieldValue("profilePhoto", undefined)
            setPreviewUrl(admin.profilePhoto || null)
        }
    }, [admin, isOpen])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, handleChange: (val: any) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            handleChange(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    if (!admin) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-blue-500 p-4 md:p-6 custom-scrollbar">
                <DialogHeader className="items-center text-center">
                    <div className="p-3 bg-blue-500/10 w-fit rounded-xl mb-2">
                        <Edit className="h-6 w-6 text-blue-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Update Admin Profile</DialogTitle>
                    <DialogDescription>
                        Modify the core information for {admin.name} below.
                    </DialogDescription>
                </DialogHeader>

                <form
                    method='POST'
                    action="#"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="flex flex-col space-y-8 mt-6"
                >
                    {/* Centered Profile Photo Section */}
                    <form.Field name="profilePhoto">
                        {(field) => (
                            <div className="flex flex-col items-center gap-3">
                                <div 
                                    className="relative group cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/20 group-hover:border-blue-500 transition-all duration-300 shadow-lg bg-gray-50 flex items-center justify-center">
                                        {previewUrl ? (
                                            <img 
                                                src={previewUrl} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-12 w-12 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="h-8 w-8 text-white" />
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, field.handleChange)}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-700">Profile Photo</p>
                                    <p className="text-xs text-muted-foreground">Click the circle to change</p>
                                </div>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-destructive font-medium">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <div className="grid grid-cols-2 gap-6">
                        <form.Field
                            name="name"
                            validators={{ onChange: updateAdminValidationSchema.shape.name }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2">
                                    <AppField
                                        field={field}
                                        label="Full Name"
                                        type="text"
                                        placeholder="Enter admin name"
                                        aria-label="Full Name"
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field 
                            name="contactNumber"
                            validators={{ onChange: updateAdminValidationSchema.shape.contactNumber }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2">
                                    <AppField
                                        field={field}
                                        label="Contact Number"
                                        type="text"
                                        placeholder="Enter admin contact number"
                                        aria-label="Contact Number"
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                        children={([canSubmit, isSubmitting]) => (
                            <DialogFooter className="pt-6 mt-4 border-t gap-2 shrink-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="min-w-[140px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                                    disabled={!canSubmit || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        )}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateAdminModal
