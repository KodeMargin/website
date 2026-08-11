import type { Metadata } from "next";
import { Stack_Sans_Text } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { PageShell } from "@/components/layout/PageShell";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/layout/SplashScreen";

const stackSansText = Stack_Sans_Text({
  variable: "--font-stack-sans-text",
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
        className={`${stackSansText.variable} ${stackSansText.className} antialiased bg-background text-text-dark`}
      >
        <SplashScreen />
        <Navbar />
        <main className="min-h-screen">
          <PageShell>
            {children}
          </PageShell>
        </main>
        <Footer />
      </body>
    </html>
  );
}
