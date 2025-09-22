import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIPINTAR - Smart School Management System",
  description: "Sistema manajemen sekolah dengan AI, Computer Vision, dan LLM untuk deteksi kehadiran otomatis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
