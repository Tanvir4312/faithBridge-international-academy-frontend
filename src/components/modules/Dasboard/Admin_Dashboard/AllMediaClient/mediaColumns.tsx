import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"


export const mediaColumns: ColumnDef<AllMediaResponse>[] = [
 {
  accessorKey: "url",
  header: "Image",
  enableSorting: false,
  cell: ({ row }) => (
   <img src={row.original.url} alt={row.original.description} className="w-20 h-20 object-cover" />
  )
 },

 {
  accessorKey: "sectionName",
  header: "Section",
  enableSorting: false,
 },
 {
  accessorKey: "createdAt",
  header: "Created At",
  enableSorting: false,
  cell: ({ row }) => (
   <p>{format(new Date(row.original.createdAt), "yyyy-MM-dd")}</p>
  )
 }
]