

import { Badge } from "@/components/ui/badge";
import { FromFillupStatus } from "@/types/Dashboard/shared_Enums/enums";


interface IFromFillupStatusBadgeCellProps {
 status: FromFillupStatus;
}

const FromFillupStatusBadgeCell = ({ status }: IFromFillupStatusBadgeCellProps) => {
 const badgeClassName =
  status === FromFillupStatus.APPROVED
   ? "bg-blue-500 text-white"
   : status === FromFillupStatus.REJECTED
    ? "bg-red-700 text-white"
    : "bg-orange-400 text-white";

 return (
  <Badge className={badgeClassName}>
   <span className="text-xs">{status}</span>
  </Badge>
 )
}

export default FromFillupStatusBadgeCell
