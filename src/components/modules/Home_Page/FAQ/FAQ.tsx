"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Lock, ShieldCheck, Mail, Phone } from "lucide-react";
import { faqData } from "../data/FAQData/FaqData";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    // bg-white/50 বা dark:bg-[#0B1120]/50 ব্যবহার করে স্বচ্ছতা নিশ্চিত করা হয়েছে
    <section className="relative z-10 py-10 mt-10  dark:bg-[#0B1120]/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 italic"
          >
            সাধারণ প্রশ্ন
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-400">
            ভর্তি, একাডেমিক কার্যক্রম এবং নিরাপদ পেমেন্ট সংক্রান্ত জিজ্ঞাসা।
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData && faqData.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.005 }}
              className={`group border rounded-[2rem] overflow-hidden transition-all duration-300 cursor-pointer ${activeIndex === index
                ? "border-emerald-500 shadow-lg shadow-emerald-500/10 bg-white dark:bg-slate-900"
                : "border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40"
                }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 sm:p-8 text-left outline-none transition-all ${activeIndex === index
                  ? "bg-emerald-600 text-white"
                  : "text-slate-900 dark:text-white hover:bg-emerald-500/5"
                  }`}
              >
                <span className="text-lg font-bold pr-4 leading-tight">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-2 rounded-full ${activeIndex === index ? "bg-white/20" : "bg-emerald-100 dark:bg-emerald-500/20"}`}>
                  {activeIndex === index ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Full Width Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative Background Elements */}
          <ShieldCheck className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 text-emerald-500 group-hover:scale-110 transition-transform duration-700" />


          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
                এখনো কোনো <span className="text-emerald-400">প্রশ্ন আছে?</span>
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                ভর্তি বা পেমেন্ট সংক্রান্ত যেকোনো সরাসরি সহায়তার জন্য আমাদের কন্টাক্ট টিম সর্বদা প্রস্তুত।
              </p>

              <div className="space-y-2">
                <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Office Hours</p>
                <p className="text-slate-300">
                  Sunday - Thursday (9:00 AM - 5:00 PM) <br />
                  <span className="text-[10px] text-slate-500 font-bold">Except Government Holidays</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email Button */}
              <motion.a
                href="mailto:support@faithbridge.com"
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">ইমেইল করুন</p>
                  <p className="text-lg font-bold">support@faithbridge.com</p>
                </div>
              </motion.a>

              {/* Phone Numbers */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase">সরাসরি কল দিন</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pl-2">
                  <a className="text-md font-bold hover:text-emerald-400 transition-colors">+880 1712-345678</a>
                  <a className="text-md font-bold hover:text-emerald-400 transition-colors">+880 1812-345678</a>
                  <a className="text-md font-bold hover:text-emerald-400 transition-colors">+880 1912-345678</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}