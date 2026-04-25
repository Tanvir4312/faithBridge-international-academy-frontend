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
import { Megaphone, Calendar, Layers, Hash, Info, User } from "lucide-react"
import { IGetSingleNoticeData } from "@/types/Dashboard/Common-types/getNotice.types"
import { formatDate } from "date-fns"

interface ViewClassNoticeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    notice: IGetSingleNoticeData | null;
    studentClass?: string;
}

const ViewClassNoticeModal = ({ open, onOpenChange, notice, studentClass }: ViewClassNoticeModalProps) => {
    if (!notice) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[98vw] sm:max-w-[700px] max-h-[92vh] p-0 overflow-y-auto border-none shadow-2xl rounded-[2.5rem] sm:rounded-3xl bg-background custom-scrollbar">
                <DialogHeader className="sr-only">
                    <DialogTitle>{notice.title}</DialogTitle>
                    <DialogDescription>
                        Full notice details and dissemination status.
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full">
                    {/* Header Banner - High Impact */}
                    <div className="bg-primary/10 p-8 sm:p-12 text-primary relative overflow-hidden border-b border-primary/10">
                        {/* Decorative Icon */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                            <Megaphone className="h-48 sm:h-64 w-48 sm:w-64" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="px-3 py-1 bg-primary text-white font-black text-[10px] tracking-widest uppercase">
                                    {notice.type?.replace("_", " ") || "NOTICE"}
                                </Badge>
                                <div className="flex items-center gap-2 text-primary/60">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">
                                        {formatDate(new Date(notice.createdAt), "MMMM d, yyyy")}
                                    </span>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-left leading-[1.1] uppercase">
                                {notice.title}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 sm:p-12 space-y-10 sm:space-y-12">
                        {/* Meta Info */}
                        {studentClass && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary/40">
                                        <Layers className="h-4 w-4" />
                                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Applicable Class</span>
                                    </div>
                                    <Badge className="px-4 py-2 bg-muted text-foreground font-black text-xs uppercase rounded-xl border-none shadow-sm w-fit">
                                        Class {studentClass}
                                    </Badge>
                                </div>
                            </div>
                        )}

                        {/* Message Body */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary/40">
                                <Megaphone className="h-4 w-4" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Content Body</span>
                            </div>
                            <div className="p-6 sm:p-10 bg-muted/30 rounded-[2rem] sm:rounded-[2.5rem] relative">
                                <div className="absolute top-6 right-8 text-primary/10 select-none">
                                    <Megaphone className="h-12 w-12" />
                                </div>
                                <p className="text-sm sm:text-xl font-medium leading-relaxed sm:leading-loose text-foreground/80 whitespace-pre-wrap text-left italic">
                                    "{notice.details || "No additional details provided."}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}

export default ViewClassNoticeModal
