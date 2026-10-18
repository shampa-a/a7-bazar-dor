import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: "A7 Bazar Dor",
  description: "আজকের বাজারের দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
       <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
         
      </body>
    </html>
  );
}