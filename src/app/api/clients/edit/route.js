import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {
            id,
            title,
            logo,
            categoryId,
        } = body;

        const Clients = await db.Clients.update({
            where: { id },
            data: {
                title,
                logo,
                categoryId: Number(categoryId) ,
            },
        });

        return NextResponse.json(Clients, { status: 200 });
    } catch (error) {
        console.error("Error updating Clients:", error);
        return NextResponse.json({ error: "Error updating Clients" }, { status: 500 });
    }
}