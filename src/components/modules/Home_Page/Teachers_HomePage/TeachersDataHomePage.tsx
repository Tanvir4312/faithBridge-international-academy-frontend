"use client"

import { getAllTeacher } from "@/services/admin-srever-action/teachers-managements.service"
import { useQuery } from "@tanstack/react-query"
import TeacherCard from "./TeacherCard/TeacherCard"
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import TeacherDetailsModal from "./TeacherDetailsModal/TeacherDetailsModal";


const TeachersDataHomePage = () => {
 const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const { data: teachersResponse, isLoading, refetch } = useQuery({
  queryKey: ["teachers"],
  queryFn: getAllTeacher,
  refetchOnWindowFocus: true
 })


 const teachers = teachersResponse?.data || []
 const seniorTeacher = teachers.filter((teacher: any) => teacher.designation === "Principal" || teacher.designation === "Senior Teacher").slice(0, 6)

 const handleOpenModal = (teacher: any) => {
  setSelectedTeacher(teacher);
  setIsModalOpen(true);
 };


 return (
  <section className="py-10 bg-gray-50 dark:bg-[#020617]">
   <div className="max-w-7xl mx-auto px-4">
    {/* Heading Section */}
    <div className="text-center mb-16">
     <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
      আমাদের শিক্ষক মণ্ডলী
     </h2>
     <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
     {seniorTeacher && !isLoading && seniorTeacher?.map((teacher: any, i: number) => (
      <TeacherCard key={teacher.id || i} teacher={teacher} onOpenModal={handleOpenModal} />
     ))}
     {isLoading && <div className="col-span-full text-center">Loading...</div>}
     {seniorTeacher && seniorTeacher.length === 0 && !isLoading && <div className="col-span-full text-center">No Teachers Found</div>}
    </div>
   </div>
   <div className="mt-20 text-center relative">
    <motion.div
     initial={{ opacity: 0, y: 10 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="relative z-10 inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20"
    >
     <p className="text-slate-600 dark:text-slate-400 font-medium max-w-md">
      এখানে আমাদের **সিনিয়র শিক্ষকগণ** প্রদর্শিত হচ্ছেন। আমাদের সকল অভিজ্ঞ শিক্ষক মণ্ডলীর বিস্তারিত তথ্য জানতে নিচে ক্লিক করুন অথবা মেনু থেকে 'About' সেকশনে যান।
     </p>


     <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.href = "/about/teacher-information"}
      className="relative z-20 flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all group"
     >
      সকল শিক্ষক মণ্ডলী দেখুন
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
     </motion.button>
    </motion.div>
   </div>

   {/* Teacher Details Modal */}
   <TeacherDetailsModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    teacher={selectedTeacher}
   />
  </section>
 )
}

export default TeachersDataHomePage