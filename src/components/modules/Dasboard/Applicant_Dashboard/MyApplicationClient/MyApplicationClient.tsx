"use client"

import { getMyApplicationInfo } from "@/services/applicant-server-action/application.service";
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
 FileText,
 User,
 GraduationCap,
 Calendar,
 MapPin,
 Phone,
 Mail,
 Clock,
 CheckCircle2,
 CreditCard,
 History,
 ShieldCheck,
 Fingerprint,
 Languages,
 HeartPulse,
 Hash,
 Sparkles,
 ArrowUpRight
} from "lucide-react"
import Image from "next/image"

const MyApplicationClient = ({ applicantId }: { applicantId: string }) => {
 const { data: myApplicationInfoResponse, isLoading } = useQuery({
  queryKey: ["my-application"],
  queryFn: () => getMyApplicationInfo(applicantId),
 })

 const application = myApplicationInfoResponse?.data;

 if (isLoading) {
  return (
   <div className="container mx-auto p-6 space-y-6">
    <Skeleton className="h-64 w-full rounded-[3rem]" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     <Skeleton className="h-[600px] rounded-[3rem]" />
     <Skeleton className="h-[600px] lg:col-span-2 rounded-[3rem]" />
    </div>
   </div>
  )
 }

 if (!application) {
  return (
   <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 animate-in zoom-in duration-500">
    <div className="bg-gray-100 p-10 rounded-full ring-8 ring-gray-50">
     <FileText className="h-16 w-16 text-gray-300" />
    </div>
    <div className="text-center">
     <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tighter">No Application Found</h3>
     <p className="text-gray-400 text-sm font-medium">Please contact administration if you think this is an error.</p>
    </div>
   </div>
  )
 }

 const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
   case 'PENDING': return 'bg-amber-500/10 text-amber-600 border-amber-200';
   case 'APPROVED': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
   case 'REJECTED': return 'bg-rose-500/10 text-rose-600 border-rose-200';
   default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
 };

 return (
  <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

   {/* 🌟 HERO BANNER SECTION */}
   <div className="relative group rounded-[3rem] p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden">
    <div className="absolute inset-0 bg-white/90 backdrop-blur-3xl rounded-[2.9rem]" />
    <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl" />

    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
     {/* Profile Image with Ring */}
     <div className="relative">
      <div className="h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden ring-8 ring-white shadow-2xl relative z-10">
       <Image
        src={application.profileImage}
        alt={application.nameEn}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
       />
      </div>
      <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl z-20 border border-gray-100">
       <Sparkles className="w-6 h-6 text-indigo-500" />
      </div>
     </div>

     <div className="flex-1 text-center md:text-left space-y-4">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
       <Badge variant="outline" className={`${getStatusColor(application.status)} px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm backdrop-blur-md`}>
        <span className="relative flex h-2 w-2 mr-2">
         <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${application.status === 'PENDING' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
         <span className={`relative inline-flex rounded-full h-2 w-2 ${application.status === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
        </span>
        {application.status}
       </Badge>
       <Badge className="bg-slate-900 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
        {application.type}
       </Badge>
      </div>

      <div className="space-y-1">
       <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-tight">
        {application.nameEn}
       </h1>
       <p className="text-2xl font-bold text-indigo-600/80 font-bengali tracking-tight">
        {application.nameBn}
       </p>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
       <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-500 font-black text-[10px] uppercase tracking-tighter">
        <Hash className="w-3.5 h-3.5" /> {application.applicationNo}
       </div>
       <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-black text-[10px] uppercase tracking-tighter">
        <GraduationCap className="w-3.5 h-3.5" /> Class {application.desiredClass}
       </div>
       <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-600 font-black text-[10px] uppercase tracking-tighter">
        <Calendar className="w-3.5 h-3.5" /> Session {application.admissionYear}
       </div>
      </div>
     </div>
    </div>
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

    {/* 📱 LEFT COLUMN: QUICK INFO */}
    <div className="lg:col-span-4 space-y-8">
     {/* Contact Card */}
     <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl overflow-hidden group">
      <CardHeader className="bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex flex-row items-center justify-between">
       <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Communication</CardTitle>
       <Phone className="w-4 h-4 text-slate-300" />
      </CardHeader>
      <CardContent className="p-10 space-y-8">
       <ContactItem icon={Phone} label="Guardian Contact" value={application.guardianMobile} color="text-indigo-500" />
       <ContactItem icon={Phone} label="Student Contact" value={application.studentMobile} color="text-purple-500" />
       <ContactItem icon={Mail} label="Account Email" value={application.user?.email} color="text-emerald-500" />
      </CardContent>
     </Card>

     {/* Payment Card (The "Black Gold" Look) */}
     <div className="relative group rounded-[3rem] p-1 bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl overflow-hidden">
      <div className="relative p-10 space-y-8 text-white z-10">
       <div className="flex justify-between items-start">
        <div className="space-y-1">
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Application Fee</p>
         <h3 className="text-4xl font-black italic tracking-tighter">৳ {application.payment?.amount}</h3>
        </div>
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
         <CreditCard className="w-6 h-6 text-indigo-400" />
        </div>
       </div>

       <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
         <Badge className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest border-none">
          {application.paymentStatus}
         </Badge>
        </div>
        <div className="flex justify-between items-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</span>
         <span className="text-xs font-black font-mono text-indigo-300">{application.payment?.transactionId?.slice(0, 12) || 'N/A'}...</span>
        </div>
       </div>

       <div className="absolute bottom-0 right-0 p-4 opacity-5">
        <ShieldCheck className="h-32 w-32" />
       </div>
      </div>
     </div>
    </div>

    {/* 📄 RIGHT COLUMN: MAIN CONTENT */}
    <div className="lg:col-span-8">
     <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
      <CardHeader className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-row items-center justify-between">
       <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-200">
         <FileText className="w-5 h-5" />
        </div>
        <CardTitle className="text-xl font-black uppercase tracking-tight text-slate-800">Personal Portfolio</CardTitle>
       </div>
       <ArrowUpRight className="w-5 h-5 text-slate-300" />
      </CardHeader>

      <CardContent className="p-10 md:p-14 space-y-16">

       {/* Identity Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
         <InfoField icon={User} label="Father's Full Name" value={application.fatherName} />
         <InfoField icon={User} label="Mother's Full Name" value={application.motherName} />
        </div>

        <div className="grid grid-cols-3 gap-4">
         <StatBox icon={HeartPulse} label="Blood" value={application.bloodGroup || 'N/A'} color="text-rose-500" />
         <StatBox icon={Languages} label="Religion" value={application.religion || 'Islam'} color="text-indigo-500" />
         <StatBox icon={Fingerprint} label="Gender" value={application.gender} color="text-violet-500" />
        </div>
       </div>

       {/* Address Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 bg-slate-50 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
         <MapPin className="h-40 w-40" />
        </div>
        <div className="space-y-4">
         <div className="flex items-center gap-2 text-indigo-600">
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Present Address</span>
         </div>
         <p className="text-sm font-bold text-slate-600 leading-relaxed">{application.presentAddress}</p>
        </div>
        <div className="space-y-4">
         <div className="flex items-center gap-2 text-purple-600">
          <History className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Permanent Address</span>
         </div>
         <p className="text-sm font-bold text-slate-600 leading-relaxed">{application.permanentAddress}</p>
        </div>
       </div>

       {/* Previous School Card */}
       <div className="relative group p-10 rounded-[2.5rem] border-2 border-dashed border-slate-100 hover:border-indigo-100 transition-all duration-500">
        <div className="flex flex-col md:flex-row items-center gap-8">
         <div className="h-20 w-20 bg-indigo-50 text-indigo-500 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
          <GraduationCap className="h-10 w-10" />
         </div>
         <div className="text-center md:text-left flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Previous Academic Institution</p>
          <h4 className="text-2xl font-black text-slate-900 leading-tight uppercase italic">{application.previousSchool}</h4>
         </div>
        </div>
       </div>

      </CardContent>
     </Card>
    </div>
   </div>

   <div className="text-center py-10">
    <div className="inline-flex items-center gap-4 px-6 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
     <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">FaithBridge International Registry &bull; Ref: {application.id}</p>
    </div>
   </div>
  </div>
 );
};

/* --- 🧩 UI COMPONENTS --- */

const ContactItem = ({ icon: Icon, label, value, color }: any) => (
 <div className="group flex items-center gap-5 p-2 rounded-3xl transition-all duration-300 hover:translate-x-2">
  <div className={`p-4 bg-white rounded-2xl shadow-sm border border-slate-100 ${color} group-hover:shadow-lg transition-all`}>
   <Icon className="w-5 h-5" />
  </div>
  <div className="flex flex-col">
   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</span>
   <span className="text-sm font-black text-slate-800">{value || 'N/A'}</span>
  </div>
 </div>
);

const InfoField = ({ icon: Icon, label, value }: any) => (
 <div className="group flex items-start">
  <div className="p-4 bg-slate-50 rounded-2xl mr-5 group-hover:bg-indigo-50 transition-colors border border-transparent group-hover:border-indigo-100">
   <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
  </div>
  <div className="flex flex-col border-b border-slate-50 pb-4 flex-1">
   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</span>
   <span className="text-lg font-black text-slate-900 uppercase italic">{value}</span>
  </div>
 </div>
);

const StatBox = ({ icon: Icon, label, value, color }: any) => (
 <div className="flex flex-col gap-2 items-center justify-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:shadow-xl hover:bg-white group cursor-default">
  <Icon className={`w-5 h-5 ${color} group-hover:scale-125 transition-transform`} />
  <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
  <span className={`font-black text-xs uppercase ${color}`}>{value}</span>
 </div>
);

export default MyApplicationClient;