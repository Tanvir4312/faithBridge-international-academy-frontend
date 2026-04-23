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
import { Calendar, BookOpen, Layers, Info } from "lucide-react"
import { IAcademicLevel } from '@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"

interface ViewAcademicLevelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    level: IAcademicLevel;
}

const ViewAcademicLevelModal = ({ open, onOpenChange, level }: ViewAcademicLevelModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[98vw] sm:max-w-[600px] h-auto max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-[2.5rem] sm:rounded-3xl flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>Academic Level Details: {level.name}</DialogTitle>
                    <DialogDescription>
                        View detailed information about the {level.name} academic tier.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Visual Banner - Responsive Height */}
                    <div className="relative h-40 sm:h-52 bg-muted overflow-hidden">
                        {level.image ? (
                            <img
                                src={level.image}
                                alt={level.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                <Layers className="h-16 sm:h-20 w-16 sm:w-20 text-primary/10" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-primary hover:bg-primary font-black text-[8px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 border-none">ACADEMIC TIER</Badge>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tighter">{level.name}</h2>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 space-y-8 sm:space-y-10 bg-background text-left">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-8">
                            <div className="space-y-1.5 text-left">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" /> Founded
                                </span>
                                <p className="font-black text-foreground text-xs sm:text-lg">{format(new Date(level.createdAt), 'MMMM dd, yyyy')}</p>
                            </div>
                            <div className="space-y-1.5 text-right">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-1.5 justify-end">
                                    <BookOpen className="h-3 w-3" /> Statistics
                                </span>
                                <p className="font-black text-foreground text-xs sm:text-lg">{level.classes?.length || 0} Active Classes</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3 text-left">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-1.5">
                                <Info className="h-3.5 w-3.5" /> Dossier Overview
                            </span>
                            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-muted/20 border-2 border-dashed border-muted-foreground/10 text-xs sm:text-sm leading-relaxed font-bold italic text-muted-foreground/80 shadow-inner">
                                {level.description || "Historical records for this academic level have not yet been categorized."}
                            </div>
                        </div>

                        {/* Associated Classes */}
                        <div className="space-y-4 text-left">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5" /> Academic Roster
                                </span>
                                <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary">{level.classes?.length || 0} CLASSES</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {level.classes && level.classes?.length > 0 ? (
                                    level.classes?.map((cls) => (
                                        <Badge key={cls.id} variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-black text-[9px] sm:text-xs tracking-tight bg-muted/50 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-0.5 cursor-default border-none shadow-sm">
                                            {cls.name.toUpperCase()}
                                        </Badge>
                                    ))
                                ) : (
                                    <div className="w-full p-6 text-center rounded-2xl bg-muted/10 border border-dashed border-muted-foreground/20">
                                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">No active classes found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Action for Mobile */}
                        <div className="pt-4 border-t border-dashed">
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="w-full h-12 rounded-xl sm:rounded-2xl font-black bg-primary/10 hover:bg-primary/20 text-primary border-none text-[10px] sm:text-xs uppercase tracking-widest transition-all active:scale-95"
                            >
                                Close Records
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewAcademicLevelModal
