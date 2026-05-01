"use client";

import React from "react";
import { motion } from "framer-motion";
import {
 Users,
 GraduationCap,
 Calendar,
 Trophy,
 Bus,
 ShieldCheck,
 Clock,
 Heart,
 Palmtree,
 TrophyIcon,
 BadgeDollarSign,
 Home,
 PhoneCall
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllStudentWithoutQuery } from "@/services/admin-srever-action/students-managements.service";
import { getAllTeacher } from "@/services/admin-srever-action/teachers-managements.service";


const specializedFeatures = [
 { title: "ধর্মীয় ও নৈতিক শিক্ষা", desc: "ইসলামিক শিক্ষার পাশাপাশি অন্য ধর্মের শিক্ষার্থীদের জন্য নিজ নিজ ধর্মের শিক্ষক দ্বারা ধর্মীয় অনুশাসন শেখানো হয়।", icon: <Heart className="w-6 h-6 text-rose-500" /> },
 { title: "নিজস্ব হোস্টেল সুবিধা", desc: "আমাদের রয়েছে নিরাপদ হোস্টেল যেখানে শিক্ষার্থীরা অভিজ্ঞ শিক্ষকদের সরাসরি তত্ত্বাবধানে থাকার সুযোগ পায়।", icon: <Home className="w-6 h-6 text-blue-500" /> },
 { title: "নিজস্ব পরিবহন", desc: "শিক্ষার্থীদের যাতায়াতের সুবিধার জন্য আমাদের রয়েছে নিরাপদ ও সুনিয়ন্ত্রিত নিজস্ব পরিবহন ব্যবস্থা।", icon: <Bus className="w-6 h-6 text-emerald-500" /> },
 { title: "আবাসিক ও অনাবাসিক", desc: "শিক্ষার্থীদের প্রয়োজন অনুযায়ী আমরা আবাসিক ও অনাবাসিক উভয় ধরণের ভর্তির সুবিধা প্রদান করি।", icon: <ShieldCheck className="w-6 h-6 text-indigo-500" /> },
 { title: "বার্ষিক ক্রীড়া প্রতিযোগিতা", desc: "শিক্ষার্থীদের শারীরিক ও মানসিক বিকাশে প্রতি বছর জাঁকজমকপূর্ণ বার্ষিক স্পোর্টস আয়োজন করা হয়।", icon: <TrophyIcon className="w-6 h-6 text-yellow-500" /> },
 { title: "বার্ষিক বনভোজন", desc: "পড়াশোনার একঘেয়েমি কাটাতে প্রতি বছর মনোরম পরিবেশে বার্ষিক পিকনিকের আয়োজন থাকে।", icon: <Palmtree className="w-6 h-6 text-cyan-500" /> },
];

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: { staggerChildren: 0.1 }
 }
};

const itemVariants = {
 hidden: { y: 20, opacity: 0 },
 visible: { y: 0, opacity: 1 }
};

export default function SchoolAtAGlance() {
 const { data: stentsDataResponse } = useQuery({
  queryKey: ["studentsCount"],
  queryFn: getAllStudentWithoutQuery,
  refetchOnMount: true,
  refetchOnWindowFocus: true,


 })
 const { data: teachersDataResponse } = useQuery({
  queryKey: ["teachers"],
  queryFn: getAllTeacher,
  refetchOnMount: true,
  refetchOnWindowFocus: true,


 })
 const teachersRawData = teachersDataResponse?.data;
 const teachers = (teachersRawData as any)?.data || [];

 const studentsRawData = stentsDataResponse?.data;
 const students = (studentsRawData as any)?.data || [];

 const teacherCount = teachers?.length;
 const studentCount = students?.length;

 const schoolStats = [
  { id: 1, label: "স্থাপিত", value: "২০১৫", icon: <Calendar className="w-7 h-7 text-emerald-500" />, description: "এক দশকের গৌরবময় পথচলা" },
  { id: 2, label: "মোট শিক্ষার্থী", value: `${studentCount}+`, icon: <Users className="w-7 h-7 text-blue-500" />, description: "জ্ঞানের সন্ধানে নিবেদিত প্রাণ" },
  { id: 3, label: "দক্ষ শিক্ষক", value: `${teacherCount}+`, icon: <GraduationCap className="w-7 h-7 text-purple-500" />, description: "অভিজ্ঞ ও মমতাময়ী শিক্ষকমণ্ডলী" },
  { id: 4, label: "সাফল্যের হার", value: "১০০%", icon: <Trophy className="w-7 h-7 text-amber-500" />, description: "বোর্ড পরীক্ষায় ঈর্ষণীয় ফলাফল" },
 ];

 return (
  <section className="py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden">
   <div className="container mx-auto px-4">

    {/* Header Section */}
    <motion.div
     initial={{ opacity: 0, y: -20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">এক নজরে আমাদের স্কুল</h2>
     <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      className="h-1.5 bg-emerald-500 mx-auto rounded-full"
     />
    </motion.div>

    {/* Stats Grid with Motion */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true }}
     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
     {schoolStats.map((stat) => (
      <motion.div
       key={stat.id}
       variants={itemVariants}
       whileHover={{ y: -10, transition: { duration: 0.2 } }}
       className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center"
      >
       <div className="bg-slate-50 dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">{stat.icon}</div>
       <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
       <p className="text-emerald-600 font-bold text-sm uppercase">{stat.label}</p>
      </motion.div>
     ))}
    </motion.div>

    {/* Specialized Features Grid with Motion */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true }}
     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
    >
     {specializedFeatures.map((feature, index) => (
      <motion.div
       key={index}
       variants={itemVariants}
       whileHover={{ scale: 1.02 }}
       className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-4 border-b-4 border-b-emerald-500"
      >
       <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">{feature.icon}</div>
       <h4 className="font-bold text-slate-900 dark:text-white">{feature.title}</h4>
       <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
      </motion.div>
     ))}
    </motion.div>

    {/* Admission Info Banner with Motion */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden"
    >
     <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
       <motion.h3
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold mb-4"
       >
        ভর্তি সংক্রান্ত তথ্য
       </motion.h3>
       <p className="text-emerald-100 mb-6 italic">সঠিক ও বিস্তারিত তথ্যের জন্য আমাদের কল করুন।</p>
       <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 bg-white/10 w-fit px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm"
       >
        <PhoneCall className="w-5 h-5 text-emerald-200" />
        <span className="font-bold text-sm md:text-base">যোগাযোগ: ওয়েবসাইটে দেয়া নম্বরে কল করুন</span>
       </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <motion.div
        whileHover={{ y: -5 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
       >
        <div className="flex items-center gap-3 mb-2">
         <BadgeDollarSign className="w-6 h-6 text-emerald-200" />
         <span className="font-bold">ভর্তি ফি</span>
        </div>
        <p className="text-3xl font-black">৳ ১৫০০/-</p>
       </motion.div>
       <motion.div
        whileHover={{ y: -5 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
       >
        <div className="flex items-center gap-3 mb-2">
         <Clock className="w-6 h-6 text-emerald-200" />
         <span className="font-bold">ভর্তির সময়</span>
        </div>
        <p className="text-xl font-bold">২৫ - ৩০ ডিসেম্বর</p>
        <p className="text-[10px] opacity-70 italic mt-1">প্রতি বছর এই সময়ে ভর্তি নেওয়া হয়</p>
       </motion.div>
      </div>
     </div>

     {/* Decorative background shape */}
     <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
    </motion.div>
   </div>
  </section>
 );
}