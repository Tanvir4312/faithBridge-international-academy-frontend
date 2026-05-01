"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ArrowRight, User } from "lucide-react";

interface TeacherProps {
 teacher: {
  id: string;
  name: string;
  designation: string;
  profilePhoto: string | null;
  qualification: string;
  teacherSubjects: any[];
 };
 onOpenModal: (teacher: any) => void;
}

export default function TeacherCard({ teacher, onOpenModal }: TeacherProps) {

 return (
  <motion.div
   onClick={() => onOpenModal(teacher)}
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   whileHover={{ y: -10 }}
   className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

   {/* Profile Image / Icon Section */}
   <div className="relative w-32 h-32 mx-auto mb-6">
    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-colors" />
    <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
     {teacher.profilePhoto ? (
      <img
       src={teacher.profilePhoto}
       alt={teacher.name}
       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
     ) : (
      <User className="w-16 h-16 text-slate-400 dark:text-slate-600" />
     )}
    </div>
   </div>

   <div className="text-center">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
     {teacher.name}
    </h3>
    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4">
     {teacher.designation}
    </p>

    <div className="space-y-3 mb-6">
     <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
      <GraduationCap className="w-4 h-4 text-emerald-500" />
      <span className="truncate">{teacher.qualification}</span>
     </div>
     <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
      <BookOpen className="w-4 h-4 text-blue-500" />
      {
       teacher.teacherSubjects.find((primarySubject: any) => primarySubject.isPrimary === true)?.subject?.name || "General"
      }
     </div>
    </div>

    <button

     className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 border border-slate-200 dark:border-slate-700 group-hover:border-emerald-600 shadow-sm"
    >
     View Full Profile
     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
   </div>
  </motion.div>
 );
}