import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Al-Farg’oniy Academy | Zamonaviy Ta'lim Markazi",
  description: "Uchko'prik, Yangiqo'rg'on va Buvayda filiallarida Full-Stack Web Dasturlash, Python, English & IELTS, va Grafik Dizayn bo'yicha zamonaviy ta'lim oling.",
  keywords: ["Al-Farg'oniy Academy", "IT ta'lim", "Dasturlash kursi", "IELTS", "Uchko'prik", "Yangiqo'rg'on", "Buvayda", "Farg'ona"],
  authors: [{ name: "Al-Farg'oniy Academy" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#080D1A] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
