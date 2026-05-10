import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendMail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, dream_website, color_mood, features } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        await query(
            "INSERT INTO customization_requests (name, email, dream_website, color_mood, features) VALUES ($1, $2, $3, $4, $5)",
            [
                name,
                email,
                dream_website || null,
                color_mood || null,
                features ? JSON.stringify(features) : null,
            ]
        );

        sendMail(
            `New Customization Request: ${name}`,
            `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Dream Website:</b> ${dream_website || "—"}</p>
             <p><b>Color Mood:</b> ${color_mood || "—"}</p>
             <p><b>Features:</b> ${features ? (Array.isArray(features) ? features : JSON.parse(features)).join(", ") : "—"}</p>`
        ).catch((err) => console.error("Mail error:", err));

        return NextResponse.json(
            { message: "Customization request saved successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving customization request:", error);
        return NextResponse.json(
            { error: "Failed to save request" },
            { status: 500 }
        );
    }
}
