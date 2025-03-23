import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../components/providers/tanstackProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { FaGooglePlay } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Play Video",
  description: "Reprodutor de videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex md:hidden h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center justify-center w-full">
                <FaGooglePlay className="text-2xl" />
                <h1 className="ml-2 text-lg font-bold">Play Vídeo</h1>
              </div>
            </header>

            <TanstackProvider>{children}</TanstackProvider>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
