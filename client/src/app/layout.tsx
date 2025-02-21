import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ptBR } from "@clerk/localizations";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dev House",
  description: "Tudo que você precisa para se tornar um desenvolvedor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider localization={ptBR}>
        <html lang="en">
          <body className={`${inter.variable} antialiased`}>
            <Providers>
              <Suspense fallback={null}>
                <div className="root-layout">{children}</div>
              </Suspense>
              <Toaster richColors closeButton />
            </Providers>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
