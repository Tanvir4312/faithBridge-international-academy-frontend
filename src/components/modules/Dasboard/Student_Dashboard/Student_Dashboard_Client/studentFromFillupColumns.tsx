import StatusBadgeCell from "@/components/shared/cell/statusBadgeCell";
import UserInfoCell from "@/components/shared/cell/userInfoCell";


import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IGetFromFillupByStudentId } from "@/types/Dashboard/student-dashboard-types/get-fromFillup.types";

import FromFillupStatusBadgeCell from "@/components/shared/cell/fromFillupStatusBadgeCell";
import { FromFillupStatus } from "@/types/Dashboard/shared_Enums/enums";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const studentFromFillupColumns
    : ColumnDef<IGetFromFillupByStudentId>[]
    = [
        {
            id: "student.nameEn",
            accessorKey: 'student.nameEn',
            header: 'Name',
            enableSorting: false,
            cell: ({ row }) => {

                return (
                    <UserInfoCell
                        name={row.original.student.nameEn}
                        profilePhoto={row.original.student.profileImage || undefined}
                    />
                )
            }
        },

        {
            id: "registrationNo",
            accessorKey: 'registrationNo',
            header: 'Registration No',
            enableSorting: false,

        },
        {
            id: "class.name",
            accessorKey: 'class.name',
            header: 'Class',
            enableSorting: false,

        },
        {
            id: "classRoll",
            accessorKey: 'classRoll',
            header: 'Class Roll',
            enableSorting: false,

        },
        {
            id: "exam.name",
            accessorKey: 'exam.name',
            header: 'Exam',
            enableSorting: false,

        },
        {
            id: "exam.year",
            accessorKey: 'exam.year',
            header: 'Year',
            enableSorting: false,

        },
        {
            id: "status",
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <FromFillupStatusBadgeCell status={row.original.status} />
                )
            }
        },
        {
            id: "admitCard",
            header: 'Admit Card',
            cell: ({ row }) => {
                const status = row.original.status;
                const admitCardUrl = row.original.admitCard;

                if (status === FromFillupStatus.APPROVED && admitCardUrl) {
                    return (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 border-blue-500 hover:bg-blue-50"
                            onClick={() => window.open(admitCardUrl, '_blank')}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" /> View Admit Card
                        </Button>
                    )
                }
                return <span className="text-gray-400">N/A</span>
            }
        },
    ]