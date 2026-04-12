
export interface PieChartData {
    count: number;
    status: string;
}

export interface BarChartData {
    month: Date;
    count: number;
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

