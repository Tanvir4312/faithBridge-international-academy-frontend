"use client";

import React from "react";
import { motion } from "framer-motion";
import {
 BellRing,
 CalendarCheck,
 CreditCard,
 ClipboardCheck,
 Laptop,
 Info,
 ChevronRight,
 MailCheck,
 MousePointerClick
} from "lucide-react";

export default function AdmissionNotice() {
 const steps = [
  {
   id: "০১",
   title: "অনলাইন আবেদন",
   desc: "নির্ধারিত সময়ের মধ্যে স্কুলের ওয়েবসাইট থেকে অনলাইনের মাধ্যমে আবেদন ফরম পূরণ করতে হবে।",
   icon: <Laptop className="w-5 h-5" />
  },
  {
   id: "০২",
   title: "যাচাই-বাছাই",
   desc: "আবেদনপত্র জমার পর স্কুল কর্তৃপক্ষ প্রতিটি আবেদন গুরুত্বের সাথে যাচাই-বাছাই করবেন।",
   icon: <ClipboardCheck className="w-5 h-5" />
  },
  {
   id: "০৩",
   title: "আসন বরাদ্দ",
   desc: "আবেদনকারীর যোগ্যতা এবং ক্লাসে আসন খালি থাকা সাপেক্ষে চূড়ান্ত ভর্তি নেওয়া হবে।",
   icon: <Info className="w-5 h-5" />
  }
 ];

 return (
  <section className="py-16 bg-slate-50 dark:bg-slate-950">
   <div className="container mx-auto px-4">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
     {/* Header */}
     <div className="bg-emerald-600 p-8 text-white text-center relative">
      <div className="absolute top-4 right-8 opacity-20">
       <BellRing className="w-16 h-16 rotate-12" />
      </div>
      <h2 className="text-3xl font-bold mb-2">আবেদন ও ফি সংক্রান্ত নিয়মাবলী</h2>
      <p className="text-emerald-100 text-sm">একাডেমিক সেশন: ২০২৬</p>
     </div>

     <div className="p-8 md:p-12">
      {/* Timeline & Fees Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
       <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800"
       >
        <div className="flex items-center gap-4 mb-4">
         <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm">
          <CalendarCheck className="w-6 h-6 text-emerald-600" />
         </div>
         <h3 className="font-bold text-slate-900 dark:text-white">আবেদনের সময়সীমা</h3>
        </div>
        <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">২৫ - ৩০ ডিসেম্বর</p>
        <p className="text-xs text-slate-500 mt-1 font-medium underline italic">[প্রতি বছর এই সময়ে আবেদন গ্রহণ করা হয়]</p>
       </motion.div>

       <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800"
       >
        <div className="flex items-center gap-4 mb-4">
         <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm">
          <CreditCard className="w-6 h-6 text-blue-600" />
         </div>
         <h3 className="font-bold text-slate-900 dark:text-white">আবেদন ফি (Fees)</h3>
        </div>
        <p className="text-2xl font-black text-blue-700 dark:text-blue-400">৳ ১৫০০/-</p>
        <p className="text-xs text-slate-500 mt-1 font-medium italic">অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে পরিশোধযোগ্য</p>
       </motion.div>
      </div>

      {/* Payment Instructions Card (New) */}
      <motion.div
       initial={{ opacity: 0, x: -20 }}
       whileInView={{ opacity: 1, x: 0 }}
       className="mb-12 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-200 dark:border-amber-800/50 flex flex-col md:flex-row items-center gap-6"
      >
       <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md text-amber-600">
        <MousePointerClick className="w-8 h-8" />
       </div>
       <div className="flex-1 text-center md:text-left">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-amber-700 dark:text-amber-500">পেমেন্ট ও কনফার্মেশন পদ্ধতি</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
         আবেদন ফরম সঠিকভাবে পূরণ করার পর স্ক্রিনে একটি <span className="font-bold">পেমেন্ট বাটন</span> দৃশ্যমান হবে। উক্ত বাটনে ক্লিক করে আবেদন ফি সম্পন্ন করতে হবে। পেমেন্ট সফল হলে আবেদনকারীর ইমেইলে একটি <span className="font-bold text-emerald-600">নিশ্চিতকরণ (Confirmation) ইমেইল</span> পাঠানো হবে।
        </p>
       </div>
       <div className="hidden lg:block">
        <MailCheck className="w-12 h-12 text-emerald-500 opacity-40" />
       </div>
      </motion.div>

      {/* Procedure Steps */}
      <div className="mb-10">
       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
        <ChevronRight className="text-emerald-500" /> আবেদন প্রক্রিয়া (Procedure)
       </h3>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
         <div key={index} className="relative group">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 h-full transition-all group-hover:border-emerald-500">
           <span className="text-4xl font-black text-slate-200 dark:text-slate-700 absolute top-4 right-6 group-hover:text-emerald-500/20 transition-colors">
            {step.id}
           </span>
           <div className="bg-white dark:bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm text-emerald-600">
            {step.icon}
           </div>
           <h4 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
           <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {step.desc}
           </p>
          </div>
         </div>
        ))}
       </div>
      </div>

      {/* Final Note */}
      <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
       <p className="text-xs text-slate-600 dark:text-slate-400 text-center leading-relaxed italic">
        <strong>বিশেষ দ্রষ্টব্য:</strong> নির্ধারিত ২৫-৩০ ডিসেম্বরের বাইরে কোনোভাবেই আবেদন গ্রহণ বা শিক্ষার্থী ভর্তি করা হয় না।
       </p>
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 );
}