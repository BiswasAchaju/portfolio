import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {
            id,
            title,
            icon,
        } = body;

        const Category = await db.Category.update({
            where: { id },
            data: {
                title,
                icon,
            },
        });

        return NextResponse.json(Category, { status: 200 });
    } catch (error) {
        console.error("Error updating Category:", error);
        return NextResponse.json({ error: "Error updating Category" }, { status: 500 });
    }
}