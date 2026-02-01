import type { Metadata } from "next";
import { Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "afrodev, the untraditional startup",
  description: "untraditional in every way. untraditional is a strength, not a weakness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceCodePro.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
