import { GetAdmissionTimeConfig } from "@/types/Dashboard/admin-dashboard-types/admission-time-config.types";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const admissionConfigColumns: ColumnDef<GetAdmissionTimeConfig>[] = [
 {
  accessorKey: "year",
  header: "Academic Year",
  enableSorting: false,
  cell: ({ row }) => <span className="font-semibold">{row.original?.year || "N/A"}</span>
 },
 {
  accessorKey: "startDate",
  header: "Start Date",
  enableSorting: false,
  cell: ({ row }) => format(new Date(row.original?.startDate), "MMMM d, yyyy"),
 },
 {
  accessorKey: "endDate",
  header: "End Date",
  enableSorting: false,
  cell: ({ row }) => format(new Date(row.original?.endDate), "MMMM d, yyyy"),
 },
 {
  accessorKey: "isActive",
  header: "Status",
  enableSorting: false,
  cell: ({ row }) => {
   const isActive = row.original?.isActive;
   return (
    <Badge variant={isActive ? "default" : "outline"} className={isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-300 hover:bg-red-600"}>
     {isActive ? "Active" : "Inactive"}
    </Badge>
   );
  },
 },
];
