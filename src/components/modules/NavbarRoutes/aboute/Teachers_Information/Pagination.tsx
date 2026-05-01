"use client";

import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ChevronDown
} from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  meta: {
    limit: number;
    current_Page: number;
    total_page: number;
    total: number;
  };
}

export default function Pagination({ meta }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { limit, current_Page, total_page, total } = meta;

  const handleUpdateParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    
    // If updating limit, reset to page 1
    if (key === "limit") {
      params.set("page", "1");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const startIndex = total === 0 ? 0 : (current_Page - 1) * limit + 1;
  const endIndex = Math.min(current_Page * limit, total);

  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl mb-20">
      
      {/* Rows Per Page Selector (Left) */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Rows per page:</span>
        <div className="relative group">
          <select
            value={limit}
            onChange={(e) => handleUpdateParam("limit", e.target.value)}
            className="appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 px-4 py-2 pr-10 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" />
        </div>
      </div>

      {/* Result Summary (Middle) */}
      <div className="text-sm font-bold text-slate-500 dark:text-slate-400 italic">
        Showing <span className="text-emerald-600 dark:text-emerald-400">{startIndex}</span> to <span className="text-emerald-600 dark:text-emerald-400">{endIndex}</span> of <span className="text-slate-900 dark:text-white font-black">{total}</span> results
      </div>

      {/* Navigation Controls (Right) */}
      <div className="flex items-center gap-4">
        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
          Page <span className="text-slate-900 dark:text-white">{current_Page}</span> of <span className="text-slate-900 dark:text-white">{total_page}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* First Page */}
          <button
            disabled={current_Page === 1}
            onClick={() => handleUpdateParam("page", 1)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-700 transition-all"
            title="First Page"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>

          {/* Previous Page */}
          <button
            disabled={current_Page === 1}
            onClick={() => handleUpdateParam("page", current_Page - 1)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-700 transition-all"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Page */}
          <button
            disabled={current_Page === total_page}
            onClick={() => handleUpdateParam("page", current_Page + 1)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-700 transition-all"
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Last Page */}
          <button
            disabled={current_Page === total_page}
            onClick={() => handleUpdateParam("page", total_page)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-700 transition-all"
            title="Last Page"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
