import { Gender, UserStatus } from "../shared_Enums/enums"

export interface IStudent {
 registrationId: string
 nameEn: string
 profileImage: string
 classRoll: string
 gender: Gender
 user: {
  email: string
  status: UserStatus
 }
 class: {
  name: string
 }
}