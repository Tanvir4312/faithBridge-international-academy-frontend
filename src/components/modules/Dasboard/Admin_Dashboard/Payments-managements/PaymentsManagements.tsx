"use client"

import { useState } from "react"
import DataTable from "@/components/shared/table/DataTable"
import { getAllPayments } from "@/services/admin-srever-action/payments-managements.service"
import { useQuery } from "@tanstack/react-query"
import { paymentsColumns } from "./paymentsColumns"
import { IPayment } from "@/types/Dashboard/admin-dashboard-types/payment-managements.types"
import PaymentDetailsModal from "./PaymentDetailsModal"

const PaymentsManagements = () => {
    const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const { data: payments, isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: getAllPayments,
        refetchOnWindowFocus: true
    })

    const handleView = (paymentData: IPayment) => {
        setSelectedPayment(paymentData)
        setIsViewModalOpen(true)
    }

    return (
        <div className="space-y-4">
            <DataTable
                data={payments?.data || []}
                columns={paymentsColumns}
                emptyMessage="No payments found"
                isLoading={isLoading}
                actions={{
                    onView: handleView
                }}
            />

            <PaymentDetailsModal 
                payment={selectedPayment}
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />
        </div>
    )
}

export default PaymentsManagements