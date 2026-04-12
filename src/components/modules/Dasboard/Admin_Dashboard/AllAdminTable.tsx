"use client"
import { getAllAdmin } from '@/services/admin-srever-action/allAdmin.service';
import { IAllAdminsData } from '@/types/Dashboard/admin-dashboard-types/types';
import { ApiSuccessResponse } from '@/types/api.types';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AllAdminTable = () => {
    const adminColumns = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'contactNumber', header: 'Contact Number' },
    ]

    const { data: adminsResponse } = useQuery({
        queryKey: ["all-admins"],
        queryFn: getAllAdmin,
        refetchOnWindowFocus: "always" // Refetch data when the window regains focus
    })

    const { data: admins = [] } = adminsResponse || {}

    // const admins = adminsResponse?.data as IAllAdminsData[] || [];

    const { getHeaderGroups, getRowModel } = useReactTable({ data: admins, columns: adminColumns, getCoreRowModel: getCoreRowModel() })


    return (
        <Table>
            <TableHeader>
                {getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                        {hg.headers.map((header) => (
                            <TableHead key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AllAdminTable;