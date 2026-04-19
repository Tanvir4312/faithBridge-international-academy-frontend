"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IPayment } from '@/types/Dashboard/admin-dashboard-types/payment-managements.types'
import { formatDate } from 'date-fns'
import { CreditCard, Calendar, Hash, ReceiptText, ShieldCheck, ExternalLink, ArrowUpRight, DollarSign } from 'lucide-react'
import PaymentStatusBadgeCell from '@/components/shared/cell/paymentStatusBadgeCell'

interface PaymentDetailsModalProps {
    payment: IPayment | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const PaymentDetailsModal = ({ payment, isOpen, onOpenChange }: PaymentDetailsModalProps) => {
    if (!payment) return null

    const details = [
        { label: "Payment Method", value: "Stripe / Card", icon: CreditCard },
        { label: "Transaction ID", value: payment.transactionId, icon: Hash, copyable: true },
        { label: "Stripe Event ID", value: payment.stripeEventId, icon: ExternalLink, truncate: true },
        { label: "Timestamp", value: formatDate(new Date(payment.createdAt), "MMMM d, yyyy 'at' h:mm a"), icon: Calendar },
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md sm:max-w-lg rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-background max-h-[95vh] flex flex-col">
                {/* Visual Header Background */}


                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8 py-8 space-y-8">
                    <DialogHeader className="text-left relative p-0 mb-8 mt-2">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <ReceiptText className="h-6 w-6 text-primary" />
                            </div>
                            <PaymentStatusBadgeCell status={payment.status} />
                        </div>
                        <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tight uppercase">Payment Receipt</DialogTitle>
                        <DialogDescription className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">
                            Detailed transaction log for {payment.paymentFor}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Amount Highlight */}
                    <div className="p-8 sm:p-10 bg-primary rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <DollarSign className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Total Amount</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl sm:text-5xl font-black tracking-tighter">${payment.amount.toLocaleString()}</span>
                            <span className="text-sm font-bold opacity-70">USD</span>
                        </div>
                    </div>

                    {/* Student Profile Section */}
                    {payment.student && (
                        <div className="p-6 sm:p-8 rounded-[2.5rem] border-2 border-primary/10 bg-primary/5 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/10">
                                    {payment.student.nameEn[0]}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-base font-black uppercase tracking-tight leading-none mb-1">{payment.student.nameEn}</h4>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none">Registered Student</p>
                                </div>
                            </div>

                            <Separator className="bg-primary/10" />

                            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                <div className="space-y-1.5">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Registration ID</span>
                                    <p className="text-sm font-bold font-mono tracking-tight text-primary">{payment.student.registrationId}</p>
                                </div>
                                <div className="space-y-1.5 text-right">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Academic Class</span>
                                    <p className="text-sm font-bold uppercase tracking-tight">{payment.student.class?.name || 'Unassigned'}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Class Roll</span>
                                    <p className="text-sm font-bold uppercase tracking-tight">#{payment.student.classRoll}</p>
                                </div>
                                <div className="space-y-1.5 text-right">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Term Status</span>
                                    <Badge variant="outline" className="text-[9px] font-black uppercase rounded-full border-primary/20 bg-primary/5 text-primary">Active</Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Information Grid */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Transaction Details</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {details.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] bg-muted/30 border border-muted hover:border-primary/20 transition-all group">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="p-2.5 bg-background rounded-xl shadow-sm group-hover:text-primary transition-colors flex-shrink-0">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tight leading-none mb-1.5">{item.label}</span>
                                            <span className={`text-xs sm:text-sm font-bold break-all leading-tight`}>
                                                {item.value}
                                            </span>
                                        </div>
                                    </div>
                                    {item.copyable && (
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(item.value)
                                            }}
                                            className="p-2.5 hover:bg-primary/10 rounded-xl text-primary transition-colors flex-shrink-0 ml-2"
                                        >
                                            <ArrowUpRight className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-primary/10" />

                    {/* Footer Info */}
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tight">Verified Transaction</span>
                            <span className="text-[9px] font-bold text-emerald-600/70 uppercase">Processed via Secure Stripe Gateway</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentDetailsModal
