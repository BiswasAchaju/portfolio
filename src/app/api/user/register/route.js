import { NextResponse } from "next/server";

import db from "@/lib/db";

import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            password
        } = body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashPassword
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}