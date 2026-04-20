export interface GetAdmissionTimeConfig {
 id: string;
 startDate: string;
 endDate: string;
 isActive: boolean;
 year?: string;

}

export interface CreateAdmissionTimeConfig {
 startDate: string;
 endDate: string;
 isActive: boolean;
 year: string;
}

export interface UpdateAdmissionTimeConfig {
 id?: string;
 startDate?: string;
 endDate?: string;
 isActive?: boolean;
 year?: string;
}

