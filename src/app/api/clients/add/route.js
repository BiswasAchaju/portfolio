import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            title,
            logo,
            categoryId,
        } = body;

        const Clients = await db.clients.create({
            data: {
                title,
                logo,
                categoryId: Number(categoryId),
            },
        });

        return NextResponse.json(Clients, { status: 201 });
    } catch (error) {
        console.error("Error creating Clients:", error);
        return NextResponse.json({ error: "Error creating Clients" }, { status: 500 });
    }
}