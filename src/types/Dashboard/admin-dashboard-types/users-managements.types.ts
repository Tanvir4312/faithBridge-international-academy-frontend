
import { UserRole } from "@/lib/authUtils";
import { UserStatus } from "../shared_Enums/enums";

export type IUsersManagements = {
 id: string;
 name: string;
 email: string;
 role: UserRole;
 status: UserStatus;
 emailVerified: boolean;
 needPasswordChange: boolean;
 createdAt: Date;
 updatedAt: Date;
 isDeleted: boolean;
 deletedAt: Date;
}