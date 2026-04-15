

import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/Dashboard/shared_Enums/enums";



interface IStatusBadgeCellProps {
    status: UserStatus;
}

const StatusBadgeCell = ({ status }: IStatusBadgeCellProps) => {
    const badgeClassName =
        status === UserStatus.ACTIVE
            ? "bg-blue-500 text-white"
            : status === UserStatus.INACTIVE
                ? "bg-red-500 text-white"
                : "bg-orange-500 text-white";

    return (
        <Badge className={badgeClassName}>
            <span className="text-xs">{status}</span>
        </Badge>
    )
}

export default StatusBadgeCell
