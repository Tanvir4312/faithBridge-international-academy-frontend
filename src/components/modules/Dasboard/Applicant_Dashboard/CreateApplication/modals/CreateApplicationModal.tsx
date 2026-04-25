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
import { FileText, UserPlus, Loader2, Plus } from "lucide-react"
import { toast } from 'sonner'
import { createApplication } from "@/services/applicant-server-action/application.service"
import { createStudentApplicationSchema, ICreateApplicationPayload } from "@/zod/applicationZodValidation"
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import AppField from '@/components/shared/AppField'
import { Gender } from '@/types/Dashboard/shared_Enums/enums'
import { getAllClass } from '@/services/admin-srever-action/class-managements.service'
import { getAllAcademicLevel } from '@/services/admin-srever-action/academicLevel.service'

interface CreateApplicationModalProps {
    onSuccess: (data: any) => void;
    currentYear?: string;
}

const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }
    }
    return String(error);
}

const CreateApplicationModal = ({ onSuccess, currentYear }: CreateApplicationModalProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { data: classesResponse } = useQuery({
        queryKey: ["classes"],
        queryFn: getAllClass
    })

    const { data: levelsResponse } = useQuery({
        queryKey: ["academic-levels"],
        queryFn: getAllAcademicLevel
    })

    // Handle potential double nesting or direct array
    const classesFromApi = Array.isArray((classesResponse as any)?.data)
        ? (classesResponse as any).data
        : (classesResponse as any)?.data?.data || [];

    const academicLevels = Array.isArray((levelsResponse as any)?.data)
        ? (levelsResponse as any).data
        : (levelsResponse as any)?.data?.data || [];

    // Extract classes from levels as a fallback
    const classesFromLevels = academicLevels.flatMap((level: any) => level.classes || []);

    // Prioritize direct classes, then flattened classes
    const classes = classesFromApi?.length > 0 ? classesFromApi : classesFromLevels;



    const { mutateAsync } = useMutation({
        mutationFn: (payload: FormData) => createApplication(payload)
    })

    const form = useForm({
        defaultValues: {
            nameBn: "",
            nameEn: "",
            fatherName: "",
            motherName: "",
            guardianMobile: "",
            studentMobile: "",
            dob: undefined as any,
            gender: undefined as any,
            religion: "",
            bloodGroup: "",
            birthCertificateNo: "",
            presentAddress: "",
            permanentAddress: "",
            previousSchool: "",
            desiredClass: "",
            admissionYear: currentYear || new Date().getFullYear().toString(),
            profileImage: undefined,
        } as unknown as ICreateApplicationPayload,

        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData()

                // Append all fields to FormData
                Object.entries(value)?.forEach(([key, val]) => {
                    if (val !== undefined && val !== null && val !== "") {
                        if (key === "dob" && val instanceof Date) {
                            formData.append(key, val.toISOString())
                        } else if (key === "profileImage" && val instanceof File) {
                            formData.append(key, val)
                        } else {
                            formData.append(key, String(val))
                        }
                    }
                })

                const result = await mutateAsync(formData)

                if (!result.success) {
                    toast.error(result.message || "Failed to create application")
                    return
                }

                toast.success(result.message || "Application created successfully")
                onSuccess(result.data)
                setIsOpen(false)
                form.reset()

            } catch (error: any) {
                toast.error(error?.message || "Failed to create application")
            }
        }
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold flex items-center gap-2 rounded-xl">
                    <Plus className="h-5 w-5" />
                    Create Application
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-primary p-4 md:p-6 custom-scrollbar">
                <DialogHeader>
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">New Admission Application</DialogTitle>
                    <DialogDescription>
                        Please fill in the following information correctly for the admission application.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name BN */}
                        <form.Field
                            name="nameBn"
                            validators={{ onChange: createStudentApplicationSchema.shape.nameBn }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="নাম (বাংলায়)"
                                    placeholder="বাংলায় পূর্ণ নাম লিখুন"
                                />
                            )}
                        </form.Field>

                        {/* Name EN */}
                        <form.Field
                            name="nameEn"
                            validators={{ onChange: createStudentApplicationSchema.shape.nameEn }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Name (English)"
                                    placeholder="Enter full name in English"
                                />
                            )}
                        </form.Field>

                        {/* Father Name */}
                        <form.Field
                            name="fatherName"
                            validators={{ onChange: createStudentApplicationSchema.shape.fatherName }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Father's Name"
                                    placeholder="Enter father's name"
                                />
                            )}
                        </form.Field>

                        {/* Mother Name */}
                        <form.Field
                            name="motherName"
                            validators={{ onChange: createStudentApplicationSchema.shape.motherName }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Mother's Name"
                                    placeholder="Enter mother's name"
                                />
                            )}
                        </form.Field>

                        {/* Guardian Mobile */}
                        <form.Field
                            name="guardianMobile"
                            validators={{ onChange: createStudentApplicationSchema.shape.guardianMobile }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Guardian Mobile"
                                    placeholder="017XXXXXXXX"
                                />
                            )}
                        </form.Field>

                        {/* Student Mobile */}
                        <form.Field
                            name="studentMobile"
                            validators={{ onChange: createStudentApplicationSchema.shape.studentMobile }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Student Mobile (Optional)"
                                    placeholder="017XXXXXXXX"
                                />
                            )}
                        </form.Field>

                        {/* DOB */}
                        <form.Field
                            name="dob"
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label className={field.state.meta.errors?.length > 0 ? "text-destructive" : ""}>Date of Birth</Label>
                                    <input
                                        type="date"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        onChange={(e) => field.handleChange(new Date(e.target.value))}
                                        onBlur={field.handleBlur}
                                    />
                                    {field.state.meta.errors?.length > 0 && (
                                        <p className="text-sm text-destructive">{getErrorMessage(field.state.meta.errors[0])}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Gender */}
                        <form.Field
                            name="gender"
                            validators={{ onChange: createStudentApplicationSchema.shape.gender }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label className={field.state.meta.errors?.length > 0 ? "text-destructive" : ""}>Gender</Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(val) => {

                                            field.handleChange(val as Gender);
                                        }}
                                    >
                                        <SelectTrigger onBlur={field.handleBlur}>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {field.state.meta.errors?.length > 0 && (
                                        <p className="text-sm text-destructive">{getErrorMessage(field.state.meta.errors[0])}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Religion */}
                        <form.Field
                            name="religion"
                            validators={{ onChange: createStudentApplicationSchema.shape.religion }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Religion"
                                    placeholder="Enter religion"
                                />
                            )}
                        </form.Field>

                        {/* Birth Certificate No */}
                        <form.Field
                            name="birthCertificateNo"
                            validators={{ onChange: createStudentApplicationSchema.shape.birthCertificateNo }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Birth Certificate No"
                                    placeholder="Enter certificate number"
                                />
                            )}
                        </form.Field>

                        {/* previousSchool */}
                        <form.Field
                            name="previousSchool"
                            validators={{ onChange: createStudentApplicationSchema.shape.previousSchool }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Previous School"
                                    placeholder="Enter previous school"
                                />
                            )}
                        </form.Field>

                        {/* Desired Class */}
                        <form.Field
                            name="desiredClass"
                            validators={{ onChange: createStudentApplicationSchema.shape.desiredClass }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label className={field.state.meta.errors?.length > 0 ? "text-destructive" : ""}>Desired Class</Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(val) => {

                                            field.handleChange(val);
                                        }}
                                    >
                                        <SelectTrigger onBlur={field.handleBlur}>
                                            <SelectValue placeholder="Select Class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes?.map((item: any) => (
                                                <SelectItem key={item.id} value={item.name}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {field.state.meta.errors?.length > 0 && (
                                        <p className="text-sm text-destructive">{getErrorMessage(field.state.meta.errors[0])}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Admission Year */}
                        <form.Field
                            name="admissionYear"
                            validators={{ onChange: createStudentApplicationSchema.shape.admissionYear }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Admission Year"
                                    disabled
                                />
                            )}
                        </form.Field>

                        {/* Present Address */}
                        <form.Field
                            name="presentAddress"
                            validators={{ onChange: createStudentApplicationSchema.shape.presentAddress }}
                        >
                            {(field) => (
                                <div className="col-span-1 md:col-span-2">
                                    <AppField
                                        field={field}
                                        label="Present Address"
                                        placeholder="Enter full present address"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Permanent Address */}
                        <form.Field
                            name="permanentAddress"
                            validators={{ onChange: createStudentApplicationSchema.shape.permanentAddress }}
                        >
                            {(field) => (
                                <div className="col-span-1 md:col-span-2">
                                    <AppField
                                        field={field}
                                        label="Permanent Address"
                                        placeholder="Enter full permanent address"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Profile Image */}
                        <form.Field
                            name="profileImage"
                            validators={{ onChange: createStudentApplicationSchema.shape.profileImage }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Profile Image"
                                    type="file"
                                />
                            )}
                        </form.Field>

                        {/* Blood Group */}
                        <form.Field
                            name="bloodGroup"
                            validators={{ onChange: createStudentApplicationSchema.shape.bloodGroup }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Blood Group (Optional)"
                                    placeholder="e.g. A+"
                                />
                            )}
                        </form.Field>
                    </div>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                        children={([canSubmit, isSubmitting]) => (
                            <DialogFooter className="pt-4 border-t gap-2">
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
                                    className="min-w-[150px] font-bold"
                                    disabled={!canSubmit || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Application"
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

export default CreateApplicationModal

