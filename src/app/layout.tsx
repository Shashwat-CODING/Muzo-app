import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muzo - Premium Music Client",
  description: "A powerful, privacy-focused YouTube Music client built with Flutter. Ad-free, background playback, synchronized lyrics, and more.",
  keywords: ["music player", "youtube music", "flutter", "open source", "android", "ad-free", "privacy", "lofi"],
  authors: [{ name: "Shashwat", url: "https://github.com/Shashwat-CODING" }],
  creator: "Shashwat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muzo.verry.ai", // Placeholder URL
    title: "Muzo - Premium Music Client",
    description: "Experience the future of music streaming. Download Muzo for Android.",
    siteName: "Muzo",
    images: [
      {
        url: "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Muzo - Premium Music Client",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muzo - Premium Music Client",
    description: "A powerful, privacy-focused YouTube Music client built with Flutter.",
    images: ["https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png"],
    creator: "@Shashwat",
  },
  icons: {
    icon: "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png",
    apple: "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
