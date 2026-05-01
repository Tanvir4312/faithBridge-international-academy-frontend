"use client";

import { motion } from "framer-motion";
import {
 GraduationCap,
 ShieldCheck,
 Mail,
 Phone,
 Clock,
 BookOpen,
 Users,
 Star,
 CheckCircle2
} from "lucide-react";

export default function ProspectusPage() {
 return (
  <section className="relative z-10 py-20 bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-md overflow-hidden">
   <div className="max-w-6xl mx-auto px-4">

    {/* Header Section */}
    <div className="text-center mb-16">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-4"
     >
      <Star className="w-4 h-4" />
      FaithBridge Prospectus 2026
     </motion.div>
     <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 italic">
      আমাদের একাডেমি সম্পর্কে <span className="text-emerald-600">বিস্তারিত</span>
     </h2>
     <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
      আধুনিক শিক্ষার সাথে নৈতিক ও ইসলামিক মূল্যবোধের সমন্বয় ঘটিয়ে আমরা শিক্ষার্থীদের আগামীর চ্যালেঞ্জ মোকাবিলায় তৈরি করি।
     </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

     {/* Column 1: Core Values */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="lg:col-span-2 space-y-8"
     >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {[
        { title: "ইসলামিক পরিবেশ", desc: "কুরআন ও সুন্নাহর আলোকে নৈতিক শিক্ষা।", icon: GraduationCap },
        { title: "অভিজ্ঞ শিক্ষক", desc: "উচ্চ শিক্ষিত ও দক্ষ শিক্ষক মণ্ডলী।", icon: Users },
        { title: "আধুনিক পাঠদান", desc: "ডিজিটাল ক্লাসরুম ও সৃজনশীল পদ্ধতি।", icon: BookOpen },
        { title: "নিরাপদ ক্যাম্পাস", desc: "সিসিটিভি ও নিশ্ছিদ্র নিরাপত্তা ব্যবস্থা।", icon: ShieldCheck },
       ].map((item, i) => (
        <div key={i} className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-colors group">
         <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
         </div>
         <h4 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h4>
         <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
        </div>
       ))}
      </div>

      {/* Curriculum Highlights */}
      <div className="p-8 rounded-[3rem] bg-emerald-600 text-white relative overflow-hidden">
       <CheckCircle2 className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10" />
       <h3 className="text-2xl font-bold mb-4">ভর্তি প্রক্রিয়া ও কারিকুলাম</h3>
       <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["প্লে থেকে দশম শ্রেণী পর্যন্ত ভর্তি", "জাতীয় শিক্ষাক্রম", "হিফজুল কুরআন বিভাগ", "স্পোকেন ইংলিশ ও আইটি কোর্স"].map((list, j) => (
         <li key={j} className="flex items-center gap-2 text-emerald-50">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{list}</span>
         </li>
        ))}
       </ul>
      </div>
     </motion.div>

     {/* Column 2: Contact & Support (Full Details) */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6"
     >
      <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-2xl h-full flex flex-col justify-between">
       <div>
        <h3 className="text-2xl font-bold mb-6 italic">যোগাযোগের তথ্য</h3>

        <div className="space-y-6">
         {/* Email Section */}
         <a href="mailto:info@faithbridge.edu" className="flex items-center gap-4 group">
          <div className="p-3 bg-emerald-500 rounded-xl group-hover:bg-emerald-400 transition-colors">
           <Mail className="w-5 h-5" />
          </div>
          <div>
           <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Email Address</p>
           <p className="text-sm font-semibold italic">info@faithbridge.edu</p>
          </div>
         </a>

         {/* Phone Numbers */}
         <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500 rounded-xl">
           <Phone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
           <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Help Desk</p>
           <a href="tel:+8801712345678" className="block text-sm font-bold hover:text-emerald-400">+880 1712-345678</a>
           <a href="tel:+8801812345678" className="block text-sm font-bold hover:text-emerald-400">+880 1812-345678</a>
          </div>
         </div>

         {/* Office Hours */}
         <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500 rounded-xl">
           <Clock className="w-5 h-5" />
          </div>
          <div>
           <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Working Hours</p>
           <p className="text-sm">Sun - Thu (9:00 AM - 5:00 PM)</p>
           <p className="text-[10px] text-slate-500 font-bold italic mt-1">EXCEPT GOVERNMENT HOLIDAYS</p>
          </div>
         </div>
        </div>
       </div>

       {/* Secure Payment Badge */}
       <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
         <ShieldCheck className="w-8 h-8 text-emerald-400" />
         <div>
          <p className="text-[10px] font-black uppercase text-emerald-400 italic tracking-tighter">Secure Payment Gateway</p>
          <p className="text-xs text-slate-400">Processed securely by Stripe</p>
         </div>
        </div>
       </div>
      </div>
     </motion.div>

    </div>
   </div>
  </section>
 );
}