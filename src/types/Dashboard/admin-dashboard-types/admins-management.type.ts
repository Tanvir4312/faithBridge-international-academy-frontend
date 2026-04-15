import { UserStatus } from "../shared_Enums/enums";



export interface IAdminsData {
 id: string;
 name: string;
 email: string;
 profilePhoto?: string | undefined
 contactNumber?: string | undefined;
 createdAt: Date;
 user: {
  status: UserStatus;
 }
}

