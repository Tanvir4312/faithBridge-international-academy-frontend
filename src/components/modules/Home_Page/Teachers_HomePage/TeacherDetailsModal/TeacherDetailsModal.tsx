"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  CheckCircle,
  X,
  User,
  Calendar
} from "lucide-react";
import { useEffect } from "react";

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: any;
}

export default function TeacherDetailsModal({ isOpen, onClose, teacher }: TeacherDetailsModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!teacher) return null;

  const joinedDate = new Date(teacher.createdat).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div key="teacher-modal-container" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Scrollable Area */}
              <div className="overflow-y-auto custom-scrollbar flex-1">
                {/* Header Gradient */}
                <div className="h-32 sm:h-40 bg-gradient-to-r from-emerald-500 to-teal-400 relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Section */}
                <div className="px-6 sm:px-10 pb-10">
                  <div className="relative -mt-16 sm:-mt-20 mb-6 flex flex-col sm:flex-row sm:items-end gap-6">
                    {/* Photo Wrapper */}
                    <div className="relative inline-block">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 shadow-xl overflow-hidden flex items-center justify-center">
                        {teacher.profilePhoto ? (
                          <img
                            src={teacher.profilePhoto}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-16 h-16 text-slate-400 dark:text-slate-600" />
                        )}
                      </div>
                      {/* Status Badge */}
                      {teacher.user?.status === "ACTIVE" && (
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1 rounded-full shadow-lg">
                          <CheckCircle className="w-8 h-8 text-emerald-500 fill-emerald-500/10" />
                        </div>
                      )}
                    </div>

                    {/* Identity */}
                    <div className="flex-1 space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {teacher.name}
                      </h2>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-sm">
                        {teacher.designation}
                      </p>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        Joined: {joinedDate}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Contact & Info */}
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                          Contact Information
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 group">
                            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">{teacher.email}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 group">
                            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                              <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{teacher.contactNumber}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 group">
                            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-500/5 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Address</span>
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{teacher.address}</span>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                          Academic Credentials
                        </h3>
                        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex gap-4">
                          <GraduationCap className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                              {teacher.qualification}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Verified Qualification</p>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Right Column: Subjects */}
                    <div className="space-y-6">
                      <section>
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                            Teaching Subjects
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {teacher.teacherSubjects?.map((item: any, idx: number) => (
                            <div
                              key={item.id || idx}
                              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${item.isPrimary
                                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                }`}
                            >
                              {item.subject.name}
                              {item.isPrimary && <span className="ml-2 opacity-70 text-[10px]">PRIMARY</span>}
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Bio / Summary (Placeholder based on design) */}
                      <section>
                        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                          Teaching Philosophy
                        </h3>
                        <div className="relative p-6 rounded-3xl bg-emerald-600 dark:bg-emerald-600/10 text-white dark:text-emerald-400 overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BookOpen className="w-20 h-20 rotate-12" />
                          </div>
                          <p className="relative z-10 text-sm font-medium leading-relaxed">
                            "Dedicated to nurturing every student's potential through modern Islamic values and excellence in education."
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </>
  );
}
