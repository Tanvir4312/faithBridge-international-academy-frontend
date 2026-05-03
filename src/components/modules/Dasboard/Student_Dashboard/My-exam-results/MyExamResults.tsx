"use client"
import { AlertCircle, Search } from 'lucide-react';
import { motion } from "framer-motion"

const ExamResultsPage = () => {
 return (
  <div>
   <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden"
   >
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
     <Search className="text-emerald-500 w-6 h-6" /> ফলাফল অনুসন্ধান
    </h3>

    <div className="space-y-4">
     {/* রোল নম্বর ফিল্ড */}
     <div>
      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">রোল নম্বর</label>
      <input
       disabled
       type="text"
       placeholder="উদা: ১০২০৩০"
       className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70"
      />
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* শ্রেণী নির্বাচন */}
      <div>
       <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">শ্রেণী</label>
       <select disabled className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70">
        <option>নির্বাচন করুন</option>
       </select>
      </div>

      {/* পরীক্ষার নাম (নতুন ফিল্ড) */}
      <div>
       <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">পরীক্ষা</label>
       <select disabled className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70">
        <option>পরীক্ষা নির্বাচন করুন</option>
        <option>১ম সাময়িক পরীক্ষা</option>
        <option>২য় সাময়িক পরীক্ষা</option>
        <option>বার্ষিক পরীক্ষা</option>
        <option>প্রাক-নির্বাচনী পরীক্ষা</option>
        <option>এসএসসি মডেল টেস্ট</option>
       </select>
      </div>
     </div>

     <button
      onClick={() => alert("সার্ভার মেইনটেন্যান্স চলছে। খুব শীঘ্রই রেজাল্ট এভেলেবল হবে।")}
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
     >
      ফলাফল দেখুন
     </button>

     <p className="flex items-center gap-2 text-[10px] text-amber-600 font-medium bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100/50">
      <AlertCircle className="w-3 h-3 shrink-0" /> বর্তমানে রেজাল্ট সার্ভার আপডেট করা হচ্ছে।
     </p>
    </div>
   </motion.div>

  </div>
 );
};

export default ExamResultsPage;