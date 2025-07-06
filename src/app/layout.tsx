import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import { ReduxProvider } from "@/providers/ReduxProvider";


export const metadata: Metadata = {
  title: "Spendly - Personal Finance Tracker",
  description: "Modern personal finance tracking application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
         
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster richColors />
            </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
