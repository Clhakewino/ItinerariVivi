import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Importa il componente (assumendo che lo crei in components/Navbar.tsx)
import Navbar from "./components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ItinerariVivi - Esplora il Mondo",
  description: "Trova il tuo prossimo viaggio indimenticabile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it" // Cambiato in italiano per coerenza col brand
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        {/* 2. La Navbar va qui: sarà visibile in tutte le rotte */}
        <Navbar />

        {/* 3. Il contenuto della pagina specifica viene iniettato qui */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Opzionale: qui potresti aggiungere un Footer */}
      </body>
    </html>
  );
}
