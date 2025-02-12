import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, title, logo, categoryId } = body;

        // Validate input
        if (!id) {
            return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
        }

        const updatedClient = await db.client.update({
            where: { id },
            data: {
                title,
                logo,
                categoryId: categoryId ? Number(categoryId) : null, // Convert to number
            },
        });

        return NextResponse.json(updatedClient, { status: 200 });
    } catch (error) {
        console.error("Error updating Clients:", error);
        return NextResponse.json({ error: "Error updating Clients" }, { status: 500 });
    }
}
