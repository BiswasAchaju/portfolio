import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await db.user.update({
      where: { id },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error Updating user:", error);
    return NextResponse.json({ error: "Error Updating user" }, { status: 500 });
  }
}
