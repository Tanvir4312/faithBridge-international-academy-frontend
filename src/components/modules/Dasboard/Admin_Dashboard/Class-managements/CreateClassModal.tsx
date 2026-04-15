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
import { Plus, School, Loader2, Users } from "lucide-react"
import { toast } from 'sonner'
import { createClass } from "@/services/admin-srever-action/class-managements.service"
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import { ITeacher } from '@/types/Dashboard/admin-dashboard-types/teachers-managements'

interface CreateClassModalProps {
    academicLevels: IAcademicLevel[];
    teachers: ITeacher[];
    onSuccess: () => void;
}

const CreateClassModal = ({ academicLevels, teachers, onSuccess }: CreateClassModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        section: "",
        academicLevelId: "",
        teacherId: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.name || !formData.academicLevelId) {
            toast.error("Please fill in required fields")
            return
        }

        setIsSubmitting(true)
        try {
            await createClass(formData)
            toast.success("Class created successfully")
            onSuccess()
            setIsOpen(false)
            setFormData({ name: "", section: "", academicLevelId: "", teacherId: "" })
        } catch (error: any) {
            toast.error(error?.message || "Failed to create class")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Class
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto border-t-4 border-t-primary custom-scrollbar">
                <DialogHeader>
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <School className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Create New Class</DialogTitle>
                    <DialogDescription>
                        Set up a new classroom and assign it to an academic level and teacher.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 col-span-2 md:col-span-1">
                            <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Class Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                placeholder="e.g., Grade 10"
                                required
                            />
                        </div>
                        <div className="grid gap-2 col-span-2 md:col-span-1">
                            <Label htmlFor="section" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Section
                            </Label>
                            <Input
                                id="section"
                                value={formData.section}
                                onChange={(e) => setFormData(p => ({ ...p, section: e.target.value }))}
                                placeholder="e.g., A, Blue, Pegasus"
                            />
                        </div>

                        <div className="grid gap-2 col-span-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Academic Level <span className="text-red-500">*</span>
                            </Label>
                            <Select 
                                value={formData.academicLevelId} 
                                onValueChange={(val) => setFormData(p => ({ ...p, academicLevelId: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Academic Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {academicLevels.map((level) => (
                                        <SelectItem key={level.id} value={level.id}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2 col-span-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Users className="h-3 w-3" /> Class Teacher
                            </Label>
                            <Select 
                                value={formData.teacherId} 
                                onValueChange={(val) => setFormData(p => ({ ...p, teacherId: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign a Teacher (Optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map((teacher) => (
                                        <SelectItem key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                "Save Class"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateClassModal
