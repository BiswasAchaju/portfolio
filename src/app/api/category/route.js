import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "10");       

        const Category = await db.Category.findMany({
            orderBy: {
                id: 'desc',
            },
            take: limit,
        });

        return NextResponse.json({
            Category,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error getting Category" }, { status: 500 });
    }
}
