import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export const metadata: Metadata = {
    title: "Artisan Web Co. — Beautiful Websites for Local Businesses",
    description:
        "We build affordable, beautiful websites for bakeries, boutiques, cafés, salons & local shops. No tech skills needed. Custom designs, ongoing support.",
    keywords: [
        "web design",
        "small business website",
        "bakery website",
        "café website",
        "boutique website",
        "salon website",
        "affordable web design",
        "local business",
        "Chennai web design",
    ],
    openGraph: {
        title: "Artisan Web Co. — Beautiful Websites for Local Businesses",
        description:
            "Affordable, beautiful websites for bakeries, boutiques, cafés & local shops.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-body">
                <LenisProvider />
                {children}
            </body>
        </html>
    );
}
