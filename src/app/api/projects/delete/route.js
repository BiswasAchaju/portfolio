import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedData = await db.Project.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedData, { status: 200 });
  } catch (error) {
    console.error("Error Deleting Project:", error);
    return NextResponse.json(
      { error: "Error Deleting Project" },
      { status: 500 }
    );
  }
}
