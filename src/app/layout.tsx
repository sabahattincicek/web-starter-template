/**
 * The root layout around every page: fonts, theme, and default page metadata.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { appConfig } from "@/core/config/app-config";
import { ThemeProvider } from "@/presentation/ui/theme/theme-provider";
import "@/presentation/ui/theme/globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the theme class on <html> before React loads.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
