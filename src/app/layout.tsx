import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Playpen_Sans, Josefin_Sans, Silkscreen, Inter, Poppins } from 'next/font/google'
import AuthProvider from "../app/admin/_components/AuthProvider"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const playpenSans500 = Playpen_Sans({ 
  subsets: ['latin'],
  weight: '500',
  variable: '--font-playpen-sans-500',
})

const josefinSans400 = Josefin_Sans({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-josefin-sans-400',
})

const silkscreen700 = Silkscreen({ 
  subsets: ['latin'],
  weight: '700',
  variable: '--font-silkscreen-700',
})

export const metadata: Metadata = {
  title: "Suman Acharya",
  description: "Full Stack Developer",
};

export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className={`${playpenSans500.variable} ${josefinSans400.variable} ${silkscreen700.variable} font-sans ${inter.variable} ${poppins.variable}`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
