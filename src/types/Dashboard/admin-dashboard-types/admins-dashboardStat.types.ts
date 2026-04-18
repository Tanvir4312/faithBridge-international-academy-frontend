
export interface PieChartData {
 count: number;
 status: string;
}

export interface BarChartData {
 month: Date;
 count: number;
}

export interface ApplicantStats {
  paidApplicantCount: number;
  unpaidApplicantCount: number;
  approvedApplicantCount: number;
  pendingApplicantCount: number;
  rejectedApplicantCount: number;
}

export interface PaymentStats {
  successPaymentCount: number;
  unpaidPaymentCount: number;
}

export interface UserStats {
  activeAdminCount: number;
  inactiveAdminCount: number;
  activeTeacherCount: number;
  inactiveTeacherCount: number;
  activeUserCount: number;
  inactiveUserCount: number;
  suspendedUserCount: number;
}

export interface IAdminDashboardStats {
  applicantStats: ApplicantStats;
  paymentStats: PaymentStats;
  userStats: UserStats;
  totalRevenue: number;
  pieChartData: PieChartData[];
  barChartData: BarChartData[];
}