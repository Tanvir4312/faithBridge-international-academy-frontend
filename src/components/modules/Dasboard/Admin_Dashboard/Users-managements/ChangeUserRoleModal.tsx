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
import { changeUserRole } from '@/services/admin-srever-action/users-managements.service'
import { toast } from 'sonner'
import { Loader2, UserPlus, Zap } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

const roleSchema = z.object({
    role: z.string({
        required_error: "Please select a role",
    }),
})

interface ChangeUserRoleModalProps {
    user: IUsersManagements | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ChangeUserRoleModal = ({ user, isOpen, onOpenChange }: ChangeUserRoleModalProps) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const roles = ["ADMIN", "TEACHER", "STUDENT", "APPLICANT", "SUPER_ADMIN"];

    const form = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            role: user?.role || "",
        },
    });

    React.useEffect(() => {
        if (user) {
            form.reset({ role: user.role });
        }
        setIsConfirming(false);
    }, [user, form]);

    const onSubmit = async (values: z.infer<typeof roleSchema>) => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await changeUserRole(user!.id, {
                role: values.role,
            });

            if (res.success) {
                toast.success(res.message || "User role updated successfully");
                queryClient.invalidateQueries({ queryKey: ["users"] });
                onOpenChange(false);
            } else {
                toast.error(res.message || "Failed to update role");
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
                <div className="bg-fuchsia-600 p-8 text-white relative">
                    <div className="relative z-10">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <Zap className="w-8 h-8 fill-current" />
                                Privilege Granting
                            </DialogTitle>
                            <DialogDescription className="text-fuchsia-100 font-medium text-lg mt-2">
                                Reconfiguring system role for {user.name}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                <div className="p-8">
                    {isConfirming ? (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4">
                                <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-100 uppercase font-black text-[10px]">
                                    Critical
                                </div>
                                <div>
                                    <h4 className="font-black text-rose-900 text-lg tracking-tight">Authority Confirmation</h4>
                                    <p className="text-rose-700 text-sm leading-relaxed mt-1 font-medium italic">
                                        Granting the <span className="underline font-black">{form.getValues('role')}</span> role will change all accessible modules and permissions for this user immediately.
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
                                    className="flex-1 h-14 rounded-2xl font-black bg-fuchsia-600 hover:bg-fuchsia-700 shadow-xl shadow-fuchsia-100 text-white flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Role"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }: { field: any }) => (
                                        <FormItem className="space-y-4">
                                            <div className="flex items-center justify-between px-1">
                                                <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Designation</FormLabel>
                                                <div className="text-[10px] font-bold text-fuchsia-500 bg-fuchsia-50 px-2 py-0.5 rounded-full ring-1 ring-fuchsia-100 italic">
                                                    Current: {user.role}
                                                </div>
                                            </div>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-16 rounded-2xl bg-gray-50 border-gray-100 font-bold text-gray-800 focus:bg-white transition-all shadow-sm">
                                                        <SelectValue placeholder="Select new role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-2xl shadow-2xl border-none">
                                                    {roles.map((role) => (
                                                        <SelectItem
                                                            key={role}
                                                            value={role}
                                                            className="font-bold py-3 focus:bg-fuchsia-50 focus:text-fuchsia-700 cursor-pointer rounded-xl mx-1 my-1"
                                                        >
                                                            {role.replace('_', ' ')}
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
                                        className="h-16 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black text-lg transition-all shadow-xl shadow-fuchsia-100 hover:-translate-y-1 active:scale-95"
                                    >
                                        Proceed to Authorization
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => onOpenChange(false)}
                                        className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                                    >
                                        Dismiss
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

export default ChangeUserRoleModal
