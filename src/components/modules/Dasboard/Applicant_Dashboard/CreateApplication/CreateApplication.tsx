"use client"

import { getAdmissionTimeConfig } from "@/services/admin-srever-action/admission-time-config.service";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import CreateApplicationModal from "./modals/CreateApplicationModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CreateApplication = () => {
 const [submissionData, setSubmissionData] = useState<any>(null);

 const { data, isLoading } = useQuery({
  queryKey: ["admission-config"],
  queryFn: getAdmissionTimeConfig,
 });

 const admissionConfig = data?.data?.[0]; // Assuming we only need the first active one or the most relevant
 const today = new Date();


 if (isLoading) {
  return <div className="flex items-center justify-center min-h-[400px]">
   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>;
 }

 if (!admissionConfig || !admissionConfig.isActive) {
  return (
   <Card className="border-red-200 bg-red-50">
    <CardContent className="pt-6">
     <div className="flex items-center gap-3 text-red-600">
      <AlertCircle className="h-5 w-5" />
      <p className="font-semibold">No active admission session found. Please wait for the next session.</p>
     </div>
    </CardContent>
   </Card>
  );
 }

 const startDate = new Date(admissionConfig.startDate);
 const endDate = new Date(admissionConfig.endDate);
 const isAdmissionPeriodStarted = isAfter(today, startDate);
 const isAdmissionPeriodEnded = isAfter(today, endDate);
 const isAdmissionOpen = isAdmissionPeriodStarted && !isAdmissionPeriodEnded;

 const handleSuccess = (data: any) => {
  setSubmissionData(data);
 };

 if (submissionData) {
  return (
   <div className="max-w-2xl mx-auto space-y-6">
    <Card className="border-green-200 bg-green-50 overflow-hidden">
     <div className="h-2 bg-green-500 w-full" />
     <CardHeader className="text-center pb-2">
      <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
       <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <CardTitle className="text-2xl text-green-800">Application Submitted!</CardTitle>
      <CardDescription className="text-green-700 font-medium">
       Your admission request for FB-2026 has been successfully created.
      </CardDescription>
     </CardHeader>
     <CardContent className="space-y-6 pt-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
       <div className="space-y-1">
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Student Name</p>
        <p className="font-semibold text-lg">{submissionData.application?.nameEn}</p>
       </div>
       <div className="space-y-1 text-right">
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Application No</p>
        <p className="font-semibold text-lg text-primary">{submissionData.application?.applicationNo}</p>
       </div>
       <div className="space-y-1">
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Desired Class</p>
        <p className="font-semibold">{submissionData.application?.desiredClass}</p>
       </div>
       <div className="space-y-1 text-right">
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Admission Year</p>
        <p className="font-semibold">{submissionData.application?.admissionYear}</p>
       </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border shadow-sm space-y-4">
       <h3 className="font-bold flex items-center gap-2 text-gray-800 border-b pb-3">
        <CreditCard className="h-4 w-4" />
        Payment details
       </h3>
       <div className="space-y-3">
        <div className="flex justify-between items-center">
         <span className="text-sm text-muted-foreground">Amount</span>
         <span className="font-bold text-xl text-primary">৳ {submissionData.application?.applicationFee}</span>
        </div>
        <div className="flex justify-between items-center">
         <span className="text-sm text-muted-foreground">Purpose</span>
         <span className="text-sm font-medium">{submissionData.paymentData?.paymentFor || "ADMISSION"}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
         <span className="text-muted-foreground">Notification Email</span>
         <span className="font-medium">{submissionData.application?.user?.email}</span>
        </div>
       </div>

       <Link href={submissionData.paymentUrl} className="block pt-2">
        <Button className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 group">
         Pay with Stripe
         <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
       </Link>
       <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
        * You will be redirected to Stripe for a secure transaction
       </p>
      </div>
     </CardContent>
    </Card>
   </div>
  )
 }

 return (
  <div className="space-y-6">
   {!isAdmissionPeriodStarted && (
    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
     <div className="bg-red-100 p-2 rounded-lg">
      <Calendar className="h-6 w-6 text-red-600" />
     </div>
     <div>
      <h3 className="font-bold text-red-800">Admission Period Has Not Started</h3>
      <p className="text-red-700 mt-1">
       The admission session for {admissionConfig.year} will start on
       <span className="font-bold px-1">{format(startDate, "MMMM d, yyyy")}</span>.
       Please return on that date to submit your application.
      </p>
     </div>
    </div>
   )}

   {isAdmissionPeriodEnded && (
    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
     <div className="bg-red-100 p-2 rounded-lg">
      <AlertCircle className="h-6 w-6 text-red-600" />
     </div>
     <div>
      <h3 className="font-bold text-red-800">Admission Period Has Ended</h3>
      <p className="text-red-700 mt-1">
       The admission session for {admissionConfig.year} closed on
       <span className="font-bold px-1">{format(endDate, "MMMM d, yyyy")}</span>.
       Please wait for the next admission announcement.
      </p>
     </div>
    </div>
   )}

   {isAdmissionOpen && (
    <Card className="border-primary/20 shadow-xl shadow-primary/5 rounded-3xl overflow-hidden">
     <div className="bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-primary/10">
      <div className="space-y-2 text-center md:text-left">
       <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">Admission Session {admissionConfig.year || "N/A"} is OPEN!</CardTitle>
       <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-medium">Closes on {format(endDate, "MMMM d, yyyy")}</span>
       </div>
      </div>
      <CreateApplicationModal onSuccess={handleSuccess} currentYear={admissionConfig.year} />
     </div>
     <CardContent className="p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Process</p>
        <p className="text-sm font-medium">1. Fill Application Form</p>
       </div>
       <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Fee</p>
        <p className="text-sm font-medium">2. Pay Application Fee (1200 BDT)</p>
       </div>
       <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Next Step</p>
        <p className="text-sm font-medium">3. wait for authority approval</p>
       </div>

      </div>
     </CardContent>
    </Card>
   )}
  </div>
 )
}

export default CreateApplication