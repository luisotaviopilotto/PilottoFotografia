import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Pilotto Fotografia | Site em Construção",
  description:
    "Estamos preparando uma nova experiência para eternizar momentos e histórias com sensibilidade e arte. Em breve.",
  keywords: ["fotografia", "pilotto fotografia", "ensaios", "casamentos", "eventos", "fotógrafo"],
  authors: [{ name: "Pilotto Fotografia" }],
  openGraph: {
    title: "Pilotto Fotografia | Site em Construção",
    description: "Em breve um novo espaço e portfólio completo da Pilotto Fotografia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans dark", figtree.variable)}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}

