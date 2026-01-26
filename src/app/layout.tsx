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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable}`}>
      {/* content-visibility optimization if needed, but basic structure here */}
      <body>
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}
