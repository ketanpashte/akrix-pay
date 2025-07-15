import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akrix.ai Receipt Generator",
  description: "Professional receipt generation system for Akrix.ai - Generate, download, and manage receipts with ease",
  keywords: ["receipt", "generator", "payment", "akrix", "invoice", "pdf"],
  authors: [{ name: "Akrix.ai" }],
  creator: "Akrix.ai",
  publisher: "Akrix.ai",
  robots: "index, follow",
  openGraph: {
    title: "Akrix.ai Receipt Generator",
    description: "Professional receipt generation system for Akrix.ai",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akrix.ai Receipt Generator",
    description: "Professional receipt generation system for Akrix.ai",
  },
  icons: {
    icon: "/akrix-logo.png",
    shortcut: "/akrix-logo.png",
    apple: "/akrix-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
