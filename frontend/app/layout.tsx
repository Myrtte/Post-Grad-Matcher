import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

// Load up some google fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

// Apply metadata for browser tab and search results of the page
export const metadata: Metadata = {
  title: "Post-Grad Matcher",
  description: "University-centered roomate finder.",
};

// Declare parent structure for all html files
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
