"use client"

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, Loader2, Save } from "lucide-react"
import { toast } from 'sonner'
import { updateAcademicLevel } from "@/services/admin-srever-action/academicLevel.service"
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'

interface UpdateAcademicLevelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    level: IAcademicLevel;
    onSuccess: () => void;
}

const UpdateAcademicLevelModal = ({ open, onOpenChange, level, onSuccess }: UpdateAcademicLevelModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(level.image)

    useEffect(() => {
        setPreviewImage(level.image)
    }, [level])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        setIsSubmitting(true)
        try {
            await updateAcademicLevel(level.id, formData)
            toast.success("Academic level updated successfully")
            onSuccess()
        } catch (error: any) {
            toast.error(error?.message || "Failed to update academic level")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto border-t-4 border-t-blue-600 custom-scrollbar">
                <DialogHeader>
                    <div className="p-3 bg-blue-50 w-fit rounded-xl mb-2">
                        <Save className="h-6 w-6 text-blue-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Update Academic Level</DialogTitle>
                    <DialogDescription>
                        Modify the details for the <span className="font-bold text-foreground">"{level.name}"</span> tier.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Level Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={level.name}
                                placeholder="e.g., Primary School"
                                className="h-11 border-blue-200 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={level.description}
                                placeholder="Briefly describe this academic level..."
                                className="min-h-[100px] border-blue-200 focus:border-blue-500 resize-none"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Update Image
                            </Label>
                            <div className="relative group">
                                <label
                                    htmlFor="update-image"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-blue-50/30 hover:bg-blue-50/50 transition-all overflow-hidden"
                                >
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-blue-400 mb-2" />
                                            <p className="text-xs text-muted-foreground">Change image</p>
                                        </div>
                                    )}
                                    <input 
                                        id="update-image" 
                                        name="image" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <Upload className="h-6 w-6 text-white" />
                                            <span className="text-[10px] text-white font-bold uppercase">Click to change</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t gap-2">
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
                            className="min-w-[120px] font-bold bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Level"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateAcademicLevelModal
