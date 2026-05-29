import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const nunito = Nunito({
  variable: "--font-sans-cute",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shio | Dương Đức Cương — Portfolio",
  description: "Xin chào! Mình là Shio (Dương Đức Cương) — Junior Developer & học sinh THPT Chuyên Trần Phú, Hải Phòng. Cùng xem portfolio của mình nhé!",
  keywords: ["Shio", "Dương Đức Cương", "Junior Developer", "Portfolio", "Next.js", "Trần Phú", "Hải Phòng"],
  authors: [{ name: "Dương Đức Cương", url: "https://github.com/ShioVn" }],
  openGraph: {
    title: "Shio | Portfolio",
    description: "Cute kawaii developer portfolio — Junior Dev & High School Student",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shio | Portfolio",
    description: "Cute kawaii developer portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${nunito.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
