import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {
            id,
            title,
                slug,
                image,
                description,
                author, 
                categoryId, 
                preview, 
        } = body;

        const BlogPost = await db.BlogPost.update({
            where: { id },
            data: {
                title,
                slug,
                image,
                description,
                author,
                categoryId: Number(categoryId),
                preview,
            },
        });

        return NextResponse.json(BlogPost, { status: 200 });
    } catch (error) {
        console.error("Error updating BlogPost:", error);
        return NextResponse.json({ error: "Error updating BlogPost" }, { status: 500 });
    }
}