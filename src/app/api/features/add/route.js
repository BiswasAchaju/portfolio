import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            title,
            description,
            icon,
            iconBg,
            bgColor,
        } = body;

        const Feature = await db.Feature.create({
            data: {
                title,
                description,
                icon,
                iconBg,
                bgColor,
            },
        });

        return NextResponse.json(Feature, { status: 201 });
    } catch (error) {
        console.error("Error creating Feature:", error);
        return NextResponse.json({ error: "Error creating Feature" }, { status: 500 });
    }
}