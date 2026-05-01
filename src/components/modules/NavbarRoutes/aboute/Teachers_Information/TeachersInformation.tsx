"use client";

import { getAllTeacher, getAllTeacherQuery } from "@/services/admin-srever-action/teachers-managements.service";
import { useQuery } from "@tanstack/react-query";
import TeacherInfoDetails from "./TeacherInfo_Details/TeacherInfoDetails";
import TeacherFilters from "./TeacherFilters";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { getAllSubject } from "@/services/admin-srever-action/subject-managements.service";
import { getAllClass } from "@/services/admin-srever-action/class-managements.service";
import { SearchX } from "lucide-react";

const TeachersInformation = () => {
 const searchParams = useSearchParams();

 // Extract all params for the query
 const query = Object.fromEntries(searchParams.entries());

 // Fetch Teachers
 const { data: teachersResponse, isLoading, isError } = useQuery({
  queryKey: ["teachers", query],
  queryFn: () => getAllTeacherQuery(query),
  refetchOnMount: true,
  refetchOnWindowFocus: true,
 });

 // Fetch Subjects for Filters
 const { data: subjectsResponse } = useQuery({
  queryKey: ["subjects"],
  queryFn: getAllSubject,
 });

 // Fetch Classes for Filters
 const { data: classesResponse } = useQuery({
  queryKey: ["classes"],
  queryFn: getAllClass,
 });

 const teachersRawData = teachersResponse?.data;
 const teachers = (teachersRawData as any)?.data || [];
 const meta = (teachersRawData as any)?.meta || { limit: 5, current_Page: 1, total_page: 0, total: 0 };
 const subjects = subjectsResponse?.data || [];
 const classes = classesResponse?.data || [];

 return (
  <div className="py-12 px-4 sm:px-6">
   {/* Title Section */}
   <div className="mb-12">
    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
     Explore Our <span className="text-emerald-600">Faculty</span>
    </h1>
    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
     Meet the dedicated educators of FaithBridge International Academy. Use the filters below to find teachers by subject, designation, or class.
    </p>
   </div>

   {/* Filters Section */}
   <TeacherFilters subjects={subjects} classes={classes} />

   {/* Loading / Error / Empty States */}
   {isLoading ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
     {[...Array(4)].map((_, i) => (
      <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
     ))}
    </div>
   ) : isError ? (
    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
     <p className="text-red-500 font-bold">Failed to load teachers. Please try again later.</p>
    </div>
   ) : teachers?.length > 0 ? (
    <>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {teachers.map((teacher: any) => (
       <TeacherInfoDetails key={teacher.id} teacher={teacher} />
      ))}
     </div>

     {/* Pagination */}
     <Pagination meta={meta} />
    </>
   ) : (
    <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col items-center">
     <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
      <SearchX className="w-12 h-12 text-slate-300" />
     </div>
     <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">No Teachers Found</h3>
     <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters to find what you&apos;re looking for.</p>
    </div>
   )}
  </div>
 );
};

export default TeachersInformation;