"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { toast } from 'sonner'
import { deleteAdmin } from "@/services/admin-srever-action/allAdmin.service"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAdminsData } from '@/types/Dashboard/admin-dashboard-types/admins-management.type'

interface DeleteAdminModalProps {
    admin: IAdminsData | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const DeleteAdminModal = ({ admin, isOpen, onOpenChange }: DeleteAdminModalProps) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (id: string) => deleteAdmin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-admins"] })
            toast.success("Admin deleted successfully")
            onOpenChange(false)
            setShowConfirm(false)
        },
        onError: (error: any) => {
            const backendMessage = error?.data?.message || error?.response?.data?.message || error?.message || "Failed to delete admin";
            toast.error(backendMessage);
            setShowConfirm(false); // Go back to info modal so user can see what happened
        }
    })

    const handleDeleteClick = () => {
        setShowConfirm(true)
    }

    const handleFinalDelete = async () => {
        if (admin?.id) {
            await mutateAsync(admin.id)
        }
    }

    if (!admin) return null

    return (
        <>
            {/* Stage 1: Info Modal */}
            <Dialog open={isOpen && !showConfirm} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-red-500 p-4 md:p-6 custom-scrollbar text-center">
                    <DialogHeader className="items-center">
                        <div className="p-4 bg-red-100 rounded-full mb-4">
                            <Trash2 className="h-10 w-10 text-red-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-red-600">Delete Admin</DialogTitle>
                        <DialogDescription className="text-base text-gray-500 max-w-[400px]">
                            You are about to delete the admin record for <strong>{admin.name}</strong>. This action will also disable their linked user account and end all active sessions.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="my-8 py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm">
                                {admin.profilePhoto ? (
                                    <img src={admin.profilePhoto} alt={admin.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Trash2 className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg">{admin.name}</p>
                                <p className="text-sm text-gray-500">{admin.email}</p>
                                <p className="text-xs mt-1">
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full uppercase font-semibold">
                                        ID: {admin.id.slice(0, 8)}...
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3 mt-4">
                        <Button
                            variant="outline"
                            className="w-full sm:w-1/2"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-full sm:w-1/2 font-bold shadow-md shadow-red-500/20"
                            onClick={handleDeleteClick}
                        >
                            Confirm Deletion
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Stage 2: "Are you sure?" Small Modal */}
            <Dialog open={isOpen && showConfirm} onOpenChange={(val) => {
                if (!val) setShowConfirm(false)
            }}>
                <DialogContent className="sm:max-w-[400px] w-[90vw] p-6 text-center shadow-2xl border-2 border-red-500/20">
                    <DialogHeader className="items-center pb-2">
                        <div className="p-3 bg-red-50 rounded-full mb-2 animate-bounce">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                        <DialogTitle className="text-xl font-bold">Confirmation Required</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            This action cannot be undone. Are you absolutely certain you want to proceed?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                        <Button
                            variant="ghost"
                            className="w-full sm:w-1/2"
                            onClick={() => setShowConfirm(false)}
                            disabled={isPending}
                        >
                            Back
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-full sm:w-1/2 font-bold"
                            onClick={handleFinalDelete}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Yes, Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteAdminModal
