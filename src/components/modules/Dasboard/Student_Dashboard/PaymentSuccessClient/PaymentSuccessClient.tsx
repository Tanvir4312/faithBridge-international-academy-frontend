"use client"

import { getAllStudentPaymentInfo } from "@/services/student-server-action/payment.info.service";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CalendarDays, CreditCard, User, GraduationCap, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentSuccessClient({ studentId }: { studentId: string }) {
 const { data: paymentsInfo, isLoading } = useQuery({
  queryKey: ["payment-info"],
  queryFn: () => getAllStudentPaymentInfo(studentId),
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchInterval: 60 * 1000 * 60 * 24,
 });

 const paymentsData = paymentsInfo?.data || [];

 if (isLoading) {
  return (
   <div className="container mx-auto p-4 max-w-4xl space-y-6">
    <Skeleton className="h-10 w-[250px] mx-auto mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <Skeleton className="h-64 w-full" />
     <Skeleton className="h-64 w-full" />
    </div>
   </div>
  );
 }

 return (
  <div className="container mx-auto p-4 md:p-8 max-w-5xl">
   <div className="text-center mb-10 space-y-4">
    <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
     <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
    </div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
     Payment Successful
    </h1>
    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
     Your transaction has been processed successfully. Here are your payment details.
    </p>
   </div>

   {paymentsData.length === 0 ? (
    <div className="text-center p-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-800">
     <p className="text-gray-500 dark:text-gray-400">No payment records found.</p>
    </div>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {paymentsData.map((payment: any) => (
      <Card
       key={payment.id}
       className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
       <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2">
         <CreditCard className="w-5 h-5 text-green-600 dark:text-green-500" />
         <span className="font-semibold text-gray-900 dark:text-gray-100">
          ৳ {payment.amount}
         </span>
        </div>
        <Badge
         variant="outline"
         className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50"
        >
         {payment.status}
        </Badge>
       </div>

       <CardContent className="p-6">
        <div className="space-y-6">
         {/* Payment Info */}
         <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Transaction Details</h3>
          <div className="grid grid-cols-1 gap-y-3">
           <div className="flex items-center text-sm">
            <FileText className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-500 mr-2">Purpose:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
             {payment.paymentFor?.replace(/_/g, ' ').toLowerCase()}
            </span>
           </div>
           <div className="flex items-center text-sm">
            <CalendarDays className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-500 mr-2">Date:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
             {new Date(payment.createdAt).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
            </span>
           </div>
          </div>
         </div>

         {/* Divider */}
         <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />

         {/* Student Info */}
         <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Student Information</h3>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
           <div className="flex items-center text-sm">
            <User className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-500 mr-2">Name:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
             {payment.student?.nameEn || 'N/A'}
            </span>
           </div>
           <div className="flex items-center text-sm">
            <GraduationCap className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-500 mr-2">Class:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
             {payment.student?.class?.name || payment.student?.calss?.name || 'N/A'}
             <span className="text-gray-400 font-normal mx-1">•</span>
             Roll: {payment.student?.classRoll || 'N/A'}
            </span>
           </div>
           <div className="flex items-center text-sm">
            <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
             <span className="text-gray-400 text-xs font-bold">ID</span>
            </div>
            <span className="text-gray-500 mr-2">Reg ID:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
             {payment.student?.registrationId || 'N/A'}
            </span>
           </div>
          </div>
         </div>
        </div>
       </CardContent>

       <CardFooter className="bg-gray-50 dark:bg-gray-900/20 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
        <span>Transaction ID: {payment?.transactionId}</span>
        <span className="flex items-center text-green-600 dark:text-green-500 font-medium">
         <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
        </span>
       </CardFooter>
      </Card>
     ))}
    </div>
   )}
  </div>
 );
}