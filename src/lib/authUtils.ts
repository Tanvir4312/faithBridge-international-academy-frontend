

export type UserRole =
  | "ADMIN"
  | "STUDENT"
  | "TEACHER"
  | "APPLICANT"
  | "SUPER_ADMIN";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((router: string) => router === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const studentProtectedRoute: RouteConfig = {
  pattern: [/^\/student\/dashboard/],
  exact: ["/payment/success"],
};

export const teacherProtectedRoute: RouteConfig = {
  pattern: [/^\/teacher\/dashboard/],
  exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin\/dashboard/], // Matches any path that starts with /admin/dashboard
  exact: [],
};

export const applicantProtectedRoute: RouteConfig = {
  pattern: [/^\/dashboard/],
  exact: ["/payment/success"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string,
):
  | "ADMIN"
  | "STUDENT"
  | "TEACHER"
  | "APPLICANT"
  | "SUPER_ADMIN"
  | "COMMON"
  | null => {
  if (isRouteMatches(pathname, teacherProtectedRoute)) {
    return "TEACHER";
  }

  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatches(pathname, applicantProtectedRoute)) {
    return "APPLICANT";
  }
  if (isRouteMatches(pathname, studentProtectedRoute)) {
    return "STUDENT";
  }

  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null; // public route
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "TEACHER") {
    return "/teacher/dashboard";
  }
  if (role === "STUDENT") {
    return "/student/dashboard";
  }
  if (role === "APPLICANT") {
    return "/dashboard";
  }

  return "/";
};

// export const isValidRedirectForRole = (redirectPath : string, role : UserRole) => {
//     const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

//     role = unifySuperAdminAndAdminRole;

//     const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
//     const routeOwner = getRouteOwner(sanitizedRedirectPath);

//     if(routeOwner === null || routeOwner === "COMMON"){
//         return true;
//     }

//     if(routeOwner === role){
//         return true;
//     }

//     return false;
// }

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
  const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

  role = unifySuperAdminAndAdminRole;

  const ownerPath = getRouteOwner(redirectPath);

  if (ownerPath === null || ownerPath === "COMMON") {
    return true;
  }

  if (ownerPath === role) {
    return true;
  }

  return false;
}
