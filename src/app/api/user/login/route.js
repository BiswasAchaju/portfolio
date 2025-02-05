import { NextResponse } from "next/server";

import db from "@/lib/db";

import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            email,
            password
        } = body;

        const user = await db.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            return NextResponse.json({ error: "No user found." }, { status: 400 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return NextResponse.json({ error: "Wrong password." }, { status: 400 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}