export enum UserStatus {
 ACTIVE = "ACTIVE",
 INACTIVE = "INACTIVE",
 SUSPENDED = "SUSPENDED"
}



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

