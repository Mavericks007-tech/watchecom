import type { Metadata, Viewport } from "next";
import { Jost, Geist_Mono } from "next/font/google";
import "./globals.css";

// Jost: geometric display + body face (Futura lineage, the house style of luxury fashion and watchmaking).
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono: technical labels, prices and part names.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XIIAS C-09 Carbon | One watch a month",
  description:
    "XIIAS releases one watch each month. September is the C-09 Carbon, a forged carbon chronograph made in a single run.",
};

export const viewport: Viewport = {
  themeColor: "#070606",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
