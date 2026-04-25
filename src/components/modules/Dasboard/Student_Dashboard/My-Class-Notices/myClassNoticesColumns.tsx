import { IGetSingleNoticeData } from "@/types/Dashboard/Common-types/getNotice.types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowDown, Eye } from "lucide-react"

export const myClassNoticesColumns: ColumnDef<IGetSingleNoticeData>[] = [
 {
  accessorKey: "title",
  header: "Title",
  enableSorting: false
 },

 {
  accessorKey: "createdAt",
  header: "Created At",
  enableSorting: false,
  cell: ({ row }) => {
   const date = format(new Date(row.original?.createdAt), "MMM dd, yyyy");
   return (
    <div className="text-sm capitalize">{date}</div>
   )
  }
 },

]