import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using next/font is better than @import
import "./globals.css";
import ImageProtection from "@/components/ImageProtection";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cuenca Lago Ranco | Inversión y Vida Rural",
  description: "Descubre el futuro en el sur. Tu guía esencial para vivir e invertir en la Cuenca del Lago Ranco. Parcelas, turismo y consejos locales.",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable}`}>
      {/* content-visibility optimization if needed, but basic structure here */}
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T90JWMHJ6E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T90JWMHJ6E');
          `}
        </Script>
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}
