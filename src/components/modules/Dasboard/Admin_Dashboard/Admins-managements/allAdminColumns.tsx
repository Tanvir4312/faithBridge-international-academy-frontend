import { IAdminsData } from "@/types/Dashboard/admin-dashboard-types/types";
import { ColumnDef } from "@tanstack/react-table";

export const adminColumns
    : ColumnDef<IAdminsData>[]
    = [
        { id: "name", accessorKey: 'name', header: 'Name' },
        { id: "email", accessorKey: 'email', header: 'Email' },
        {
            id: "contactNumber", accessorKey: 'contactNumber', header: 'Contact Number',
            cell: ({ row }) => {
                return (
                    <span>{row.original.contactNumber || <span className="text-orange-500">N/A</span>}</span>
                )
            }
        },
        {
            id: "createdAt", accessorKey: 'createdAt', header: 'Joined Date',
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
                return (
                    <span className="text-sm capitalize">{date.toLocaleDateString()}</span>
                )
            }
        },
    ]