import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingBackground from "@/components/FloatingBackground";

const inter = Inter({ subsets: ["latin"] });

// FIX 18 — canonical + og:image fallback in root layout
export const metadata: Metadata = {
    title: "Blogs | CyberNeurix",
    description: "Explore the intersection of cybersecurity and neurotechnology. In-depth articles, research, and insights.",
    keywords: ["cybersecurity", "neurotechnology", "AI", "machine learning", "brain-computer interface"],
    icons: {
        icon: "/favicon.ico",
    },
    alternates: {
        canonical: 'https://blogs.cyberneurix.com/',
    },
    openGraph: {
        title: "Blogs | CyberNeurix",
        description: "Explore the intersection of cybersecurity and neurotechnology. In-depth articles, research, and insights.",
        url: 'https://blogs.cyberneurix.com/',
        siteName: 'CyberNeurix',
        type: 'website',
        // FIX 3 — og:image fallback for layout
        images: [{ url: 'https://blogs.cyberneurix.com/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        site: '@CyberNeurix',
        creator: '@CyberNeurix',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.className} dark`}>
                <ThemeProvider>
                    <Header />
                    <main className="min-h-screen relative z-10">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
