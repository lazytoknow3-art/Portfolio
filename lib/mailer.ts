import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
    throw new Error("RESEND_API_KEY environment variable is required to send email via Resend.");
}

const resend = new Resend(resendApiKey);

export async function sendMail(subject: string, html: string) {
    await resend.emails.send({
        from: process.env.RESEND_FROM || "onboarding@resend.dev",
        to: "thulasiram19032006@gmail.com",
        subject,
        html,
    });
}
