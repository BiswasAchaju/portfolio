import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Error getting user" }, { status: 500 });
    }
}