import { FromFillupStatus } from "../shared_Enums/enums"

export interface IGetFromFillupByStudentId {
 id: string
 registrationNo: string
 classRoll: string
 status: FromFillupStatus
 admitCard: string
 student: {
  nameEn: string
  profileImage: string
  class: {
   name: string
  }
 }
 exam: {
  name: string
  year: string
 }
}