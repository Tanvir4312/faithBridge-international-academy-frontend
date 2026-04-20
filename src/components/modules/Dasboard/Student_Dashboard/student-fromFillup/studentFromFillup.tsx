"use client"


import { getUserInfo } from '@/services/authService'
import { format, isPast, isFuture, isWithinInterval } from 'date-fns'
import {
 ClipboardCheck,
 Calendar,
 Clock,
 AlertCircle,
 CheckCircle2,
 ArrowRight,
 Loader2,
 ShieldAlert
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'
import ApplyFromFillupModal from './ApplyFromFillupModal'
import { getAllExam } from "@/services/admin-srever-action/exams-managements.service";
import { useQuery } from "@tanstack/react-query";

const StudentFromFillup = ({ userInfo }: { userInfo: any }) => {
 const [isModalOpen, setIsModalOpen] = useState(false)
 const [selectedExam, setSelectedExam] = useState<any>(null)

 const { data: examsResponse, isLoading: isExamsLoading } = useQuery({
  queryKey: ['exams'],
  queryFn: getAllExam,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchInterval: 1000 * 60 * 2,// 2 minutes

 })



 if (isExamsLoading) {
  return (
   <div className="h-[80vh] w-full flex items-center justify-center">
    <Loader2 className="h-10 w-10 text-primary animate-spin" />
   </div>
  )
 }

 const exams = examsResponse?.data || []
 const studentId = userInfo?.student?.id

 return (
  <div className="p-4 md:p-8 space-y-8 bg-gray-50/30 min-h-screen">
   {/* Header Section */}
   <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[2.5rem] shadow-2xl group transition-all duration-500">
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
     <ClipboardCheck className="h-48 w-48 text-primary" />
    </div>
    <div className="relative z-10 space-y-2">
     <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 text-primary uppercase font-black text-[10px] tracking-widest bg-primary/5">
      Academic Portal
     </Badge>
     <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 uppercase italic">
      Form <span className="text-primary">Fill-up</span>
     </h1>
     <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] max-w-lg">
      Manage your examination registration parameters and check eligibility status in real-time.
     </p>
    </div>
   </div>

   {/* List of Exams */}
   <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
    {exams.length === 0 ? (
     <div className="col-span-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-200">
      <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No active examinations found</p>
     </div>
    ) : (
     exams.map((exam) => {
      const startDate = new Date(exam.formFillupStart)
      const endDate = new Date(exam.formFillupEnd)
      const examDate = exam.examDate ? new Date(exam.examDate) : null
      const now = new Date()

      const hasNotStarted = isFuture(startDate)
      const hasExpired = isPast(endDate)
      const isOpen = isWithinInterval(now, { start: startDate, end: endDate })

      const alreadyFilled = exam.formFillups?.some(f => f.student.id === studentId)

      return (
       <div key={exam.id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group">
        {/* Card Header */}
        <div className="p-8 pb-4 flex justify-between items-start">
         <div className="space-y-1">
          <div className="flex items-center gap-2">
           <Badge className="bg-indigo-600 text-white border-none text-[10px] uppercase font-black px-3 py-1 rounded-full">
            {exam.year} Session
           </Badge>
           {alreadyFilled && (
            <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 text-[10px] uppercase font-black px-3 py-1 rounded-full gap-1">
             <CheckCircle2 className="h-3 w-3" />
             Registered
            </Badge>
           )}
          </div>
          <h3 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
           {exam.name}
          </h3>
         </div>
         <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 transition-colors">
          <Calendar className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" />
         </div>
        </div>

        {/* Divider */}
        <div className="px-8 flex items-center gap-2 opacity-10">
         <div className="h-[2px] flex-1 bg-gray-900" />
         <div className="h-1 w-1 rounded-full bg-gray-900" />
         <div className="h-[2px] flex-1 bg-gray-900" />
        </div>

        {/* Card Body */}
        <div className="p-8 space-y-6 flex-1">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Timeline */}
          <div className="space-y-4">
           <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.25em]">Registration Window</span>
            <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>Opens: {format(startDate, "MMM dd, yyyy - hh:mm a")}</span>
             </div>
             <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span>Closes: {format(endDate, "MMM dd, yyyy - hh:mm a")}</span>
             </div>
            </div>
           </div>
          </div>

          {/* Exam Date */}
          <div className="p-5 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-3xl border border-indigo-100/50 flex flex-col justify-center">
           <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.25em] mb-1">Examination Day</span>
           <div className="flex items-center gap-3 text-lg font-black text-indigo-950">
            <Calendar className="h-5 w-5 text-indigo-600" />
            {examDate ? format(examDate, "MMM dd, yyyy") : "TBA"}
           </div>
          </div>
         </div>

         {/* Status Messaging */}
         <div className="pt-2">
          {hasNotStarted && (
           <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs font-bold text-rose-600 leading-relaxed uppercase tracking-wider">
             Form fill-up has not started yet. <br />
             System access opens on: <span className="underline italic">{format(startDate, "MMM dd, yyyy")}</span>
            </div>
           </div>
          )}

          {hasExpired && !alreadyFilled && (
           <div className="p-4 bg-gray-100 rounded-2xl border border-red-200 flex items-start gap-4">
            <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs font-bold text-red-600 leading-relaxed uppercase tracking-wider">
             Time for form fill-up has expired. <br />
             Contact academic registration for assistance.
            </div>
           </div>
          )}
         </div>
        </div>

        {/* Card Action */}
        <div className="p-8 pt-0 mt-auto">
         {isOpen && !alreadyFilled ? (
          <Button 
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
            onClick={() => {
                setSelectedExam(exam)
                setIsModalOpen(true)
            }}
          >
            Apply for Form Fill-up
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
         ) : (
          alreadyFilled ? (
           <Button disabled className="w-full h-14 rounded-2xl bg-emerald-50 text-emerald-600 font-black uppercase tracking-[0.2em] border-2 border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Registration Complete
           </Button>
          ) : (
           <Button disabled className="w-full h-14 text-red-800 rounded-2xl bg-gray-50 font-black uppercase tracking-[0.2em] border border-gray-100">
            Registration Closed
           </Button>
          )
         )}
        </div>
       </div>
      )
     })
    )}
   </div>

   <ApplyFromFillupModal 
    isOpen={isModalOpen}
    onOpenChange={setIsModalOpen}
    exam={selectedExam}
    userInfo={userInfo}
   />

   <style jsx global>{`
                @font-face {
                    font-family: 'Inter';
                    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                }
            `}</style>
  </div>
 );
};

export default StudentFromFillup;