import StatusBadgeCell from "@/components/shared/cell/statusBadgeCell";
import UserInfoCell from "@/components/shared/cell/userInfoCell";
import { IAdminsData } from "@/types/Dashboard/admin-dashboard-types/admins-management.type";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const adminColumns
    : ColumnDef<IAdminsData>[]
    = [
        {
            id: "name",
            accessorKey: 'name',
            header: 'Name',
            enableSorting: false,
            cell: ({ row }) => {

                return (
                    <UserInfoCell
                        name={row.original.name}
                        email={row.original.email}
                        profilePhoto={row.original.profilePhoto || undefined}
                    />
                )
            }
        },
        {
            id: "email",
            accessorKey: 'email',
            header: 'Email',
            enableSorting: false,
        },
        {
            id: "contactNumber",
            accessorKey: 'contactNumber',
            header: 'Contact Number',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <span>{row.original.contactNumber || <span className="text-orange-500">N/A</span>}</span>
                )
            }
        },
        {
            id: "createdAt",
            accessorKey: 'createdAt',
            header: 'Joined Date',
            enableSorting: true,
            cell: ({ row }) => {
                const date = format(new Date(row.original.createdAt), "MMM dd, yyyy");
                return (
                    <span className="text-sm capitalize">{date}</span>
                )
            }
        },
        {
            id: "status",
            accessorKey: 'user.status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <StatusBadgeCell status={row.original.user.status} />
                )
            }
        },
    ]