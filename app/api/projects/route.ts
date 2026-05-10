import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const adminPwd = request.headers.get("x-admin-password");

    if (adminPwd !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    try {
        await query("DELETE FROM projects WHERE id = $1", [id]);
        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const rows = await query(
            "SELECT * FROM projects ORDER BY created_at DESC"
        );

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching projects:", error);
        // Return empty array instead of error so frontend falls back gracefully
        return NextResponse.json([]);
    }
}
