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
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { deleteNotice } from '@/services/admin-srever-action/notices-managements'
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteNoticeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    notice: INoticeData | null;
    refetch: () => void;
}

const DeleteNoticeModal = ({ open, onOpenChange, notice, refetch }: DeleteNoticeModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false)

    if (!notice) return null

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const res = await deleteNotice(notice.id)
            if (res.success) {
                toast.success("Notice retracted successfully")
                refetch()
                onOpenChange(false)
            } else {
                toast.error(res.message || "Could not retract notice")
            }
        } catch (error: any) {
            toast.error(error?.message || "Internal system rejection")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[98vw] sm:max-w-[500px] max-h-[92vh] p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] sm:rounded-3xl bg-background flex flex-col">
                <DialogHeader className="sr-only">
                    <DialogTitle>Retract Notice</DialogTitle>
                    <DialogDescription>
                        Permanent removal of the announcement from the system.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-12 text-center space-y-8">
                    {/* Warning Icon Container */}
                    <div className="relative inline-block">
                        <div className="h-24 w-24 sm:h-32 sm:w-32 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                            <Trash2 className="h-12 w-12 sm:h-16 sm:w-16 text-red-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-red-50">
                            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500 fill-amber-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight">
                            Retract Announcement?
                        </h2>
                        <div className="p-4 sm:p-6 bg-muted/50 rounded-2xl border-2 border-dashed border-muted-foreground/20 space-y-3 relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5">
                                <Trash2 className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary/60">Target Dossier</p>
                            <h3 className="text-sm sm:text-lg font-black tracking-tight uppercase truncate">
                                {notice.title}
                            </h3>
                            <Badge variant="outline" className="border-red-200 bg-red-50 text-red-600 font-black text-[9px] uppercase tracking-tighter">
                                Permanent Finality
                            </Badge>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-muted-foreground leading-relaxed px-4">
                            You are about to remove this briefing from the public record. This action cannot be reversed.
                        </p>
                    </div>
                </div>

                {/* Vertical Actions for Mobile Accessibility */}
                <div className="p-6 sm:p-10 border-t bg-muted/10 space-y-3 sm:space-y-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={isDeleting}
                                className="w-full h-14 sm:h-16 rounded-2xl sm:rounded-3xl font-black text-xs sm:text-base uppercase tracking-widest shadow-xl shadow-red-500/30 hover:scale-[1.02] active:scale-95 transition-all gap-3"
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Trash2 className="h-5 w-5" />
                                )}
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl sm:rounded-3xl border-none shadow-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-black text-xl tracking-tighter">Are you sure to delete this?</AlertDialogTitle>
                                <AlertDialogDescription className="font-medium">
                                    This action is final and will permanently delete the notice from the Bulletin Board.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-4 gap-2">
                                <AlertDialogCancel
                                    onClick={() => onOpenChange(false)}
                                    className="rounded-xl sm:rounded-2xl border-2 font-bold uppercase text-[10px] sm:text-xs tracking-widest"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-lg shadow-red-500/20"
                                >
                                    OK, Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                        className="w-full h-14 sm:h-16 rounded-2xl sm:rounded-3xl border-2 border-muted-foreground/10 font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-muted transition-all"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteNoticeModal
