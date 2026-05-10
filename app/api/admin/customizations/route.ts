import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
    const password = request.headers.get("x-admin-password");

    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM customization_requests ORDER BY created_at DESC"
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching customization requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch customization requests" },
            { status: 500 }
        );
    }
}
