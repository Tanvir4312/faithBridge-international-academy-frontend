import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { ISubject } from "@/types/Dashboard/admin-dashboard-types/subject-managements.types";

export const subjectsColumns: ColumnDef<ISubject>[] = [

 {
  id: "name",
  accessorKey: "name",
  header: "Name",
  enableSorting: false,

 },

 {
  id: "teacherName",
  header: "Teacher Name",
  enableSorting: false,
  cell: ({ row }) => {
   const teachers = row.original?.teacherSubjects;
   if (!teachers || teachers?.length === 0) return <span>-</span>;

   return (
    <div className="flex flex-col gap-3 py-1">
     {teachers.map((t, idx) => (
      <span key={idx} className="border-b last:border-0 pb-1 last:pb-0 border-border/50">
       {t?.teacher?.name || "-"}
      </span>
     ))}
    </div>
   );
  }
 },
 {
  id: "contactNumber",
  header: "Contact Number",
  enableSorting: false,
  cell: ({ row }) => {
   const teachers = row.original?.teacherSubjects;
   if (!teachers || teachers?.length === 0) return <span>-</span>;

   return (
    <div className="flex flex-col gap-3 py-1">
     {teachers?.map((t, idx) => (
      <span key={idx} className="border-b last:border-0 pb-1 last:pb-0 border-border/50">
       {t?.teacher?.contactNumber || "-"}
      </span>
     ))}
    </div>
   );
  }
 },





]