"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Megaphone, Loader2, Save, Layers, Type, FileText } from "lucide-react"
import { createNotice } from '@/services/admin-srever-action/notices-managements'
import { getAllClass } from '@/services/admin-srever-action/class-managements.service'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CreateNoticeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    refetch: () => void;
}

const CreateNoticeModal = ({ open, onOpenChange, refetch }: CreateNoticeModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [noticeType, setNoticeType] = useState<"GENERAL" | "CLASS_SPECIFIC">("GENERAL")
    const [selectedClasses, setSelectedClasses] = useState<string[]>([])

    const { data: classResponse } = useQuery({
        queryKey: ["classes"],
        queryFn: getAllClass,
        enabled: open
    })

    const classes = classResponse?.data || []

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const payload: any = {
            title: formData.get("title") as string,
            details: formData.get("details") as string,
            type: noticeType,
        }

        if (noticeType === "CLASS_SPECIFIC") {
            payload.noticeClasses = selectedClasses
        }

        try {
            const res = await createNotice(payload)
            if (res.success) {
                toast.success("Notice published successfully")
                refetch()
                onOpenChange(false)
                setSelectedClasses([])
                setNoticeType("GENERAL")
            } else {
                toast.error(res.message || "Failed to create notice")
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleClass = (classId: string) => {
        setSelectedClasses(prev =>
            prev.includes(classId)
                ? prev.filter(id => id !== classId)
                : [...prev, classId]
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[98vw] sm:max-w-[600px] max-h-[92vh] sm:max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] sm:rounded-3xl bg-background flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>Create New Notice</DialogTitle>
                    <DialogDescription>
                        Draft and publish announcements for the school community.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {/* Header Banner */}
                    <div className="bg-primary p-8 sm:p-12 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Megaphone className="h-32 sm:h-52 w-32 sm:w-52" />
                        </div>
                        <div className="relative z-10 space-y-1 sm:space-y-2 text-left">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-md">
                                    <Megaphone className="h-5 sm:h-7 w-5 sm:w-7 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-4xl font-black tracking-tighter text-white m-0 uppercase">Board</h2>
                            </div>
                            <p className="text-white/70 text-[10px] sm:text-sm font-bold sm:ml-[72px] text-left uppercase tracking-widest">New Announcement</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-12 space-y-8 sm:space-y-10 text-left">
                        <div className="space-y-6 sm:space-y-8 text-left">

                            {/* Headline Input - Explicit Side Paddings */}
                            <div className="space-y-2 sm:space-y-3 text-left">
                                <Label htmlFor="title" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Headline</Label>
                                <div className="relative text-left flex items-center">
                                    <Type className="absolute left-5 h-4 w-4 text-primary z-20" />
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="What's this about?"
                                        required
                                        className="pl-14 h-12 sm:h-14 rounded-xl sm:rounded-[1.5rem] border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-black text-sm sm:text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3 text-left">
                                <Label htmlFor="type" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Scope</Label>
                                <Select
                                    value={noticeType}
                                    onValueChange={(val: any) => setNoticeType(val)}
                                >
                                    <SelectTrigger className="h-12 sm:h-14 rounded-xl sm:rounded-[1.5rem] border-muted-foreground/20 font-black text-xs sm:text-md pl-6 bg-muted/20">
                                        <div className="flex items-center gap-2">
                                            <Layers className="h-4 w-4 text-primary" />
                                            <SelectValue placeholder="Select type" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="GENERAL" className="font-bold text-xs sm:text-sm">General Announcement</SelectItem>
                                        <SelectItem value="CLASS_SPECIFIC" className="font-bold text-xs sm:text-sm">Specific Classes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {noticeType === "CLASS_SPECIFIC" && (
                                <div className="space-y-3 sm:space-y-4 animate-in zoom-in-95 duration-300 text-left">
                                    <Label className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Target List</Label>
                                    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-muted-foreground/30 bg-muted/10">
                                        <ScrollArea className="h-[140px] sm:h-[180px] pr-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-left">
                                                {classes.map((cls) => (
                                                    <div key={cls.id} className="flex items-center space-x-3 sm:space-x-4 group justify-start p-1.5 sm:p-2 rounded-xl hover:bg-background transition-colors">
                                                        <Checkbox
                                                            id={cls.id}
                                                            checked={selectedClasses.includes(cls.id)}
                                                            onCheckedChange={() => toggleClass(cls.id)}
                                                            className="h-5 sm:h-6 w-5 sm:w-6 rounded-md sm:rounded-lg border-primary/20 data-[state=checked]:bg-primary"
                                                        />
                                                        <label
                                                            htmlFor={cls.id}
                                                            className="text-sm font-black text-foreground/60 group-hover:text-primary transition-colors cursor-pointer text-left uppercase tracking-tight"
                                                        >
                                                            {cls.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                </div>
                            )}

                            {/* Message Body - Explicit Side Paddings to Fix Stacked Icon */}
                            <div className="space-y-2 sm:space-y-3 text-left">
                                <Label htmlFor="details" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Message Body</Label>
                                <div className="relative text-left">
                                    <FileText className="absolute left-6 top-6 h-4 w-4 text-primary z-20 pointer-events-none" />
                                    <Textarea
                                        id="details"
                                        name="details"
                                        placeholder="Type your announcement here..."
                                        rows={6}
                                        className="rounded-2xl sm:rounded-[2rem] border-muted-foreground/20 focus-visible:ring-primary shadow-inner bg-muted/20 font-bold min-h-[160px] sm:min-h-[200px] text-xs sm:text-base leading-relaxed pt-5 pr-5 pb-5 pl-14"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons Group */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-10 border-t border-dashed">
                            <Button
                                type="submit"
                                disabled={isSubmitting || (noticeType === "CLASS_SPECIFIC" && selectedClasses.length === 0)}
                                className="w-full sm:flex-1 h-12 sm:h-16 rounded-xl sm:rounded-3xl font-black bg-primary hover:bg-primary/90 text-white gap-2 sm:gap-3 shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 text-xs sm:text-lg uppercase tracking-widest"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Megaphone className="h-5 w-5" />}
                                Broadcast
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="w-full sm:w-auto h-12 sm:h-16 rounded-xl sm:rounded-3xl font-black text-muted-foreground hover:bg-muted border-2 border-muted px-8 text-[10px] sm:text-sm uppercase tracking-widest"
                            >
                                Discard
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoticeModal
