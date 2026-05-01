import React from 'react';
import {
 Mail, Phone, MapPin, GraduationCap,
 Calendar, BookOpen, CheckCircle2, UserCircle2
} from 'lucide-react';

const TeacherCard = ({ teacher }: { teacher: any }) => {
 const {
  name,
  designation,
  email,
  contactNumber,
  address,
  profilePhoto,
  qualification,
  createdat,
  classTeacher,
  teacherSubjects
 } = teacher;

 const joinedDate = new Date(createdat).toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric'
 });

 return (
  <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 relative group my-5">

   {/* Top Banner */}
   <div className="h-32 md:h-40 bg-emerald-500 relative">
    <div className="absolute right-6 top-6">

    </div>
   </div>

   <div className="px-6 md:px-12 pb-12">
    <div className="flex flex-col md:flex-row gap-8">

     {/* Profile Image */}
     <div className="relative -mt-16 md:-mt-20 flex-shrink-0">
      <div className="relative inline-block">
       <img
        src={profilePhoto}
        alt={name}
        className="w-32 h-32 md:w-44 md:h-44 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-xl"
       />
       <div className="absolute -right-2 -bottom-2 bg-white dark:bg-slate-900 rounded-full p-1">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-emerald-50" />
       </div>
      </div>
     </div>

     {/* Name & Designation */}
     <div className="mt-2 md:mt-6 flex-1">
      <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white italic tracking-tight">
       {name}
      </h2>

      <div className="flex flex-wrap items-center gap-3 mt-3">
       <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase tracking-widest">
        {designation}
       </span>

       {classTeacher?.class?.name && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full">
         <UserCircle2 className="w-3.5 h-3.5 text-amber-600" />
         <span className="text-[10px] font-bold text-amber-600 uppercase">
          Class Teacher: {classTeacher.class.name}
         </span>
        </div>
       )}
      </div>

      <div className="flex items-center gap-2 mt-3 text-slate-500 dark:text-slate-400 text-sm italic">
       <Calendar className="w-4 h-4" />
       <span>Joined: {joinedDate}</span>
      </div>
     </div>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">

     {/* Contact Info */}
     <div className="space-y-6">
      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">Contact Information</h4>
      <div className="space-y-4">
       <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
         <Mail className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
         <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
         <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{email}</p>
        </div>
       </div>

       <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
         <Phone className="w-5 h-5 text-blue-600" />
        </div>
        <div>
         <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
         <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{contactNumber}</p>
        </div>
       </div>

       <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl">
         <MapPin className="w-5 h-5 text-orange-600" />
        </div>
        <div>
         <p className="text-[10px] font-bold text-slate-400 uppercase">Address</p>
         <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{address}</p>
        </div>
       </div>
      </div>
     </div>

     {/* Teaching Subjects & Academic */}
     <div className="space-y-8">
      <div className="space-y-4">
       <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">Teaching Subjects</h4>
       <div className="flex flex-wrap gap-2 pt-2">
        {teacherSubjects?.map((item: any, idx: number) => (
         <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${item.isPrimary ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
          {item.subject.name} {item.isPrimary && ' (Primary)'}
         </span>
        ))}
       </div>
      </div>

      <div className="space-y-4">
       <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">Academic Credentials</h4>
       <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
        <GraduationCap className="w-6 h-6 text-emerald-600" />
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{qualification}</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default TeacherCard;