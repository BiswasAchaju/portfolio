import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "10");       

        const Features = await db.Feature.findMany({
            orderBy: {
                id: 'desc',
            },
            take: limit,
        });

        return NextResponse.json({
            Features,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error getting Features" }, { status: 500 });
    }
}
