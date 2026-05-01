"use client";

import React from "react";
import { motion } from "framer-motion";
import { BellRing, AlertCircle, CalendarX } from "lucide-react";

export default function AdmissionStrictNotice() {
 return (
  <section className="py-12 bg-white dark:bg-slate-950">
   <div className="container mx-auto px-4">
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="max-w-3xl mx-auto border-2 border-red-100 dark:border-red-900/30 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-500/5"
    >
     {/* Top Alert Bar */}
     <div className="bg-red-600 p-4 flex items-center justify-center gap-3 text-white">
      <BellRing className="w-5 h-5 animate-bounce" />
      <span className="font-bold tracking-widest uppercase text-sm">জরুরি ভর্তি বিজ্ঞপ্তি</span>
     </div>

     <div className="p-8 md:p-12 bg-red-50/30 dark:bg-red-950/10 text-center">
      <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
       <CalendarX className="w-10 h-10 text-red-600" />
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
       ভর্তির সময়সূচী সংক্রান্ত বিশেষ ঘোষণা
      </h3>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
       <p className="text-lg leading-relaxed">
        ফেইথব্রিজ ইন্টারন্যাশনাল একাডেমিতে প্রতি বছর ভর্তির কার্যক্রম কেবল
        <span className="mx-2 px-3 py-1 bg-red-600 text-white rounded-lg font-bold">
         ২৫শে ডিসেম্বর থেকে ৩০শে ডিসেম্বর
        </span>
        পর্যন্ত চলমান থাকে।
       </p>

       <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-800 shadow-sm"
       >
        <div className="flex items-start gap-4 text-left">
         <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
         <p className="font-bold text-red-700 dark:text-red-400 text-base md:text-lg">
          সতর্কবার্তা: নির্ধারিত এই সময়ের বাইরে অন্য কোনো সময়ে বা অন্য কোনোভাবে কোনো শিক্ষার্থীকে বিদ্যালয়ে ভর্তি করা হয় না।
         </p>
        </div>
       </motion.div>

       <p className="text-sm text-slate-500 dark:text-slate-400 italic">
        ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি বিদ্যালয়ে অথবা ওয়েবসাইটে দেয়া নম্বরে যোগাযোগ করুন।
       </p>
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 );
}