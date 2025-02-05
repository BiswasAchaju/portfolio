import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {
            id,
            title,
            description,
            icon,
            iconBg,
            bgColor,
        } = body;

        const Feature = await db.Feature.update({
            where: { id },
            data: {
                title,
                description,
                icon,
                iconBg,
                bgColor,
            },
        });

        return NextResponse.json(Feature, { status: 200 });
    } catch (error) {
        console.error("Error updating Feature:", error);
        return NextResponse.json({ error: "Error updating Feature" }, { status: 500 });
    }
}