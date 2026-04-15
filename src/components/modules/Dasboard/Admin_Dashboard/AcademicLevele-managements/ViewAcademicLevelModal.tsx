"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, BookOpen, Layers, Info } from "lucide-react"
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import { format } from 'date-fns'

interface ViewAcademicLevelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    level: IAcademicLevel;
}

const ViewAcademicLevelModal = ({ open, onOpenChange, level }: ViewAcademicLevelModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 overflow-hidden border-none shadow-2xl custom-scrollbar">
                {/* Accessibility titles (Visually hidden is best, but we'll use a screen-reader-only approach if utility exists, or just render them at 0 height) */}
                <DialogHeader className="sr-only">
                    <DialogTitle>Academic Level Details: {level.name}</DialogTitle>
                    <DialogDescription>
                        View detailed information about the {level.name} academic tier.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative h-48 bg-muted">
                    {level.image ? (
                        <img 
                            src={level.image} 
                            alt={level.name} 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                            <Layers className="h-16 w-16 text-primary/20" />
                        </div>
                    )
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-primary hover:bg-primary font-bold">ACADEMIC TIER</Badge>
                        </div>
                        <h2 className="text-3xl font-bold text-white">{level.name}</h2>
                    </div>
                </div>

                <div className="p-6 space-y-8 bg-background">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> Created At
                            </span>
                            <p className="font-medium">{format(new Date(level.createdAt), 'MMMM dd, yyyy')}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1 justify-end">
                                <BookOpen className="h-3 w-3" /> Classes
                            </span>
                            <p className="font-medium">{level.classes?.length || 0} Associated</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                            <Info className="h-3 w-3" /> Description
                        </span>
                        <div className="p-4 rounded-xl bg-muted/30 border text-sm leading-relaxed italic text-muted-foreground">
                            {level.description || "No detailed description available for this academic level."}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                            <Layers className="h-3 w-3" /> Associated Classes
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {level.classes && level.classes.length > 0 ? (
                                level.classes.map((cls) => (
                                    <Badge key={cls.id} variant="secondary" className="px-3 py-1 font-bold text-xs ring-1 ring-primary/10">
                                        {cls.name}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic">No classes are currently mapped to this level.</p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewAcademicLevelModal
