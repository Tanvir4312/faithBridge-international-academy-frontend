"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, Trash2, Users, LayoutGrid, List, ChevronDown, Calendar, Filter, Plus, X } from "lucide-react"

import { getAllTeacherQuery } from "@/services/admin-srever-action/teachers-managements.service"
import { getAllSubject } from "@/services/admin-srever-action/subject-managements.service"
import { getAllClass } from "@/services/admin-srever-action/class-managements.service"
import { ITeacher } from "@/types/Dashboard/admin-dashboard-types/teachers-managements.types"
import DataTable from "@/components/shared/table/DataTable"
import { teacherColumns } from "./teacherColumns"
import TeacherDetailsModal from "../../../../shared/teacherModals/TeacherDetailsModal"
import UpdateTeacherModal from "@/components/shared/teacherModals/UpdateTeacherModal"
import DeleteTeacherModal from "@/components/modules/Dasboard/Admin_Dashboard/Teachers-managements/DeleteTeacherModal"
import CreateTeacherModal from "@/components/modules/Dasboard/Admin_Dashboard/Teachers-managements/CreateTeacherModal"
import PaginationControls from "@/components/shared/pagination_controll/PaginationControll"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const DESIGNATION_OPTIONS = ["Principal", "Senior Teacher", "Assistant Teacher", "Junior Teacher", "Lecturer"]

function TeachersManagements() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(true)

  // Local Search State for Debouncing
  const [localSearchTerm, setLocalSearchTerm] = useState(query.searchTerm || "")

  // Sync local search term with URL on initial load or back/forward navigation
  useEffect(() => {
    setLocalSearchTerm(query.searchTerm || "")
  }, [query.searchTerm])

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localSearchTerm !== (query.searchTerm || "")) {
        updateQueryParams({ searchTerm: localSearchTerm || null })
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [localSearchTerm])

  // Fetch Teachers
  const { data: teachersResponse, isLoading, refetch } = useQuery({
    queryKey: ["teachers", query],
    queryFn: () => getAllTeacherQuery(query),
    refetchOnWindowFocus: true
  })

  // Fetch Subjects for Filters
  const { data: subjectsResponse } = useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubject,
  })

  // Fetch Classes for Filters
  const { data: classesResponse } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClass,
  })

  const teachersRawData = teachersResponse?.data
  const teachers = (teachersRawData as any)?.data || []
  const meta = (teachersRawData as any)?.meta || { limit: 10, current_Page: 1, total_page: 0, total: 0 }
  const subjects = subjectsResponse?.data || []
  const classes = classesResponse?.data || []

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    if (updates.page === undefined) {
      params.set("page", "1")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const handleView = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsViewModalOpen(true)
  }

  const handleEdit = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsEditModalOpen(true)
  }

  const handleDelete = (teacher: ITeacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteModalOpen(true)
  }

  const activeFiltersCount = Object.keys(query).filter(k => k !== "page" && k !== "limit" && k !== "sortBy" && k !== "sortOrder").length
  console.log(teachers)
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-500" />
            Teacher Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">Monitor and manage school faculty members</p>
        </div>
        <CreateTeacherModal onSuccess={() => refetch()} />
      </div>

      {/* Advanced Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-12 pr-10 h-11 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-emerald-500 transition-all"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            {localSearchTerm && (
              <button
                onClick={() => setLocalSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 px-6 rounded-2xl gap-2 font-bold transition-all ${showFilters ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-slate-200 dark:border-slate-800"}`}
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-white text-emerald-600 border-none">{activeFiltersCount}</Badge>
              )}
            </Button>

            <Select value={query.sortBy || "name"} onValueChange={(val) => updateQueryParams({ sortBy: val })}>
              <SelectTrigger className="h-11 w-[180px] rounded-2xl border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="createdat">Join Date (Newest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200">
            {/* Gender Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Gender</label>
              <Select value={query.gender || "all"} onValueChange={(val) => updateQueryParams({ gender: val === "all" ? null : val })}>
                <SelectTrigger className="h-10 rounded-xl bg-slate-50/30 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Designation Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Designation</label>
              <Select value={query.designation || "all"} onValueChange={(val) => updateQueryParams({ designation: val === "all" ? null : val })}>
                <SelectTrigger className="h-10 rounded-xl bg-slate-50/30 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800">
                  <SelectValue placeholder="All Designations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Designations</SelectItem>
                  {DESIGNATION_OPTIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Subject</label>
              <Select value={query.subject || "all"} onValueChange={(val) => updateQueryParams({ subject: val === "all" ? null : val })}>
                <SelectTrigger className="h-10 rounded-xl bg-slate-50/30 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((s: any) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Class Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Class</label>
              <Select value={query.class || "all"} onValueChange={(val) => updateQueryParams({ class: val === "all" ? null : val })}>
                <SelectTrigger className="h-10 rounded-xl bg-slate-50/30 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((c: any) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {activeFiltersCount > 0 && (
          <div className="flex justify-end pt-2">
            <Button variant="ghost" onClick={clearFilters} className="text-[10px] font-black text-rose-500 gap-1 h-7 rounded-full uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Teacher Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <DataTable
          data={teachers}
          columns={teacherColumns}
          emptyMessage="No matching teachers found"
          isLoading={isLoading}
          actions={{
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete
          }}
        />

        {/* Pagination Integration */}
        {!isLoading && teachers.length > 0 && (
          <div className="border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
            <PaginationControls
              meta={{
                limit: meta.limit,
                current_page: meta.current_Page,
                total_page: meta.total_page,
                total: meta.total
              }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <TeacherDetailsModal
        teacher={selectedTeacher}
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      <UpdateTeacherModal
        teacher={selectedTeacher}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />

      <DeleteTeacherModal
        teacher={selectedTeacher}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </div>
  )
}

export default TeachersManagements