import { FromFillupStatus, PaymentStatus } from "../shared_Enums/enums";

export interface IFromFillupData {
 id: string;
 registrationNo: string;
 classRoll: string;
 status: FromFillupStatus;
 paymentStatus: PaymentStatus;
 createdAt: string;
 updatedAt: string;
 admitCard?: string;
 exam: {
  name: string
  year: string
 }
 class: {
  name: string
 }
 student: {
  id: string;
  nameEn: string;
  nameBn?: string;
  profileImage?: string;
  registrationId: string;
  studentMobile?: string | null;
  guardianMobile?: string;
  gender?: string;
  bloodGroup?: string;
  religion?: string;
  dob?: string;
  presentAddress?: string;
  permanentAddress?: string;
  fatherName?: string;
  motherName?: string;
  birthCertificateNo?: string;
  applicationId?: string;
 }
}