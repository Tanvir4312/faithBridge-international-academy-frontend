import { Gender, UserStatus } from "../shared_Enums/enums"



export interface ITeacher {
 id: string
 name: string
 email: string
 profilePhoto: string
 contactNumber: string
 gender: Gender
 user: {
  status: UserStatus
 }
}
