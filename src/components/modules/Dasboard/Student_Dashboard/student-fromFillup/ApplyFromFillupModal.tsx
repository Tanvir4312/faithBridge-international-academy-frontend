"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFromFillup } from '@/services/student-server-action/fromFillup.service'
import { toast } from 'sonner'
import {
    ClipboardCheck,
    CreditCard,
    ShieldCheck,
    Loader2,
    X,
    ChevronRight,
    AlertCircle,
    Info,
    ExternalLink,
    ArrowRight,
    CheckCircle2,
    Calendar,
    User,
    Hash,
    School,
    Banknote
} from 'lucide-react'

const fromFillupSchema = z.object({
    registrationNo: z.string().min(1, "Registration number is required"),
    classRoll: z.string().min(1, "Class roll is required"),
})

type FormValues = z.infer<typeof fromFillupSchema>


interface ApplyFromFillupModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    exam: any
    userInfo: any
}

const ApplyFromFillupModal = ({ isOpen, onOpenChange, exam, userInfo }: ApplyFromFillupModalProps) => {
    const queryClient = useQueryClient()
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
    const [fromFillupResult, setFromFillupResult] = useState<any>(null)

    // Auto-fill parameters from userInfo
    const currentClass = userInfo?.student?.class
    const classId = userInfo?.student?.classId

    const form = useForm<FormValues>({
        resolver: zodResolver(fromFillupSchema),
        defaultValues: {
            registrationNo: userInfo?.student?.registrationId || '',
            classRoll: userInfo?.student?.classRoll || '',
        }
    })

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            const payload = {
                studentId: userInfo?.student?.id,
                classId: classId,
                examId: exam?.id,
                registrationNo: values.registrationNo,
                classRoll: values.classRoll,
            }
            const res = await createFromFillup(payload)
            if (!res.success) {
                throw new Error(res.message || "Failed to initiate form fill-up")
            }
            return res
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['exams'] })
            toast.success("Application Registered", {
                description: "Registry entry created. Proceed to payment to finalize.",
                className: "bg-emerald-500 text-white border-none shadow-2xl",
            })
            if (res.data?.paymentUrl) {
                setPaymentUrl(res.data.paymentUrl)
                setFromFillupResult(res.data)
            }
        },
        onError: (error: any) => {
            toast.error("Application Failed", {
                description: error.message || "An unexpected error occurred during submission.",
            })
        }
    })

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values)
    }

    const handleClose = () => {
        setPaymentUrl(null)
        form.reset()
        onOpenChange(false)
    }

    if (!exam || !userInfo) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent showCloseButton={false} className="w-[95%] sm:w-[90%] lg:max-w-3xl p-0 overflow-y-auto max-h-[90vh] custom-scrollbar border-none shadow-3xl rounded-[2.5rem] bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>Examination Form Fill-up Portal</DialogTitle>
                    <DialogDescription>Submit your official registration for {exam.name}.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col h-full">
                    {/* Premium Header */}
                    <div className="relative h-44 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center px-8 sm:px-12 overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />

                        <div className="relative flex items-center gap-6 sm:gap-10 w-full z-10">
                            <div className="h-24 w-24 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl">
                                {paymentUrl ? (
                                    <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-pulse" />
                                ) : (
                                    <ClipboardCheck className="h-10 w-10 text-indigo-400" />
                                )}
                            </div>

                            <div className="flex-1 text-white min-w-0">
                                <h2 className="text-xl sm:text-3xl font-black tracking-tighter uppercase leading-tight truncate">
                                    {paymentUrl ? "Application" : "Finalizing"} <span className="text-indigo-400">{paymentUrl ? "Success" : "Registration"}</span>
                                </h2>
                                <div className="flex items-center gap-2 mt-2 opacity-80">
                                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase truncate">{exam.name} | {exam.year}</p>
                                </div>
                            </div>
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="absolute top-6 right-6 h-10 w-10 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white z-50 backdrop-blur-md">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>

                    {paymentUrl ? (
                        /* SUCCESS STATE WITH COMPREHENSIVE PAYMENT CARD */
                        <div className="p-8 sm:p-14 flex flex-col items-center bg-slate-50/20 text-center">
                            <div className="w-full max-w-xl bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                                {/* Header Accents */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-indigo-500 to-emerald-400" />

                                <div className="p-8 sm:p-12 space-y-10 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="h-16 w-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 animate-in zoom-in duration-500">
                                            <CheckCircle2 className="h-8 w-8" />
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className="border-emerald-100 bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                                                Registry Synchronized
                                            </Badge>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-end gap-1.5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Verified Node
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic text-left">Internal Billing <span className="text-emerald-500">Invoice</span></h3>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left leading-relaxed">
                                            Reference: {fromFillupResult?.paymentData?.transactionId || "N/A"}
                                        </p>
                                    </div>

                                    {/* Detailed Data Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                                        {[
                                            { icon: User, label: "Candidate", value: userInfo.student?.nameEn },
                                            { icon: School, label: "Division", value: fromFillupResult?.studentClass?.name || "N/A" },
                                            { icon: Hash, label: "Roll ID", value: fromFillupResult?.fromFillupData?.classRoll || "N/A" },
                                            { icon: ClipboardCheck, label: "Registry No", value: fromFillupResult?.fromFillupData?.registrationNo || "N/A" },
                                            { icon: Calendar, label: "Exam Cycle", value: `${fromFillupResult?.exam?.name} (${fromFillupResult?.exam?.year})` },
                                            { icon: Banknote, label: "Total Payable", value: `${fromFillupResult?.paymentData?.amount} ${fromFillupResult?.paymentData?.currency}`, highlight: true }
                                        ]?.map((item, idx) => (
                                            <div key={idx} className="bg-white p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                                <div className={`p-2 rounded-xl shrink-0 ${item.highlight ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                                    <item.icon className="h-4 w-4" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                                                    <p className={`text-[11px] font-black uppercase tracking-tight ${item.highlight ? 'text-emerald-600 italic' : 'text-slate-900'}`}>{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <Button
                                            asChild
                                            className="w-full h-16 rounded-2xl bg-[#635BFF] hover:bg-[#534bb3] text-white font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <a href={paymentUrl} rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                                                <CreditCard className="h-5 w-5" />
                                                Stripe Secure Payment
                                                <ArrowRight className="h-4 w-4 opacity-50 ml-2" />
                                            </a>
                                        </Button>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            Institutional grade encryption active • Transaction monitored
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* FORM STATE */
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full italic">
                            <div className="p-8 sm:p-12 space-y-12">
                                {/* Academic Info Header */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-1 group hover:border-indigo-200 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Student Profile</span>
                                        <p className="text-lg font-black text-slate-900 truncate uppercase tracking-tighter">{userInfo.student?.nameEn}</p>
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest opacity-60">ID: {userInfo.student?.registrationId}</p>
                                    </div>
                                    <div className="p-6 bg-indigo-50 border border-indigo-100/50 rounded-3xl space-y-1 group hover:border-indigo-200 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Academic Division</span>
                                        <p className="text-lg font-black text-slate-900 truncate uppercase tracking-tighter">
                                            {currentClass?.name || "Standard Assignment"}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60">
                                            Roll: #{userInfo?.student?.classRoll || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-50 pt-10">
                                    <div className="space-y-3">
                                        <Label htmlFor="registrationNo" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Registry Code</Label>
                                        <Input
                                            id="registrationNo"
                                            {...form.register('registrationNo')}
                                            placeholder="Enter ID"
                                            className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-black transition-all shadow-sm"
                                        />
                                        {form.formState.errors.registrationNo && (
                                            <p className="text-[10px] text-destructive font-black ml-1 uppercase">{form.formState.errors.registrationNo.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="classRoll" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Roll</Label>
                                        <Input
                                            id="classRoll"
                                            {...form.register('classRoll')}
                                            placeholder="Enter Roll"
                                            className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-black transition-all shadow-sm"
                                        />
                                        {form.formState.errors.classRoll && (
                                            <p className="text-[10px] text-destructive font-black ml-1 uppercase">{form.formState.errors.classRoll.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Financial Notice */}
                                <div className="bg-indigo-50 border border-indigo-100/50 p-6 rounded-[2rem] flex items-start gap-5 shadow-sm group hover:shadow-md transition-all">
                                    <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 shrink-0">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-900 mb-1">Registration Fee Calculation</h4>
                                        <p className="text-[10px] text-indigo-600/70 font-bold leading-relaxed uppercase">
                                            Fees will be calculated based on your selected academic level division. Verify all parameters before proceeding to the checkout session.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="sticky bottom-0 p-8 pt-0 bg-background/50 backdrop-blur-sm border-t-0 flex flex-col sm:flex-row gap-4 shrink-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-none hover:bg-slate-100 text-slate-400"
                                    onClick={handleClose}
                                    disabled={mutation.isPending}
                                >
                                    Cancel Application
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-[2] h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin font-black" />
                                            Syncing with Registry...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>Verify & Generate Invoice</span>
                                            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </div>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                    .shadow-3xl {
                        box-shadow: 0 35px 60px -15px rgba(2, 6, 23, 0.25);
                    }
                `}</style>
            </DialogContent>
        </Dialog>
    )
}

export default ApplyFromFillupModal
