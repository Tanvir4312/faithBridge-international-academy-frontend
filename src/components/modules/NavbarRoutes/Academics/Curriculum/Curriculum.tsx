"use client";

import React from "react";
import { motion } from "framer-motion";
import {
 BookOpen,
 Languages,
 Monitor,
 Microscope,
 Heart,
 Star,
 CheckCircle2,
 Library
} from "lucide-react";

const curriculumFeatures = [
 {
  id: 1,
  title: "জাতীয় শিক্ষাক্রম অনুসরণ",
  desc: "আমরা জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত পাঠ্যসূচী অনুসরণ করি যা শিক্ষার্থীদের সঠিক ভিত্তি তৈরি নিশ্চিত করে।",
  icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
 },
 {
  id: 2,
  title: "সমন্বিত ধর্মীয় শিক্ষা",
  desc: "সাধারণ শিক্ষার পাশাপাশি ইসলামিক শিক্ষা এবং অন্য ধর্মের শিক্ষার্থীদের জন্য নিজ নিজ ধর্মের শিক্ষক দ্বারা ধর্মীয় অনুশাসন শেখানো হয়।",
  icon: <Heart className="w-6 h-6 text-rose-500" />,
 },
 {
  id: 3,
  title: "ডিজিটাল ও স্মার্ট লার্নিং",
  desc: "প্রজেক্টর ও ইন্টারঅ্যাকটিভ বোর্ডের মাধ্যমে ডিজিটাল কন্টেন্ট ব্যবহার করে প্রতিটি পাঠকে আনন্দদায়ক ও সহজবোধ্য করা হয়।",
  icon: <Monitor className="w-6 h-6 text-blue-500" />,
 },
 {
  id: 4,
  title: "ভাষা দক্ষতা উন্নয়ন",
  desc: "বাংলা ও ইংরেজি ভাষার পাশাপাশি আরবি ভাষার ওপর বিশেষ গুরুত্ব দিয়ে শিক্ষার্থীদের বহু-ভাষিক ভিত্তি তৈরি করা হয়।",
  icon: <Languages className="w-6 h-6 text-cyan-500" />,
 },
 {
  id: 5,
  title: "আধুনিক ল্যাব ও লাইব্রেরি",
  desc: "তাত্ত্বিক জ্ঞানের পাশাপাশি বিজ্ঞান ও প্রযুক্তির হাতে-কলমে শিক্ষা দিতে আমাদের রয়েছে সমৃদ্ধ সায়েন্স ল্যাব ও লাইব্রেরি।",
  icon: <Microscope className="w-6 h-6 text-purple-500" />,
 },
 {
  id: 6,
  title: "ব্যক্তিগত যত্ন (১:১৫ অনুপাত)",
  desc: "প্রতিটি ক্লাসে শিক্ষক ও শিক্ষার্থীর আদর্শ অনুপাত বজায় রাখা হয় যেন প্রতিটি শিশু শিক্ষকের নিবিড় পর্যবেক্ষণ পায়।",
  icon: <Star className="w-6 h-6 text-amber-500" />,
 },
];

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: { staggerChildren: 0.15 }
 }
};

const itemVariants = {
 hidden: { y: 30, opacity: 0 },
 visible: { y: 0, opacity: 1 }
};

export default function Curriculum() {
 return (
  <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
   <div className="container mx-auto px-4">

    {/* Section Header */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
     <div className="max-w-2xl">
      <motion.span
       initial={{ opacity: 0, x: -20 }}
       whileInView={{ opacity: 1, x: 0 }}
       className="text-emerald-600 font-bold tracking-widest uppercase text-sm"
      >
       Academic Excellence
      </motion.span>
      <motion.h2
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2"
      >
       আধুনিক ও আদর্শ কারিকুলাম
      </motion.h2>
     </div>
     <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="hidden md:block"
     >
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
       <Library className="w-5 h-5" />
       <span>উন্নত শিক্ষা পদ্ধতি</span>
      </div>
     </motion.div>
    </div>

    {/* Curriculum Grid */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true }}
     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
     {curriculumFeatures.map((feature) => (
      <motion.div
       key={feature.id}
       variants={itemVariants}
       whileHover={{ y: -10 }}
       className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
      >
       <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
       </div>
       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        {feature.title}
       </h3>
       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {feature.desc}
       </p>

       <div className="mt-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Quality Verified</span>
       </div>
      </motion.div>
     ))}
    </motion.div>

    {/* Bottom Educational Philosophy */}
    <motion.div
     initial={{ opacity: 0, y: 40 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mt-20 p-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-[3rem]"
    >
     <div className="bg-white dark:bg-slate-900 rounded-[2.9rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
       <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">আমাদের শিক্ষা দর্শন</h4>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
        "আমরা শুধু পাঠ্যবইয়ের জ্ঞান নয়, বরং নৈতিকতা, শৃঙ্খলা এবং আধুনিক প্রযুক্তির সমন্বয়ে প্রতিটি শিক্ষার্থীকে আগামী দিনের যোগ্য নাগরিক হিসেবে গড়ে তুলতে প্রতিশ্রুতিবদ্ধ।"
       </p>
      </div>
      <div className="shrink-0">
       <div className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/30">
        সাফল্যের হার ১০০%
       </div>
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 );
}