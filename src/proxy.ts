import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { getNewTokensWithRefreshToken } from "./services/authService";
import { isTokenExpiringSoon } from "./lib/tokenUtils";


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
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;

    const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken =
      accessToken && jwtUtils.decodedToken(accessToken);

    const isValidedAccessToken = !!decodedAccessToken;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {

      userRole = decodedAccessToken.role as UserRole;
    }

    const routerOwner = getRouteOwner(pathname);

    const unifySuperAdminAndAdminRole =
      userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

    userRole = unifySuperAdminAndAdminRole;

    const isAuth = isAuthRoute(pathname);


    //proactively refresh token if refresh token exists and access token is expired or about to expire
    if (isValidedAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
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



    //user is logged in (has access token) and tries to access auth route (e.g., login, register) -> redirect to dashboard
    if (isAuth && isValidedAccessToken) {

      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    //user trying acces a public route -> allow
    if (routerOwner === null) {
      return NextResponse.next();
    }

    //user is not logged in and trying to access a protected route -> redirect to login
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    //user trying to access coomon protected route -> allow
    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }

    //user trying to access a route that belongs to another role -> redirect to their dashboard

    if (userRole === "ADMIN" || userRole === "APPLICANT" || userRole === "TEACHER" || userRole === "STUDENT") {
      if (routerOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};