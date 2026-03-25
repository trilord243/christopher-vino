import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { storeConfig } from "@/lib/store-config";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${storeConfig.name} | ${storeConfig.tagline}`,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
  keywords: [
    "wine",
    "liquor",
    "spirits",
    "whiskey",
    "vodka",
    "tequila",
    "champagne",
    "red wine",
    "white wine",
    "bourbon",
    "scotch",
    "rum",
    "gin",
    "cognac",
    "online liquor store",
    "buy wine online",
    "buy spirits online",
  ],
  openGraph: {
    title: `${storeConfig.name} | ${storeConfig.tagline}`,
    description: storeConfig.description,
    url: storeConfig.siteUrl,
    siteName: storeConfig.name,
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: `${storeConfig.name} | ${storeConfig.tagline}`,
    description: storeConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <CartProvider>
          <AgeGate />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
