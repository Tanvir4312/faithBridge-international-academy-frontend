"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, UserPlus, Loader2 } from "lucide-react"
import { toast } from 'sonner'
import { createAdmin } from "@/services/admin-srever-action/allAdmin.service"

import { createAdminValidationSchema, ICreateAdminPayload } from "@/zod/adminZodValidation"
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import AppField from '@/components/shared/AppField'

interface CreateAdminModalProps {
    onSuccess: () => void;
}

const CreateAdminModal = ({ onSuccess }: CreateAdminModalProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { mutateAsync } = useMutation({
        mutationFn: (payload: ICreateAdminPayload) => createAdmin(payload)
    })

    const form = useForm({
        defaultValues: {
            password: "",
            admin: {
                name: "",
                email: "",
                contactNumber: undefined,
                profilePhoto: undefined,
            },
            role: "ADMIN"
        } as unknown as ICreateAdminPayload,

        onSubmit: async ({ value }) => {
            try {
                const result = await mutateAsync(value) as any

                if (!result.success && result.success !== undefined) {
                    toast.error(result.message || "Failed to create admin")
                    return
                }

                toast.success(result.message || "Admin created successfully")
                onSuccess()
                setIsOpen(false)
                form.reset()

            } catch (error: any) {
                toast.error(error?.message || "Failed to create admin")
            }
        }
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Admin
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-primary p-4 md:p-6 custom-scrollbar">
                <DialogHeader>
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Create New Admin</DialogTitle>
                    <DialogDescription>
                        Add a new admin to the system. Fill in the required information below.
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
                    className="flex flex-col space-y-6 mt-4"
                >
                    <div className="grid grid-cols-2 gap-4">

                        <form.Field
                            name="admin.name"
                            validators={{ onChange: createAdminValidationSchema.shape.admin.shape.name }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1">
                                    <AppField
                                        field={field}
                                        label="Full Name"
                                        type="text"
                                        placeholder="Enter admin name"
                                        aria-label="Full Name"
                                        className='cursor-pointer'
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field
                            name="admin.email"
                            validators={{ onChange: createAdminValidationSchema.shape.admin.shape.email }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1">
                                    <AppField
                                        field={field}
                                        label="Email"
                                        type="email"
                                        placeholder="Enter admin email"
                                        aria-label="Email"
                                        className='cursor-pointer'
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field
                            name="password"
                            validators={{ onChange: createAdminValidationSchema.shape.password }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1">
                                    <AppField
                                        field={field}
                                        label="Password"
                                        type="password"
                                        placeholder="Enter admin password"
                                        aria-label="Password"
                                        className='cursor-pointer'
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* <form.Field name="role">
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1 text-left">
                                    <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                        Role <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(val) => field.handleChange(val as "ADMIN" | "SUPER_ADMIN")}
                                    >
                                        <SelectTrigger onBlur={field.handleBlur}>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                          
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </form.Field> */}

                        <form.Field
                            name="admin.contactNumber"
                            validators={{ onChange: createAdminValidationSchema.shape.admin.shape.contactNumber }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1">
                                    <AppField
                                        field={field}
                                        label="Contact Number"
                                        type="text"
                                        placeholder="Enter admin contact number"
                                        aria-label="Contact Number"
                                        className='cursor-pointer'
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field
                            name="admin.profilePhoto"
                            validators={{ onChange: createAdminValidationSchema.shape.admin.shape.profilePhoto }}
                        >
                            {(field) => (
                                <div className="grid gap-2 col-span-2 md:col-span-1">
                                    <AppField
                                        field={field}
                                        label="Profile Photo URL"
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        aria-label="Profile Photo URL"
                                        className='cursor-pointer'
                                    />
                                </div>
                            )}
                        </form.Field>

                    </div>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                        children={([canSubmit, isSubmitting]) => (
                            <DialogFooter className="pt-4 mt-4 border-t gap-2 shrink-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsOpen(false)
                                        form.reset()
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="min-w-[120px] font-bold"
                                    disabled={!canSubmit || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Admin"
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

export default CreateAdminModal
