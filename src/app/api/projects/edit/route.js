import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {
            id,
            title,
            image,
            preview,
            description,
            categoryId,
            github,
            liveUrl,
        } = body;

        const Project = await db.Project.update({
            where: { id },
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

        return NextResponse.json(Project, { status: 200 });
    } catch (error) {
        console.error("Error updating Project:", error);
        return NextResponse.json({ error: "Error updating Project" }, { status: 500 });
    }
}