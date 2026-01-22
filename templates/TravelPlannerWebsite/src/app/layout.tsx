import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/siteConfig";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: siteConfig.name || "TravelPanner - Flight Booking & Holiday Packages",
  description: siteConfig.description || "Best deals on flights, hotels, and holiday packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeClass = siteConfig.theme === 'dark' ? 'dark' : '';
  const primaryColor = siteConfig.primaryColor || '#0077b6';

  return (
    <html lang="en" suppressHydrationWarning className={themeClass}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary: ${primaryColor};
              --ring: ${primaryColor};
            }
            .dark {
              --primary: ${primaryColor};
               --ring: ${primaryColor};
            }
          `
        }} />
      </head>
      <body className={cn(inter.className, playfair.variable, "min-h-screen flex flex-col bg-background font-sans antialiased")} suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
