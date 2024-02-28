import ModeToggle from "@/components/ModeToggle";
import { ThemeProvider } from "@/theme/ThemeProvider";
import clsx from "clsx";
import { GeistSans } from "geist/font";
import type { Metadata } from "next";
import "./globals.css";

const Geist = GeistSans;

export const metadata: Metadata = {
  title: "Rapid Converter",
  description: "Rapid Converter Build by Aristide KARBOU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx(`${Geist.className} antialiased`, "bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
