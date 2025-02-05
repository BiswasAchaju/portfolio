import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            title,
            slug,
            image,
            description,
            author, 
            categoryId, 
            preview, 
        } = body;

        const BlogPost = await db.blogPost.create({
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

        return NextResponse.json(BlogPost, { status: 201 });
    } catch (error) {
        console.error("Error creating BlogPost:", error);
        return NextResponse.json({ error: "Error creating BlogPost" }, { status: 500 });
    }
}