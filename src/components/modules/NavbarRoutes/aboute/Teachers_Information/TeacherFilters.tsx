"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";

interface TeacherFiltersProps {
  subjects: any[];
  classes: any[];
}

export default function TeacherFilters({ subjects, classes }: TeacherFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [designation, setDesignation] = useState(searchParams.get("designation") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [className, setClassName] = useState(searchParams.get("class") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdat");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleFilterChange("searchTerm", searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 on filter change
    if (key !== "page") params.set("page", "1");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGender("");
    setDesignation("");
    setSubject("");
    setClassName("");
    router.push(pathname);
  };

  const designations = [
    "Principal",
    "Senior Teacher",
    "Assistant Teacher",
    "Junior Teacher",
    "Lecturer",
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search teachers by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gender Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Gender</label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => { setGender(e.target.value); handleFilterChange("gender", e.target.value); }}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="">All Genders</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Designation Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Designation</label>
          <div className="relative">
            <select
              value={designation}
              onChange={(e) => { setDesignation(e.target.value); handleFilterChange("designation", e.target.value); }}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="">All Designations</option>
              {designations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Subject</label>
          <div className="relative">
            <select
              value={subject}
              onChange={(e) => { setSubject(e.target.value); handleFilterChange("subject", e.target.value); }}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="">All Subjects</option>
              {subjects?.map((s: any) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Class Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Class</label>
          <div className="relative">
            <select
              value={className}
              onChange={(e) => { setClassName(e.target.value); handleFilterChange("class", e.target.value); }}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="">All Classes</option>
              {classes?.map((c: any) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); handleFilterChange("sortBy", e.target.value); }}
              className="bg-transparent text-sm font-bold text-emerald-600 dark:text-emerald-400 outline-none cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="createdat">Join Date</option>
            </select>
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
            <span className="text-[10px] font-black text-slate-400 uppercase">Order:</span>
            <select
              value={sortOrder}
              onChange={(e) => { setSortOrder(e.target.value); handleFilterChange("sortOrder", e.target.value); }}
              className="bg-transparent text-sm font-bold text-emerald-600 dark:text-emerald-400 outline-none cursor-pointer"
            >
              <option value="asc">A-Z / Oldest</option>
              <option value="desc">Z-A / Newest</option>
            </select>
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
        >
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
