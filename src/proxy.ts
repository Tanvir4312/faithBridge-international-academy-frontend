import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/authService";


async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    if (!refresh) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}


export async function proxy(request: NextRequest) {

  try {
    const { pathname } = request.nextUrl; // eg /dashboard, /admin/dashboard, /doctor/dashboard
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).data;

    const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routerOwner = getRouteOwner(pathname);

    const unifySuperAdminAndAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

    userRole = unifySuperAdminAndAdminRole;

    const isAuth = isAuthRoute(pathname);


    //proactively refresh token if refresh token exists and access token is expired or about to expire
    if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
      const requestHeaders = new Headers(request.headers);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders

        },
      })


      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }

        return NextResponse.next(
          {
            request: {
              headers: requestHeaders
            },
            headers: response.headers
          }
        )
      } catch (error) {
        console.error("Error refreshing token:", error);

      }

      return response;
    }


    // Rule - 1 : Logged-in users should not access auth pages,
    // except pages that may be mandatory due to account state.
    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== "/verify-email" &&
      pathname !== "/change-password"

    ) {
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      if (redirectParam && redirectParam.startsWith("/")) {
        return NextResponse.redirect(new URL(redirectParam, request.url));
      }
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }
    // Rule-3 User trying to access Public route -> allow
    if (routerOwner === null) {
      return NextResponse.next();
    }

    // Rule - 4 User is Not logged in but trying to access protected route -> redirect to login
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    //Rule - Enforcing user to stay in change password or verify email page if their needPasswordChange or isEmailVerified flags are not satisfied respectively

    if (accessToken) {
      const userInfo = await getUserInfo();

      if (userInfo) {

        // need email verification scenario
        if (userInfo.emailVerified === false) {
          if (pathname !== "/verify-email") {
            const verifyEmailUrl = new URL("/verify-email", request.url);
            verifyEmailUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(verifyEmailUrl);
          }

          return NextResponse.next();
        }
        if (userInfo.emailVerified && pathname.startsWith("/verify-email")) {

          return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        // need password change scenario — enforce /change-password
        if (userInfo.needPasswordChange) {
          if (pathname !== "/change-password") {
            return NextResponse.redirect(new URL("/change-password", request.url));
          }
          return NextResponse.next();
        }

        if (!userInfo.needPasswordChange && pathname === "/reset-password") {
          return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        if (userInfo?.role === "STUDENT") {
          if (pathname === "/dashboard/payment/payment-success") {
            return NextResponse.next();
          }
        }
        if (userInfo?.role === "APPLICANT") {
          if (pathname === "/dashboard/payment/payment-success") {
            return NextResponse.next();
          }
        }
        if (userInfo?.role === "TEACHER") {
          if (pathname === "/dashboard/payment/payment-success") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
          }
        }
        if (userInfo?.role === "ADMIN") {
          if (pathname === "/dashboard/payment/payment-success") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
          }
        }
        if (userInfo?.role === "SUPER_ADMIN") {
          if (pathname === "/dashboard/payment/payment-success") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
          }
        }

        if (userInfo?.role !== "APPLICANT") {
          if (pathname === "/dashboard/create-application") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
          }

        }
        return NextResponse.next();


      }
    }

    // Rule - 5 User trying to access Common protected route -> allow
    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }

    //Rule-6 User trying to visit role based protected but doesn't have required role -> redirect to their default dashboard

    // if (routerOwner === "ADMIN" || routerOwner === "APPLICANT" || routerOwner === "STUDENT" || routerOwner === "TEACHER") {
    //   if (routerOwner !== userRole) {
    //     return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    //   }
    // }

    return NextResponse.next();

  } catch (error) {
    console.error("Error in proxy middleware:", error);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ]
}