import ApplicationStatusBadgeCell from "@/components/shared/cell/applicationStatusBadgeCell";
import PaymentStatusBadgeCell from "@/components/shared/cell/paymentStatusBadgeCell";

import UserInfoCell from "@/components/shared/cell/userInfoCell";
import { IApplicationsData } from "@/types/Dashboard/admin-dashboard-types/applications-management.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const applicationColumns
 : ColumnDef<IApplicationsData>[] = [
  {
   id: "nameEn",
   accessorKey: "nameEn",
   header: "Name(EN)",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <UserInfoCell
      name={row.original?.nameEn}
      email={row.original?.user?.email}
      profilePhoto={row.original?.profileImage}
     />
    )
   }
  },

  {
   id: "applicationNo",
   accessorKey: "applicationNo",
   header: "Application No",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <span>{row.original?.applicationNo}</span>
    )
   }
  },
  {
   id: "desiredClass",
   accessorKey: "desiredClass",
   header: "Desired Class",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <span>{row.original?.desiredClass}</span>
    )
   }
  },
  {
   id: "applicationFee",
   accessorKey: "applicationFee",
   header: "Application Fee",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <span>{row.original?.applicationFee}</span>
    )
   }
  },
  {
   id: "paymentStatus",
   accessorKey: "paymentStatus",
   header: "Payment Status",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <PaymentStatusBadgeCell status={row.original?.paymentStatus} />
    )
   }
  },
  {
   id: "status",
   accessorKey: "status",
   header: "Status",
   enableSorting: false,
   cell: ({ row }) => {
    return (
     <ApplicationStatusBadgeCell status={row.original?.status} />
    )
   }
  },
  {
   id: "createdAt",
   accessorKey: 'createdAt',
   header: 'Application Date',
   enableSorting: true,
   cell: ({ row }) => {
    const date = format(new Date(row.original?.createdAt), "MMM dd, yyyy");
    return (
     <span className="text-sm capitalize">{date}</span>
    )
   }
  },

 ]