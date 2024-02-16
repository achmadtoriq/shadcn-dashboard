import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

const prisma = new PrismaClient();

export async function POST(request) {

  /* Use Bearer */
  const req = request
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)

  const body = await request.json();
  const { name, email, password } = body;
  // console.log(body);

  if (!name || !email || !password) {
    return new NextResponse("Missing name, email, or password", {
      status: 400,
    });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return new NextResponse("Missing name, email, or password", { status: 400})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
        name,
        email,
        hashedPassword
    }
  })

  return NextResponse.json(user)

}
