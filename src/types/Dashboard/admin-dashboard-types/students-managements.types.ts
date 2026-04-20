import { Gender, UserStatus } from "../shared_Enums/enums"

export interface IStudent {
 id: string
 registrationId: string
 nameEn: string
 nameBn: string
 profileImage: string
 classRoll: string
 gender: Gender
 dob: string
 bloodGroup: string
 religion: string
 nationality: string
 fatherName: string
 motherName: string
 guardianName: string
 guardianMobile: string
 studentMobile: string
 permanentAddress: string
 presentAddress: string
 birthCertificateNo: string
 applicationId: string
 createdAt: string
 user: {
  email: string
  status: UserStatus
  role: string
 }
 class: {
  name: string,
  academicLevel: {
   name: string
  }
 }
}

