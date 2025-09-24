import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SIPINTAR",
  description: "SIPINTAR adalah sistem berbasis Artificial Intelligence (AI) dan Computer Vision yang terintegrasi dengan CCTV sekolah untuk mendeteksi kehadiran dan keterlibatan siswa. Sistem ini mampu mengidentifikasi siswa yang hadir, bolos, atau tidak menyimak pembelajaran, serta menyajikan laporan statistik real-time kepada guru dan orang tua melalui dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
