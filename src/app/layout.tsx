import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import { ReduxProvider } from "@/providers/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Finora - Personal Finance Tracker",
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
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster richColors />
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
