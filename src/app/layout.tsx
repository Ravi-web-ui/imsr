import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "IMSR - Institute of Management Studies and Research | Future Varsity",
  description: "Join IMSR for world-class Sports Management, Sciences, and Business programs. Admissions open for 2025.",
  icons: {
    icon: "/images/IMSR-favicon.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#e8f4fd] text-zinc-900 font-sans">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
