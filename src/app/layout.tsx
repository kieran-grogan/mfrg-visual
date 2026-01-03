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
        className={`${inter.className} antialiased h-full flex overflow-hidden bg-slate-50`}
      >
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto py-10 px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
