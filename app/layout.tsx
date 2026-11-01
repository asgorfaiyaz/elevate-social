import type { Metadata } from "next";
import { Fraunces, Google_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Event",
  description: "Social Event Management",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            theme="system"
            richColors
            closeButton
            toastOptions={{
              className: "font-sans",
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
