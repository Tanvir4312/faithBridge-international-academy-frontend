"use client"
import React from 'react'
import { CheckCircle2, ArrowRight, CreditCard, ShieldCheck, Receipt, Globe, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'


const PaymentDashboard = ({ userInfo }: { userInfo: any }) => {



 return (
  <div className="min-h-[85vh] w-full flex items-center justify-center p-6 bg-slate-50/30">
   <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-700">
    {/* Visual accents */}
    <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

    <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[3rem] overflow-hidden">
     {/* Top indicator */}
     <div className="h-2 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 w-full" />

     <div className="p-8 sm:p-14 flex flex-col items-center text-center">
      {/* Success Icon with stylized circle */}
      <div className="relative mb-10 group">
       <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem] blur-xl group-hover:scale-110 transition-transform duration-500" />
       <div className="relative h-24 w-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-xl shadow-emerald-200 group-hover:rotate-6 transition-transform">
        <CheckCircle2 className="h-12 w-12 text-white" />
       </div>
      </div>

      {/* Title Section */}
      <div className="space-y-4 mb-10">
       <Badge variant="outline" className="px-4 py-1 rounded-full border-emerald-100 bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
        Verification Completed
       </Badge>
       <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
        Payment <span className="text-emerald-500">Confirmed</span>
       </h1>
       <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
        Your academic registration fee has been successfully synchronized with the institutional ledger.
       </p>
      </div>

      {/* Transaction Detail Card */}
      <div className="w-full bg-slate-50/50 rounded-[2rem] border border-slate-100 p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

       <div className="flex items-center gap-4 text-left">
        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
         <Lock className="h-5 w-5 text-indigo-500" />
        </div>
        <div>
         <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Status</p>
         <div className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Authenticated
         </div>
        </div>
       </div>
      </div>

      {/* Main Action */}
      <div className="w-full relative group">
       <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
       {
        userInfo?.role === "STUDENT" && (
         <Button asChild className="relative w-full h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.25em] text-[11px] shadow-xl group/btn">
          <Link href="/student/my-payments/success" className="flex items-center justify-center gap-3">
           Explore Payment Archive
           <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
         </Button>
        )

       }
       {
        userInfo?.role === "APPLICANT" && (
         <Button asChild className="relative w-full h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.25em] text-[11px] shadow-xl group/btn">
          <Link href="/applicant-payment/success" className="flex items-center justify-center gap-3">
           Explore Payment Archive
           <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
         </Button>
        )
       }
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
       <Globe className="h-4 w-4" />
       <ShieldCheck className="h-4 w-4" />
       <CreditCard className="h-4 w-4" />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default PaymentDashboard