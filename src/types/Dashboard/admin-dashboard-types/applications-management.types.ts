import { Gender, PaymentStatus } from "../shared_Enums/enums";

export enum ApplicationStatus {
 PENDING = "PENDING",
 APPROVED = "APPROVED",
 REJECTED = "REJECTED"
}



export interface IApplicationsData {
 id: string;
 type: string;
 email: string;
 status: ApplicationStatus;
 paymentStatus: PaymentStatus;
 applicationNo: string;
 applicationFee: number;
 userId: string;
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
 examRoll?: string | null;
 profileImage: string;
 signatureImage?: string | null;
 isDeleted?: boolean;
 createdAt: string;
 user: {
  // id: string;
  // name: string;
  email: string;
  // emailVerified: boolean;
  // image: string | null;
  // role: string;
  // createdAt: string;
  // updatedAt: string;
  // status: string;
  // needPasswordChange: boolean;
  // isDeleted: boolean;
  // deletedAt: string | null;
 }
 payment?: {
  amount: number;
  paymentFor: string;
  status: string;
  transactionId: string;
  stripeEventId: string;
 }

}