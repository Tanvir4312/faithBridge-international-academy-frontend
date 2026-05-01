"use client";

import { motion } from "framer-motion";
import { keyFeaturesData } from "../data/KeyFeatures_Data/keyFeaturesData";

const colorVariants: Record<string, { icon: string; glow: string }> = {
  emerald: {
    icon: "bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glow: "hover:border-emerald-500/40 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.2)]"
  },
  blue: {
    icon: "bg-blue-100/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    glow: "hover:border-blue-500/40 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.2)]"
  },
  orange: {
    icon: "bg-orange-100/50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
    glow: "hover:border-orange-500/40 hover:shadow-[0_20px_50px_-12px_rgba(249,115,22,0.2)]"
  },
  purple: {
    icon: "bg-purple-100/50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
    glow: "hover:border-purple-500/40 hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.2)]"
  },
  sky: {
    icon: "bg-sky-100/50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
    glow: "hover:border-sky-500/40 hover:shadow-[0_20px_50px_-12px_rgba(14,165,233,0.2)]"
  },
  rose: {
    icon: "bg-rose-100/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    glow: "hover:border-rose-500/40 hover:shadow-[0_20px_50px_-12px_rgba(244,63,94,0.2)]"
  },
};

export default function KeyFeatures() {
  return (
    <section className="py-10 px-4 bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
          >
            আমাদের প্রধান বৈশিষ্ট্যসমূহ
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-2 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {keyFeaturesData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -15,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              // এখানে শ্যাডো এবং বর্ডার আপডেট করা হয়েছে কার্ডকে আলাদা করার জন্য
              className={`group relative p-10 rounded-[2.5rem] 
                bg-white dark:bg-slate-900 
                border-2 border-slate-100 dark:border-slate-800/60
                shadow-[0_20px_50px_rgba(0,0,0,0.05)] 
                hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]
                dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                transition-all duration-500 ease-out
                ${colorVariants[feature.color].glow}`}
            >
              <div className={`mb-8 inline-flex p-5 rounded-2xl ${colorVariants[feature.color].icon} 
                transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 
                shadow-sm group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-white/10`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                {feature.description}
              </p>

              {/* Decorative background element on hover */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="w-20 h-20 rounded-full bg-current blur-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}