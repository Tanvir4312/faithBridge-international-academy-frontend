"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IApplicationsData, ApplicationStatus } from "@/types/Dashboard/admin-dashboard-types/applications-management.types"
import { PaymentStatus } from "@/types/Dashboard/shared_Enums/enums"
import { format } from "date-fns"


interface ApplicationDetailModalProps {
    application: IApplicationsData | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApprove?: (application: IApplicationsData) => void;
    onReject?: (application: IApplicationsData) => void;
}

const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
        <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
    </div>
)

const ApplicationDetailModal = ({ application, open, onOpenChange, onApprove, onReject }: ApplicationDetailModalProps) => {
    if (!application) return null;

    const isPending = application.status === ApplicationStatus.PENDING;

    const formattedDob = application.dob
        ? format(new Date(application.dob), "MMMM d, yyyy")
        : "—";

    const formattedCreatedAt = application.createdAt
        ? format(new Date(application.createdAt), "MMMM d, yyyy")
        : "—";

    const handleApproveClick = () => {
        onApprove?.(application);

    };

    const handleRejectClick = () => {
        onReject?.(application);

    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-3">
                        Application Details
                        <Badge
                            className={
                                application.status === ApplicationStatus.APPROVED
                                    ? "bg-green-500 text-white"
                                    : application.status === ApplicationStatus.REJECTED
                                        ? "bg-red-500 text-white"
                                        : "bg-orange-500 text-white"
                            }
                        >
                            {application.status}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                {/* Profile Photo */}
                {application.profileImage && (
                    <div className="flex justify-center py-2">
                        <img
                            src={application.profileImage}
                            alt={application.nameEn}
                            className="w-24 h-24 rounded-full object-cover border-4 border-border shadow"
                        />
                    </div>
                )}

                {/* Personal Information */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <InfoRow label="Name (English)" value={application.nameEn} />
                        <InfoRow label="Name (Bengali)" value={application.nameBn} />
                        <InfoRow label="Date of Birth" value={formattedDob} />
                        <InfoRow label="Gender" value={application.gender} />
                        <InfoRow label="Religion" value={application.religion} />
                        <InfoRow label="Blood Group" value={application.bloodGroup} />
                        <InfoRow label="Birth Certificate No." value={application.birthCertificateNo} />
                    </div>
                </div>

                <Separator />

                {/* Family Information */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Family Information</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <InfoRow label="Father's Name" value={application.fatherName} />
                        <InfoRow label="Mother's Name" value={application.motherName} />
                        <InfoRow label="Guardian Mobile" value={application.guardianMobile} />
                        <InfoRow label="Student Mobile" value={application.studentMobile} />
                    </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Address</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <InfoRow label="Present Address" value={application.presentAddress} />
                        <InfoRow label="Permanent Address" value={application.permanentAddress} />
                    </div>
                </div>

                <Separator />

                {/* Academic Information */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Academic Information</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <InfoRow label="Desired Class" value={application.desiredClass} />
                        <InfoRow label="Admission Year" value={application.admissionYear} />
                        <InfoRow label="Previous School" value={application.previousSchool} />
                    </div>
                </div>

                <Separator />

                {/* Application Details */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Application Details</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <InfoRow label="Application No." value={application.applicationNo} />
                        <InfoRow label="Application Date" value={formattedCreatedAt} />
                        <InfoRow label="Application Type" value={application.type} />
                        <InfoRow label="Email" value={application.user.email} />
                    </div>
                </div>

                <Separator />

                {/* Payment Details */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Payment Details</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <InfoRow label="Application Fee" value={`৳ ${application.applicationFee}`} />
                        {/* Payment Status with colored badge */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Payment Status</span>
                            <Badge
                                className={
                                    application.paymentStatus === PaymentStatus.PAID
                                        ? "bg-green-500 text-white w-fit"
                                        : application.paymentStatus === PaymentStatus.UNPAID
                                            ? "bg-red-500 text-white w-fit"
                                            : application.paymentStatus === PaymentStatus.FAILED
                                                ? "bg-rose-700 text-white w-fit"
                                                : "bg-orange-500 text-white w-fit"
                                }
                            >
                                {application.paymentStatus}
                            </Badge>
                        </div>
                        {application.payment && (
                            <>
                                <InfoRow label="Amount Paid" value={`৳ ${application.payment.amount}`} />
                                <InfoRow label="Payment For" value={application.payment.paymentFor} />
                            </>
                        )}
                    </div>
                </div>

                {/* Signature */}
                {application.signatureImage && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Signature</h3>
                            <img
                                src={application.signatureImage}
                                alt="Signature"
                                className="h-16 object-contain border rounded p-2"
                            />
                        </div>
                    </>
                )}

                {/* Footer Actions */}
                {isPending && (
                    <DialogFooter className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={handleRejectClick}
                        >
                            Reject
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleApproveClick}
                        >
                            Approve
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ApplicationDetailModal
