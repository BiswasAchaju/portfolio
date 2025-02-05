import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedData = await db.Clients.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedData, { status: 200 });
  } catch (error) {
    console.error("Error Deleting Clients:", error);
    return NextResponse.json(
      { error: "Error Deleting Clients" },
      { status: 500 }
    );
  }
}
