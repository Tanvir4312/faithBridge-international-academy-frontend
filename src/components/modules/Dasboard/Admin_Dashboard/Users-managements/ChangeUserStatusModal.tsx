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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IUsersManagements } from '@/types/Dashboard/admin-dashboard-types/users-managements.types'
import { UserStatus } from '@/types/Dashboard/shared_Enums/enums'
import { changeUserStatus } from '@/services/admin-srever-action/users-managements.service'
import { toast } from 'sonner'
import { AlertCircle, Loader2, ShieldAlert } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

const statusSchema = z.object({
    userStatus: z.nativeEnum(UserStatus, {
        required_error: "Please select a status",
    }),
})

interface ChangeUserStatusModalProps {
    user: IUsersManagements | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ChangeUserStatusModal = ({ user, isOpen, onOpenChange }: ChangeUserStatusModalProps) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof statusSchema>>({
        resolver: zodResolver(statusSchema),
        defaultValues: {
            userStatus: user?.status as UserStatus,
        },
    });

    // Reset form when user changes or modal opens
    React.useEffect(() => {
        if (user) {
            form.reset({ userStatus: user.status as UserStatus });
        }
        setIsConfirming(false);
    }, [user, form]);

    const onSubmit = async (values: z.infer<typeof statusSchema>) => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await changeUserStatus(user!.id, {
                userStatus: values.userStatus,
            });

            if (res.success) {
                toast.success(res.message || "User status updated successfully");
                queryClient.invalidateQueries({ queryKey: ["users"] });
                onOpenChange(false);
            } else {
                toast.error(res.message || "Failed to update status");
            }
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
            setIsConfirming(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!isSubmitting) onOpenChange(open);
        }}>
            <DialogContent className="sm:max-w-lg border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden bg-white">
                <div className="bg-indigo-600 p-8 text-white relative">
                    <div className="relative z-10">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <ShieldAlert className="w-8 h-8" />
                                Status Override
                            </DialogTitle>
                            <DialogDescription className="text-indigo-100 font-medium text-lg mt-2">
                                Modifying access level for {user.name}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="p-8">
                    {isConfirming ? (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-100 uppercase font-black text-[10px]">
                                    Warning
                                </div>
                                <div>
                                    <h4 className="font-black text-amber-900 text-lg tracking-tight">Are you absolutely sure?</h4>
                                    <p className="text-amber-700 text-sm leading-relaxed mt-1 font-medium italic">
                                        Changing status to <span className="underline font-black">{form.getValues('userStatus')}</span> will take effect immediately and impact the user's ability to access the system.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={() => onOpenChange(false)}
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-14 rounded-2xl font-black text-gray-500 hover:bg-gray-50 border-gray-100"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={form.handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                    className="flex-1 h-14 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 text-white flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Update"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="userStatus"
                                    render={({ field }: { field: any }) => (
                                        <FormItem className="space-y-4">
                                            <div className="flex items-center justify-between px-1">
                                                <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">Target Status</FormLabel>
                                                <div className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full ring-1 ring-indigo-100 italic">
                                                    Current: {user.status}
                                                </div>
                                            </div>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-16 rounded-2xl bg-gray-50 border-gray-100 font-bold text-gray-800 focus:bg-white transition-all shadow-sm">
                                                        <SelectValue placeholder="Select new status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-2xl shadow-2xl border-none">
                                                    {Object.values(UserStatus).map((status) => (
                                                        <SelectItem
                                                            key={status}
                                                            value={status}
                                                            className="font-bold py-3 focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer rounded-xl mx-1 my-1"
                                                        >
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-rose-500 font-bold px-2" />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-col gap-4">
                                    <Button
                                        type="submit"
                                        className="h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95"
                                    >
                                        Proceed to Update
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => onOpenChange(false)}
                                        className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                                    >
                                        Abandon Changes
                                    </button>
                                </div>
                            </form>
                        </Form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeUserStatusModal
