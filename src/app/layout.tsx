import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import ClientEffects from "@/components/ClientEffects";
import "@/styles/la-cime.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Cime — Station Thermale en Haute Nature",
  description:
    "Expérience d’hébergement exclusive à Sainte-Béatrix, Lanaudière — minichalets et station thermale privée en haute nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jost.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <ClientEffects />
      </body>
    </html>
  );
}
