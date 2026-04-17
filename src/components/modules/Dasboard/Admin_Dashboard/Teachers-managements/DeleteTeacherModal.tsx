"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements.types"
import {
    X,
    Trash2,
    AlertTriangle,
    ShieldAlert,
    User,
    CheckCircle2
} from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTeacher } from "@/services/admin-srever-action/teachers-managements.service"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface DeleteTeacherModalProps {
    teacher: ITeacher | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const DeleteTeacherModal = ({ teacher, isOpen, onOpenChange }: DeleteTeacherModalProps) => {

    const queryClient = useQueryClient()
    const [isConfirming, setIsConfirming] = useState(false)

    const mutation = useMutation({
        mutationFn: () => deleteTeacher(teacher!.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] })
            toast.success("Teacher record terminated", {
                description: "The registry has been updated and sessions have been purged.",
                icon: <CheckCircle2 className="text-emerald-500" />
            })
            setIsConfirming(false)
            onOpenChange(false)
        },
        onError: (error: any) => {
            toast.error(error?.message || "Critical failure during deletion")
        }
    })

    if (!teacher) return null

    return (
        <>
            {/* Stage 1: Review Modal */}
            <Dialog open={isOpen} onOpenChange={(open) => {
                if (!open) setIsConfirming(false)
                onOpenChange(open)
            }}>
                <DialogContent
                    showCloseButton={false}
                    className="max-w-[95vw] md:max-w-xl p-0 border-none shadow-2xl rounded-[2rem] md:rounded-[3rem] bg-background overflow-hidden focus-visible:outline-none"
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle>Teacher Registry Termination</DialogTitle>
                        <DialogDescription>Review teacher details before finalizing deletion for {teacher.name}</DialogDescription>
                    </DialogHeader>

                    {/* Security Banner */}
                    <div className="relative bg-rose-600 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                        <div className="flex items-center gap-3 md:gap-4 text-white relative z-10">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                <ShieldAlert size={18} className="md:w-5 md:h-5" />
                            </div>
                            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Security Clearance Required</h2>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white/20 text-white relative z-10 transition-transform active:scale-90">
                                <X size={16} />
                            </Button>
                        </DialogClose>
                    </div>

                    <div className="p-6 md:p-10 space-y-8 md:space-y-10 text-center max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {/* Target Identification */}
                        <div className="space-y-6 flex flex-col items-center">
                            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-rose-100 p-1 relative group">
                                <div className="h-full w-full rounded-full overflow-hidden relative bg-muted flex items-center justify-center shadow-inner">
                                    {teacher.profilePhoto ? (
                                        <Image
                                            src={teacher.profilePhoto}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <User size={36} className="text-muted-foreground/30" />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
                                    <Trash2 size={14} className="md:w-4 md:h-4" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Badge variant="outline" className="border-rose-200 text-rose-600 font-black uppercase text-[8px] md:text-[9px] tracking-widest px-4 py-0.5 rounded-full">
                                    Record Marked for Termination
                                </Badge>
                                <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
                                    {teacher.name}
                                </h3>
                                <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Registry ID: {teacher.id}</p>
                            </div>
                        </div>

                        {/* Impact Warning */}
                        <div className="p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-amber-50/80 border border-amber-100 flex items-start gap-4 text-left">
                            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                            <div className="space-y-1">
                                <p className="text-[10px] md:text-[11px] font-black uppercase text-amber-900 leading-none">System Consequences</p>
                                <p className="text-[11px] md:text-xs font-medium text-amber-800/70 leading-relaxed">
                                    Soft-deleting this teacher will revoke all active sessions, invalidate subject assignments, and move the record to the encrypted archive.
                                </p>
                            </div>
                        </div>

                        {/* Action Grid */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                            <Button
                                variant="ghost"
                                className="order-2 sm:order-1 flex-1 h-12 md:h-14 rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-muted"
                                onClick={() => onOpenChange(false)}
                            >
                                Abort Removal
                            </Button>
                            <Button
                                className="order-1 sm:order-2 flex-1 h-12 md:h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all"
                                onClick={() => setIsConfirming(true)}
                            >
                                Finalize Record
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Stage 2: Final Confirmation */}
            <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
                <DialogContent
                    showCloseButton={false}
                    className="max-w-[90vw] md:max-w-sm p-0 border-none shadow-4xl rounded-[2rem] bg-white overflow-hidden z-[100] focus-visible:outline-none"
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle>Confirm Record Deletion</DialogTitle>
                        <DialogDescription>Final security check before record removal</DialogDescription>
                    </DialogHeader>

                    <div className="p-8 md:p-10 space-y-8 text-center">
                        <div className="flex justify-center">
                            <div className="p-4 md:p-5 bg-rose-50 rounded-full animate-pulse">
                                <div className="p-3 md:p-4 bg-rose-600 rounded-full text-white shadow-lg">
                                    <Trash2 size={28} className="md:w-8 md:h-8" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tighter">Are you sure?</h4>
                            <p className="text-xs md:text-sm font-medium text-muted-foreground leading-relaxed px-2">
                                This action is permanent in the current registry cycle. Verified admin authorization is required.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => mutation.mutate()}
                                disabled={mutation.isPending}
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] shadow-xl shadow-rose-600/10 active:scale-[0.98] transition-all"
                            >
                                {mutation.isPending ? "Terminating..." : "Yes, Purge Record"}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setIsConfirming(false)}
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] opacity-60 hover:opacity-100"
                            >
                                Negative, Take Me Back
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>
        </>
    )
}

export default DeleteTeacherModal