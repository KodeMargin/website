import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { PageShell } from "@/components/layout/PageShell";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/layout/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KodeMargin | Software Development Company",
  description: "Custom software, web applications, mobile apps, and digital products designed and built for growing businesses.",
  icons: {
    icon: "/KodeMargin.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-text-dark font-sans`}
      >
        <SplashScreen />
        <Navbar />
        <main className="pt-20 min-h-screen">
          <PageShell>
            {children}
          </PageShell>
        </main>
        <Footer />
      </body>
    </html>
  );
}
