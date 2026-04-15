


// import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";
// import { IAcademicLevel } from "@/types/Dashboard/admin-dashboard-types/academicLevel-managements.types";

// export const academicLevelColumns
//  : ColumnDef<IAcademicLevel>[]
//  = [
//   {
//    id: "name",
//    accessorKey: 'name',
//    header: 'Name',
//    enableSorting: false,

//   },

//   {
//    id: "image",
//    accessorKey: 'image',
//    header: 'Image',
//    enableSorting: false,
//    cell: ({ row }) => {
//     return (
//      <img src={row.original.image} alt={row.original.name} className="w-10 h-10 rounded-full" />
//     )
//    }
//   },

//   {
//    id: "createdAt",
//    accessorKey: 'createdAt',
//    header: 'Joined Date',
//    enableSorting: false,
//    cell: ({ row }) => {
//     const date = format(new Date(row.original.createdAt), "MMM dd, yyyy");
//     return (
//      <span className="text-sm capitalize">{date}</span>
//     )
//    }
//   },

//  ]