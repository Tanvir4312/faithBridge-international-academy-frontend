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
import { Input } from "@/components/ui/input"
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
import { createTeacher } from "@/services/admin-srever-action/teachers-managements.service"


import { Gender } from "@/types/Dashboard/shared_Enums/enums"
import { createTeacherValidationSchema, ICreateTeacherPayload } from "@/zod/teacherZodValidation"
import { useForm } from '@tanstack/react-form'

import { useMutation } from '@tanstack/react-query'
import AppField from '@/components/shared/AppField'


interface CreateTeacherModalProps {
    onSuccess: () => void;
}

const CreateTeacherModal = ({ onSuccess }: CreateTeacherModalProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ICreateTeacherPayload) => createTeacher(payload)
    })

    const form = useForm({
        defaultValues: {
            password: "",
            teacher: {
                name: "",
                email: "",
                contactNumber: "",
                address: undefined,
                qualification: "",
                gender: Gender,
                profilePhoto: undefined,
                isDeleted: false,
                designation: ""
            }
        } as any,

        onSubmit: async ({ value }) => {
            try {
                const result = await mutateAsync(value) as any

                if (!result.success) {
                    toast.error(result.message)
                    return
                }
                toast.success(result.message)
                onSuccess()
                setIsOpen(false)
                form.reset()

            } catch (error: any) {
                toast.error(error?.message || "Failed to create teacher")
            }
            // Run strict validation before making API call
            // const validation = createTeacherValidationSchema.safeParse(value);
            // if (!validation.success) {
            //     toast.error(validation.error.issues[0].message);
            //     return;
            // }

            // const payload = {
            //     password: value.password,
            //     teacher: {
            //         name: value.teacher.name,
            //         email: value.teacher.email,
            //         contactNumber: value.teacher.contactNumber,
            //         address: value.teacher.address,
            //         qualification: value.teacher.qualification,
            //         gender: value.teacher.gender,
            //         profilePhoto: value.teacher.profilePhoto,
            //         isDeleted: false,
            //         designation: value.teacher.designation
            //     }
            // }

            // try {
            //     await createTeacher(payload)
            //     toast.success("Teacher created successfully")
            //     onSuccess()
            //     setIsOpen(false)
            //     form.reset()
            // } catch (error: any) {
            //     toast.error(error?.message || "Failed to create teacher")
            // }
        }
    })

    // const FieldError = ({ state }: { state: any }) => {
    //     if (!state.meta.errors.length) return null;
    //     return (
    //         <p className="text-sm font-semibold text-red-500 mt-1">
    //             {state.meta.errors.join(", ")}
    //         </p>
    //     );
    // };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Teacher
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95vw] md:w-full max-h-[95vh] flex flex-col overflow-hidden border-t-4 border-t-primary p-4 md:p-6 custom-scrollbar">
                <DialogHeader className="shrink-0">
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Create New Teacher</DialogTitle>
                    <DialogDescription>
                        Add a new teacher to the system. Fill in the required information below.
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
                    className="flex flex-col flex-1 overflow-hidden min-h-0"
                >
                    <div className="flex-1 overflow-y-auto pr-2 pb-2 pt-4 custom-scrollbar">
                        <div className="grid grid-cols-2 gap-4">

                            <form.Field
                                name="teacher.name"
                                validators={{ onChange: createTeacherValidationSchema.shape.teacher.shape.name }}
                            >
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Full Name"
                                            type="text"
                                            placeholder="Enter teacher name"
                                            aria-label="Full Name"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field
                                name="teacher.email"
                                validators={{ onChange: createTeacherValidationSchema.shape.teacher.shape.email }}
                            >
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Email"
                                            type="email"
                                            placeholder="Enter teacher email"
                                            aria-label="Email"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field
                                name="password"
                                validators={{ onChange: createTeacherValidationSchema.shape.password }}
                            >
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Password"
                                            type="password"
                                            placeholder="Enter teacher password"
                                            aria-label="Password"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.designation">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Designation"
                                            type="text"
                                            placeholder="Enter teacher designation"
                                            aria-label="Designation"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.qualification">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Qualification"
                                            type="text"
                                            placeholder="Enter teacher qualification"
                                            aria-label="Qualification"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.gender">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">

                                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                            Gender <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(val) => field.handleChange(val as Gender | "")}
                                        >
                                            <SelectTrigger onBlur={field.handleBlur}>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.contactNumber">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Contact Number"
                                            type="text"
                                            placeholder="Enter teacher contact number"
                                            aria-label="Contact Number"
                                            className='cursor-pointer'
                                        />

                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.address">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2 md:col-span-1">
                                        <AppField
                                            field={field}
                                            label="Address"
                                            type="text"
                                            placeholder="Enter teacher address"
                                            aria-label="Address"
                                            className='cursor-pointer'
                                        />

                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="teacher.profilePhoto">
                                {(field) => (
                                    <div className="grid gap-2 col-span-2">
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
                                        "Create Teacher"
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

export default CreateTeacherModal
