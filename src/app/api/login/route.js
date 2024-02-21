import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await axios.post("http://localhost:3050/auth/login", body);

    cookies().set("accessToken", response.data.accessToken, {
      httpOnly: true,
      maxAge: 2 * 60 * 60,
    });
    cookies().set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    cookies().set("detailInfo", JSON.stringify({name: response.data.name, email: response.data.email, role: response.data.role, id: response.data.id}));
    
    delete response.data.accessToken;
    delete response.data.refreshToken;

    return NextResponse.json({...response.data, status: response.status, message: "Success Login"});
  } catch (error) {
    return NextResponse.json(error.response.data.error);
  }
}
