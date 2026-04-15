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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, Image as ImageIcon, Loader2 } from "lucide-react"
import { toast } from 'sonner'
import { createAcademicLevel } from "@/services/admin-srever-action/academicLevel.service"

interface CreateAcademicLevelModalProps {
    onSuccess: () => void;
}

const CreateAcademicLevelModal = ({ onSuccess }: CreateAcademicLevelModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        const name = formData.get('name') as string
        if (!name) {
            toast.error("Name is required")
            return
        }

        setIsSubmitting(true)
        try {
            await createAcademicLevel(formData)
            toast.success("Academic level created successfully")
            onSuccess()
            setIsOpen(false)
            setPreviewImage(null)
        } catch (error: any) {
            toast.error(error?.message || "Failed to create academic level")
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Level
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto border-t-4 border-t-primary custom-scrollbar">
                <DialogHeader>
                    <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
                        <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Create Academic Level</DialogTitle>
                    <DialogDescription>
                        Define a new academic tier for your school system.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Level Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Primary School, High School"
                                className="h-11 border-primary/20 focus:border-primary"
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
                                placeholder="Briefly describe this academic level..."
                                className="min-h-[100px] border-primary/20 focus:border-primary resize-none"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Level Image
                            </Label>
                            <div className="relative group">
                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all overflow-hidden"
                                >
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-primary/50 mb-2" />
                                            <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                                        </div>
                                    )}
                                    <input 
                                        id="image" 
                                        name="image" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {previewImage && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Upload className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                </label>
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
                                "Save Level"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAcademicLevelModal
