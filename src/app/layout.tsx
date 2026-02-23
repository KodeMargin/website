import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { PageShell } from "@/components/layout/PageShell";
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
  title: "KodeMargin | Full-Service Digital Agency",
  description: "Software, Web Development, Mobile Apps, and Digital Marketing Strategies that scale.",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-surface text-text-dark font-sans overflow-hidden`}
      >
        <SplashScreen />
        <div className="flex h-screen w-full overflow-hidden">
          {/* Sidebar (Desktop) */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative h-full w-full hide-scrollbar pb-20 lg:pb-0">
            <PageShell>
              {children}
            </PageShell>
          </main>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
