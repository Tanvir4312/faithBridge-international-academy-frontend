"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteExam } from '@/services/admin-srever-action/exams-managements.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Trash2, X, ShieldAlert } from 'lucide-react'
import { IExamsData } from '@/types/Dashboard/admin-dashboard-types/exams-managements'
import { useRouter } from 'next/navigation'

interface DeleteExamModalProps {
    exam: IExamsData | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const DeleteExamModal = ({ exam, isOpen, onOpenChange }: DeleteExamModalProps) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async () => {
            if (!exam) throw new Error("No exam selected")
            const res = await deleteExam(exam.id)
            if (!res.success) {
                throw new Error(res.message || "Failed to remove examination")
            }
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exams'] })
            router.refresh()
            toast.success("Examination archived", {
                description: "The exam has been soft-deleted from the active registry.",
                className: "bg-destructive text-white border-none shadow-2xl",
            })
            onOpenChange(false)
        },
        onError: (error: any) => {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during archiving."
            toast.error("Operation Failed", {
                description: errorMessage,
            })
        }
    })

    const handleDelete = () => {
        mutation.mutate()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95%] sm:max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] bg-white">
                <DialogHeader className="sr-only">
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to archive this examination? This action is reversible but will disable immediate access.
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-destructive/5 p-8 flex flex-col items-center text-center space-y-4">
                    <div className="h-20 w-20 bg-destructive/10 rounded-[1.5rem] flex items-center justify-center border-4 border-white shadow-xl rotate-3">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">Confirm Deletion</h2>
                        <p className="text-xs text-muted-foreground font-bold tracking-tight">
                            You are about to archieve <span className="text-destructive">"{exam?.name}"</span>
                        </p>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="p-5 bg-gray-50 rounded-2xl border border-dashed flex items-start gap-4">
                        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                        <p className="text-[10px] sm:text-xs text-gray-400 font-bold leading-relaxed italic">
                            "Soft-deletion will move this record to the archives. Registered candidates and scheduling links will be disabled immediately."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                            variant="ghost" 
                            className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100"
                            onClick={() => onOpenChange(false)}
                        >
                            Abort Ops
                        </Button>
                        <Button 
                            className="flex-[1.5] h-12 rounded-xl bg-destructive hover:bg-destructive/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-destructive/20 gap-2"
                            onClick={handleDelete}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Archiving..." : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Confirm Archive
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteExamModal
