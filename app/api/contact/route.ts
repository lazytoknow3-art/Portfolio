import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, business_name, business_type, email, message } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        await query(
            "INSERT INTO contact_messages (name, business_name, business_type, email, message) VALUES ($1, $2, $3, $4, $5)",
            [name, business_name || null, business_type || null, email, message || null]
        );

        return NextResponse.json(
            { message: "Contact message saved successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving contact message:", error);
        return NextResponse.json(
            { error: "Failed to save message" },
            { status: 500 }
        );
    }
}
