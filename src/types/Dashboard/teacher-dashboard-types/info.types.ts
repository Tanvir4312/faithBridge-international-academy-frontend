import { Gender, UserStatus } from "../shared_Enums/enums"

export interface TeacherInfoResponse {
 name: string
 email: string
 profilePhoto: string
 designation: string
 user: {
  status: UserStatus
 }
 teacherSubjects: {
  subject: {
   name: string
  }
 }[]
 classTeacher: {
  class: {

   name: string
   notices: {
    notice: {
     id: string
     title: string
     type: string
     details: string
     createdAt: string
     updatedAt: string
    }
   }[]
   students: {
    id: string
    registrationId: string

    applicationId: string
    profileImage: string
    classRoll: string
    nameBn: string
    nameEn: string
    fatherName: string
    motherName: string
    guardianMobile: string
    studentMobile: string
    presentAddress: string
    permanentAddress: string
    bloodGroup: string
    dob: string
    gender: Gender
    religion: string
    birthCertificateNo: string
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    deletedAt: string

   }[]
  }
 }
}
