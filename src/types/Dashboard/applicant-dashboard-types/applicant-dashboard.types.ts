import { ApplicationStatus } from "../admin-dashboard-types/applications-management.types";
import { Gender, PaymentStatus, UserStatus } from "../shared_Enums/enums";

export interface IApplicantPaymentInfo {

 paymentFor: string;
 amount: number;
 status: string;
 transactionId: string;
 createdAt: string;
 updatedAt: string;
 application: {
  nameEn: string;
  fatherName: string;
  desiredClass: string;
  applicationNo: string;
 }
}

export interface IMyApplicationInfo {
 id: string;
 type: string;
 status: ApplicationStatus;
 paymentStatus: string;
 applicationNo: string;
 nameBn: string;
 nameEn: string;
 fatherName: string;
 motherName: string;
 guardianMobile: string;
 studentMobile: string;
 dob: string;
 gender: Gender;
 religion: string;
 bloodGroup: string;
 birthCertificateNo: string;
 presentAddress: string;
 permanentAddress: string;
 previousSchool: string;
 desiredClass: string;
 admissionYear: string;
 examRoll: string | null;
 profileImage: string;
 signatureImage: string | null;
 isDeleted: boolean;
 createdAt: string;
 deletedAt: string | null;
 user: {
  email: string;
  status: UserStatus;
 }
 payment: {
  amount: number;
  paymentFor: string;
  status: PaymentStatus;
  transactionId: string;
 }
}

