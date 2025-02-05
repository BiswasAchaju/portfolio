import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
    try {     

        const Clientss = await db.Clients.findMany({
            orderBy: {
                id: 'desc',
            },
        });

        return NextResponse.json({
            Clientss,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error getting Clients" }, { status: 500 });
    }
}
