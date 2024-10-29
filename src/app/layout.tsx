import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/components/app-provider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { baseOpenGraph } from "./sharedMetadata";

const inter = Inter({ subsets: ['vietnamese']});

export const metadata: Metadata = {
  title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
  description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
  openGraph: baseOpenGraph
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
 
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppProvider>
              {children}
              <Toaster />
            </AppProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
