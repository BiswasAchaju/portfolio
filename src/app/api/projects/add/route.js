import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            title,
            image,
            preview,
            description,
            categoryId,
            github,
            liveUrl,
        } = body;

        const Project = await db.Project.create({
            data: {
                title,
                image,
                preview,
                description,
                categoryId,
                github,
                liveUrl,
            },
        });

        return NextResponse.json(Project, { status: 201 });
    } catch (error) {
        console.error("Error creating Project:", error);
        return NextResponse.json({ error: "Error creating Project" }, { status: 500 });
    }
}