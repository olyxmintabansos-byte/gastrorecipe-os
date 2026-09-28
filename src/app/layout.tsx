import type { Metadata } from 'next';
import './globals.css';
import { CulinaryProvider } from '@/context/CulinaryContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'GastroRecipe OS — Michelin Molecular Gastronomy & Flavor Pairing Matrix',
  description:
    'Titan #44: Fine dining culinary operations system, Y2K cyber-minimal Japanese bento grid, volatile flavor pairing compounds, and liquid nitrogen protocol manuals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#07090e] text-[#e2e8f0]">
        <CulinaryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </CulinaryProvider>
      </body>
    </html>
  );
}
