"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldCheck, UserCog } from 'lucide-react'
import { IUsersManagements } from '@/types/Dashboard/admin-dashboard-types/users-managements.types'

interface EditUserOptionsModalProps {
    user: IUsersManagements | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onChangeStatus: (user: IUsersManagements) => void;
    onChangeRole: (user: IUsersManagements) => void;
}

const EditUserOptionsModal = ({ user, isOpen, onOpenChange, onChangeStatus, onChangeRole }: EditUserOptionsModalProps) => {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-[2rem] p-8 bg-white/90 backdrop-blur-xl">
                <DialogHeader>
                    <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                        <UserCog className="w-6 h-6" />
                    </div>
                    <DialogTitle className="text-2xl font-black text-center tracking-tight text-gray-900">
                        Edit Account Properties
                    </DialogTitle>
                    <DialogDescription className="text-center font-medium text-gray-500">
                        Choose an administrative action for <span className="text-indigo-600 font-bold">{user.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 mt-6">
                    <Button 
                        onClick={() => {
                            onOpenChange(false);
                            onChangeStatus(user);
                        }}
                        className="h-16 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-2 border-indigo-100 hover:border-indigo-200 transition-all group flex items-center justify-start px-6 gap-4 shadow-sm"
                    >
                        <div className="p-2 bg-indigo-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-base">Change Status</p>
                            <p className="text-[10px] opacity-70 font-medium">Toggle Active, Inactive or Suspended</p>
                        </div>
                    </Button>

                    <Button 
                        onClick={() => {
                            onOpenChange(false);
                            onChangeRole(user);
                        }}
                        className="h-16 rounded-2xl bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 border-2 border-fuchsia-100 hover:border-fuchsia-200 transition-all group flex items-center justify-start px-6 gap-4 shadow-sm"
                    >
                        <div className="p-2 bg-fuchsia-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                            <UserCog className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-base">Modify Role</p>
                            <p className="text-[10px] opacity-70 font-medium">Update system access & permissions</p>
                        </div>
                    </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <button 
                        onClick={() => onOpenChange(false)}
                        className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                        Dismiss Menu
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserOptionsModal
