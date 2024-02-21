import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";

const secret = new TextEncoder().encode("telomambu");
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const access_token = request.cookies.get("accessToken");

    if (!access_token) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("refreshToken");
      return response;
    }

    try {
      await jwtVerify(access_token.value, secret);
      return NextResponse.next();
    } catch (error) {
      if (error.name === "JWTExpired") {
        const refresh_token = request.cookies.get("refreshToken");
        if (!refresh_token) {
          console.log("FGJHKJ");
          const response = NextResponse.redirect(
            new URL("/login", request.url)
          );
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          response.cookies.delete("detailInfo");
          return response;
        }

        const responseAccessToken = await fetch(
          "http://localhost:3050/auth/refresh-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refresh_token.value }),
          }
        );
        const resJson = await responseAccessToken.json();
        if (resJson.success) {
          const response = NextResponse.next();
          response.cookies.set({
            name: "accessToken",
            value: resJson.accessToken,
            maxAge: 3 * 60,
            httpOnly: true,
          });
          return response;
        }
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const accessToken = request.cookies.get("accessToken");

    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("detailInfo");

    if (accessToken) {
      if (await jwtVerify(accessToken.value, secret)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};
