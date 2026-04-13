
export interface PieChartData {
    count: number;
    status: string;
}

export interface BarChartData {
    month: Date;
    count: number;
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}

export interface IAdminDashboardStats {
    applicantCount: number;
    studentCount: number;
    teacherCount: number;
    superAdminCount: number;
    adminCount: number;
    paymentCount: number;
    userCount: number;
    totalRevenue: number;
    pieChartData: PieChartData[];
    barChartData: BarChartData[];
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


