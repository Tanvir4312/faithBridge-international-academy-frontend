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
import { Plus, Loader2, Calendar } from "lucide-react"
import { toast } from 'sonner'
import { createExam } from '@/services/admin-srever-action/exams-managements.service'

interface CreateExamsModalProps {
    onSuccess: () => void;
}

const CreateExamsModal = ({ onSuccess }: CreateExamsModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        const payload = {
            name: formData.get('name') as string,
            year: formData.get('year') as string,
            formFillupStart: formData.get('formFillupStart') as string,
            formFillupEnd: formData.get('formFillupEnd') as string,
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
                <Button className="font-bold flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Exam
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-t-4 border-t-primary">
                <DialogHeader>
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Create New Exam</DialogTitle>
                    <DialogDescription>
                        Schedule a new examination for the academic year.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Exam Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Final Exam 2024"
                                className="h-11 border-primary/20 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="year" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Academic Year <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="year"
                                name="year"
                                placeholder="e.g., 2024"
                                className="h-11 border-primary/20 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="formFillupStart" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    Fillup Start <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="formFillupStart"
                                    name="formFillupStart"
                                    type="datetime-local"
                                    className="h-11 border-primary/20 focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="formFillupEnd" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    Fillup End <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="formFillupEnd"
                                    name="formFillupEnd"
                                    type="datetime-local"
                                    className="h-11 border-primary/20 focus:border-primary"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="min-w-[120px] font-bold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Save Exam"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateExamsModal
