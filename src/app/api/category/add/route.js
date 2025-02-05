import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            title,
            icon,
        } = body;

        const Category = await db.Category.create({
            data: {
                title,
                icon,
            },
        });

        return NextResponse.json(Category, { status: 201 });
    } catch (error) {
        console.error("Error creating Category:", error);
        return NextResponse.json({ error: "Error creating Category" }, { status: 500 });
    }
}