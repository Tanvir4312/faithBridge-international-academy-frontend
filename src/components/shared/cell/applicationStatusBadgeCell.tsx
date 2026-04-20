

import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/types/Dashboard/admin-dashboard-types/applications-management.types";


interface IApplicationStatusBadgeCellProps {
   status: ApplicationStatus;
}

const ApplicationStatusBadgeCell = ({ status }: IApplicationStatusBadgeCellProps) => {
   const badgeClassName =
      status === ApplicationStatus.APPROVED
         ? "bg-blue-500 text-white"
         : status === ApplicationStatus.REJECTED
            ? "bg-red-700 text-white"
            : "bg-orange-400 text-white";

   return (
      <Badge className={badgeClassName}>
         <span className="text-xs">{status}</span>
      </Badge>
   )
}

export default ApplicationStatusBadgeCell
