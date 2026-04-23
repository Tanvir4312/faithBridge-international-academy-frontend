"use client"
import { getAllApplicantPaymentInfo } from '@/services/applicant-server-action/applicant-paymentInfo.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle2, CalendarDays, CreditCard, User, GraduationCap, FileText, Smartphone, Hash } from "lucide-react"

const ApplicantPaymentSuccessInfo = ({ applicantId }: { applicantId: string }) => {
 const { data: applicantPayments, isLoading } = useQuery({
  queryKey: ["applicant-payment-info"],
  queryFn: () => getAllApplicantPaymentInfo(applicantId),
  refetchOnWindowFocus: true
 })

 const payments = applicantPayments?.data || []

 if (isLoading) {
  return (
   <div className="container mx-auto p-4 max-w-4xl space-y-6">
    <Skeleton className="h-12 w-[300px] mx-auto mb-8 rounded-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
     <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
    </div>
   </div>
  )
 }

 if (payments?.length === 0) {
  return (
   <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <div className="bg-gray-100 p-6 rounded-full">
     <FileText className="h-12 w-12 text-gray-400" />
    </div>
    <p className="text-xl font-bold text-gray-500 uppercase tracking-widest italic">No payment history found</p>
   </div>
  )
 }

 return (
  <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-10">
   {/* Page Header */}
   <div className="text-center space-y-4">
    <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-110">
     <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
    </div>
    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase italic">
     Application <span className="text-primary">Secured</span>
    </h1>
    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-bold uppercase tracking-widest text-[10px]">
     Your registration process is now complete. Welcome to the academy family.
    </p>
   </div>

   <div className="grid grid-cols-1 gap-12">
    {payments?.map((payment: any) => (
     <Card
      key={payment.id}
      className="overflow-hidden border-none shadow-2xl rounded-[3rem] bg-white transition-all duration-500 hover:translate-y-[-4px]"
     >
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <CreditCard className="h-48 w-48 text-white" />
       </div>
       <div className="flex items-center space-x-6 relative z-10">
        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
         <CreditCard className="w-8 h-8 text-white" />
        </div>
        <div className="text-white">
         <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80 block mb-1">Transaction Amount</span>
         <span className="font-black text-4xl tracking-tighter italic">
          ৳ {payment.amount}
         </span>
        </div>
       </div>
       <div className="flex items-center gap-3 relative z-10">
        <Badge className="bg-white text-green-700 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
         {payment.status}
        </Badge>
        <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest backdrop-blur-md">
         {payment.paymentFor}
        </Badge>
       </div>
      </div>

      <CardContent className="p-10 md:p-14">
       <div className="lg:grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Applicant Data */}
        <div className="space-y-8">
         <div className="flex items-center gap-3 ml-1">
          <div className="h-1.5 w-8 bg-primary rounded-full" />
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Applicant Identity</h3>
         </div>
         <div className="grid grid-cols-1 gap-y-8">
          <div className="flex items-start group">
           <div className="p-3 bg-gray-50 rounded-2xl mr-5 group-hover:bg-primary/10 transition-colors">
            <User className="w-5 h-5 text-gray-400 group-hover:text-primary" />
           </div>
           <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1.5">Candidate Name</span>
            <span className="font-black text-lg text-gray-900 uppercase italic tracking-tight">{payment.application?.nameEn}</span>
           </div>
          </div>
          <div className="flex items-start group">
           <div className="p-3 bg-gray-50 rounded-2xl mr-5 group-hover:bg-primary/10 transition-colors">
            <Smartphone className="w-5 h-5 text-gray-400 group-hover:text-primary" />
           </div>
           <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1.5">Father's Name</span>
            <span className="font-black text-lg text-gray-900 italic tracking-tight">{payment.application?.fatherName}</span>
           </div>
          </div>
          <div className="flex items-start group">
           <div className="p-3 bg-gray-50 rounded-2xl mr-5 group-hover:bg-primary/10 transition-colors">
            <GraduationCap className="w-5 h-5 text-gray-400 group-hover:text-primary" />
           </div>
           <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1.5">Desired Grade</span>
            <span className="font-black text-lg text-gray-900 uppercase tracking-tighter italic">{payment.application?.desiredClass}</span>
           </div>
          </div>
         </div>
        </div>

        {/* Payment Log */}
        <div className="space-y-8">
         <div className="flex items-center gap-3 ml-1">
          <div className="h-1.5 w-8 bg-emerald-500 rounded-full" />
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Payment Log</h3>
         </div>
         <div className="bg-gray-50/50 rounded-[2.5rem] p-8 space-y-8 border border-gray-100 shadow-inner">
          <div className="md:flex items-start group">
           <div className="p-3 bg-white rounded-xl mr-5 shadow-sm">
            <Hash className="w-5 h-5 text-emerald-600" />
           </div>
           <div className="flex flex-col">
            <span className="text-[10px] lg:pt-0 pt-2 uppercase font-black text-muted-foreground tracking-widest mb-1.5">Application No</span>
            <span className="font-black text-xl text-primary tracking-tighter italic">{payment.application?.applicationNo}</span>
           </div>
          </div>
          <div className="md:flex items-start group">
           <div className="p-3 bg-white rounded-xl mr-5 shadow-sm">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
           </div>
           <div className="flex flex-col">
            <span className="text-[10px] md:pt-0 pt-2 uppercase font-black text-muted-foreground tracking-widest mb-1.5">Paid On</span>
            <span className="font-black text-base text-gray-800">
             {new Date(payment.createdAt).toLocaleString("en-US", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
             })}
            </span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </CardContent>

      <CardFooter className="bg-gray-100 px-10 md:px-14 py-6 border-t border-gray-200 flex flex-col justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
       <div className="md:flex items-center gap-2">
        <FileText className="h-3 w-3" />
        Transaction ID: <span className="text-gray-900 border-b border-gray-400/50 md:pt-0 pt-2">{payment.transactionId}</span>
       </div>
       <div className="flex items-center text-emerald-600 font-black">
        <CheckCircle2 className="w-4 h-4 mr-2" /> Digital Verification Successful
       </div>
      </CardFooter>
     </Card>
    ))}
   </div>

   <div className="pt-10 text-center">
    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-40">
     FaithBridge International Academy &bull; Admission Portal 2026
    </p>
   </div>
  </div>
 )
}

export default ApplicantPaymentSuccessInfo