import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "../providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School management system",
  description:
    "School management system with Next.js and Geist UI and Tailwind CSS framework with shadcn/ui components and Radix UI. Next.js, Geist UI, Tailwind CSS, shadcn/ui, Radix UI and TypeScript are used in this project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProviders>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProviders>
      </body>
    </html>
  );
}
