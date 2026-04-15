

import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/Dashboard/shared_Enums/enums";



interface IPaymentStatusBadgeCellProps {
   status: PaymentStatus;
}

const PaymentStatusBadgeCell = ({ status }: IPaymentStatusBadgeCellProps) => {
   const badgeClassName =
      status === PaymentStatus.PAID
         ? "bg-blue-500 text-white"
         : status === PaymentStatus.UNPAID
            ? "bg-red-500 text-white"
            : "bg-orange-500 text-white";

   return (
      <Badge className={badgeClassName}>
         <span className="text-xs">{status}</span>
      </Badge>
   )
}

export default PaymentStatusBadgeCell
