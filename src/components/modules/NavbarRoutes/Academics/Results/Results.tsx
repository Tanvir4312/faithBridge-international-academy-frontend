"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Trophy, FileText, Star, AlertCircle } from "lucide-react";

const achievers = [
 {
  name: "আরিয়ান আহমেদ",
  result: "Golden A+",
  session: "২০২৪-২৫",
  image: "https://i.ibb.co.com/chvH4D4w/young-man-with-charming-smile-blue-eyes-posing.jpg",
 },
 {
  name: "সাদিয়া ইসলাম",
  result: "Golden A+",
  session: "২০২৪-২৫",
  image: "https://i.ibb.co.com/TBs0gGfx/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink.jpg",
 },
 {
  name: "তানভীর মাহমুদ",
  result: "Golden A+",
  session: "২০২৩-২৪",
  image: "https://i.ibb.co.com/WWm6Zcwr/smiling-student-with-laptop.jpg",
 },
];

export default function HomeResultPreview() {
 return (
  <div className="py-10">
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* বাম পাশ: কুইক সার্চ ফর্ম (Static) */}
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

    {/* ডান পাশ: সাফল্য ও স্ট্যাটাস (Static Content) */}
    <div className="space-y-6">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-l-8 border-emerald-500 shadow-sm flex items-center gap-5 group"
     >
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-2xl group-hover:scale-110 transition-transform">
       <Trophy className="text-emerald-600 w-8 h-8" />
      </div>
      <div>
       <h4 className="font-bold text-slate-900 dark:text-white text-lg">বিগত বছরের সাফল্য</h4>
       <p className="text-sm text-slate-500">বোর্ড পরীক্ষায় আমাদের পাসের হার ১০০% এবং জিপিএ-৫ প্রাপ্তি ঈর্ষণীয়।</p>
      </div>
     </motion.div>

     <div className="grid grid-cols-2 gap-4">
      <motion.div
       whileHover={{ y: -5 }}
       className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center"
      >
       <Star className="mx-auto text-yellow-400 mb-3 w-6 h-6 fill-yellow-400" />
       <h5 className="font-black text-3xl text-slate-900 dark:text-white">৮৫+</h5>
       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">জিপিএ ৫ প্রাপ্ত</p>
      </motion.div>

      <motion.div
       whileHover={{ y: -5 }}
       className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center"
      >
       <FileText className="mx-auto text-blue-500 mb-3 w-6 h-6" />
       <h5 className="font-bold text-slate-900 dark:text-white">Result</h5>
       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">Notice Board</p>
      </motion.div>
     </div>

     <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-center"
     >
      <p className="text-xs text-slate-600 dark:text-slate-400">
       পরবর্তী পরীক্ষার ফলাফল প্রকাশিত হবে: <span className="font-bold text-emerald-600">৩০শে জুন, ২০২৬</span>
      </p>
     </motion.div>
    </div>

   </div>

   <div className="mt-16">
    <div className="text-center mb-10">
     <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
      <Trophy className="text-amber-500 w-6 h-6" /> আমাদের কৃতি শিক্ষার্থী
     </h4>
     <p className="text-sm text-slate-500 mt-2">বিগত এসএসসি পরীক্ষায় যারা গোল্ডেন এ+ পেয়ে স্কুলের গৌরব বাড়িয়েছে</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
     {achievers.map((student, index) => (
      <motion.div
       key={index}
       initial={{ opacity: 0, scale: 0.9 }}
       whileInView={{ opacity: 1, scale: 1 }}
       transition={{ delay: index * 0.2 }}
       whileHover={{ y: -10 }}
       className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-emerald-100 dark:border-slate-800 text-center shadow-lg hover:shadow-emerald-500/10 transition-all"
      >
       <div className="relative w-24 h-24 mx-auto mb-4">
        <img
         src={student.image}
         alt={student.name}
         className="rounded-full h-full w-full object-cover bg-emerald-50 dark:bg-emerald-900/30 border-4 border-white dark:border-slate-800 shadow-md"
        />
        <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-full border-2 border-white dark:border-slate-800">
         <Star className="w-4 h-4 text-white fill-white" />
        </div>
       </div>

       <h5 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h5>
       <div className="mt-2 inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest">
        {student.result}
       </div>
       <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-wider">সেশন: {student.session}</p>
      </motion.div>
     ))}
    </div>
   </div>
  </div>
 );
}



// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Search, Trophy, FileText, Star, AlertCircle, ClipboardList } from "lucide-react";

// const achievers = [
//  {
//   name: "আরিয়ান আহমেদ",
//   result: "Golden A+",
//   session: "২০২৪-২৫",
//   image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ariyan",
//  },
//  {
//   name: "সাদিয়া ইসলাম",
//   result: "Golden A+",
//   session: "২০২৪-২৫",
//   image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sadia",
//  },
//  {
//   name: "তানভীর মাহমুদ",
//   result: "Golden A+",
//   session: "২০২৩-২৪",
//   image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir",
//  },
// ];

// export default function HomeResultPreview() {
//  return (
//   <section className="py-16 bg-white dark:bg-slate-950">
//    <div className="container mx-auto px-4">
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

//      {/* বাম পাশ: কুইক সার্চ ফর্ম (সংশোধিত) */}
//      <motion.div
//       initial={{ opacity: 0, x: -30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden"
//      >
//       <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
//        <Search className="text-emerald-500 w-6 h-6" /> ফলাফল অনুসন্ধান
//       </h3>

//       <div className="space-y-4">
//        {/* রোল নম্বর ফিল্ড */}
//        <div>
//         <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">রোল নম্বর</label>
//         <input
//          disabled
//          type="text"
//          placeholder="উদা: ১০২০৩০"
//          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70"
//         />
//        </div>

//        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* শ্রেণী নির্বাচন */}
//         <div>
//          <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">শ্রেণী</label>
//          <select disabled className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70">
//           <option>নির্বাচন করুন</option>
//          </select>
//         </div>

//         {/* পরীক্ষার নাম (নতুন ফিল্ড) */}
//         <div>
//          <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-widest">পরীক্ষা</label>
//          <select disabled className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed opacity-70">
//           <option>পরীক্ষা নির্বাচন করুন</option>
//           <option>১ম সাময়িক পরীক্ষা</option>
//           <option>২য় সাময়িক পরীক্ষা</option>
//           <option>বার্ষিক পরীক্ষা</option>
//           <option>প্রাক-নির্বাচনী পরীক্ষা</option>
//           <option>এসএসসি মডেল টেস্ট</option>
//          </select>
//         </div>
//        </div>

//        <button
//         onClick={() => alert("সার্ভার মেইনটেন্যান্স চলছে। খুব শীঘ্রই রেজাল্ট এভেলেবল হবে।")}
//         className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
//        >
//         ফলাফল দেখুন
//        </button>

//        <p className="flex items-center gap-2 text-[10px] text-amber-600 font-medium bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100/50">
//         <AlertCircle className="w-3 h-3 shrink-0" /> বর্তমানে রেজাল্ট সার্ভার আপডেট করা হচ্ছে।
//        </p>
//       </div>
//      </motion.div>

//      {/* ডান পাশ: সাফল্য ও স্ট্যাটিস্টিকস */}
//      <div className="space-y-6">
//       <motion.div
//        initial={{ opacity: 0, y: 20 }}
//        whileInView={{ opacity: 1, y: 0 }}
//        className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-l-8 border-emerald-500 shadow-sm flex items-center gap-5 group"
//       >
//        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-2xl group-hover:scale-110 transition-transform">
//         <Trophy className="text-emerald-600 w-8 h-8" />
//        </div>
//        <div>
//         <h4 className="font-bold text-slate-900 dark:text-white text-lg">বিগত বছরের সাফল্য</h4>
//         <p className="text-sm text-slate-500">বোর্ড পরীক্ষায় আমাদের পাসের হার ১০০% এবং জিপিএ-৫ প্রাপ্তি ঈর্ষণীয়।</p>
//        </div>
//       </motion.div>

//       <div className="grid grid-cols-2 gap-4">
//        <motion.div whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
//         <Star className="mx-auto text-yellow-400 mb-3 w-6 h-6 fill-yellow-400" />
//         <h5 className="font-black text-3xl text-slate-900 dark:text-white">৮৫+</h5>
//         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">জিপিএ ৫ প্রাপ্ত</p>
//        </motion.div>

//        <motion.div whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
//         <ClipboardList className="mx-auto text-blue-500 mb-3 w-6 h-6" />
//         <h5 className="font-bold text-slate-900 dark:text-white">নোটিশ</h5>
//         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">সর্বশেষ রেজাল্ট</p>
//        </motion.div>
//       </div>
//      </div>
//     </div>

//     {/* কৃতি শিক্ষার্থী (Wall of Fame) */}
//     <div className="mt-16">
//      <div className="text-center mb-12">
//       <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">আমাদের কৃতি শিক্ষার্থী</h4>
//       <p className="text-sm text-slate-500 max-w-lg mx-auto">বিগত এসএসসি পরীক্ষায় যারা গোল্ডেন এ+ পেয়ে স্কুলের গৌরব বাড়িয়েছে।</p>
//      </div>

//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {achievers.map((student, index) => (
//        <motion.div
//         key={index}
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ delay: index * 0.1 }}
//         whileHover={{ y: -10 }}
//         className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 text-center shadow-lg hover:shadow-emerald-500/10 transition-all"
//        >
//         <div className="relative w-24 h-24 mx-auto mb-5">
//          <img src={student.image} alt={student.name} className="rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-sm" />
//          <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1.5 rounded-full border-2 border-white dark:border-slate-900">
//           <Star className="w-3 h-3 text-white fill-white" />
//          </div>
//         </div>
//         <h5 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h5>
//         <div className="mt-3 inline-block px-4 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
//          {student.result}
//         </div>
//         <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-wider">সেশন: {student.session}</p>
//        </motion.div>
//       ))}
//      </div>
//     </div>
//    </div>
//   </section>
//  );
// }