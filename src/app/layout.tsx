import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GHL Visual Aid - XCEL + Contracting",
  description: "Interactive documentation for GHL automations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} antialiased min-h-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors`}
      >
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-5xl mx-auto py-6 px-4 sm:px-8 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
