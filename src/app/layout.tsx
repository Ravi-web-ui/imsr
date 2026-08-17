import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";
import Script from "next/script";

const kanit = Kanit({
  variable: "--font-sans",
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
      className={cn("antialiased", kanit.variable)}
    >
      <body className="flex flex-col bg-[#e8f4fd] text-zinc-900 font-sans">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* ChatBot (www.chatbot.com) Integration */}
        <Script id="chatbot-widget-script" strategy="afterInteractive">
          {`
            window.__ow = window.__ow || {};
            window.__ow.organizationId = "c135509f-89bf-4e5d-9a53-501af1df6dcc";
            window.__ow.template_id = "467cf751-7b37-4781-955d-db10d3d2f47c";
            window.__ow.integration_name = "manual_settings";
            window.__ow.product_name = "chatbot";   
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
          `}
        </Script>
        <noscript>
          You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a>
        </noscript>
      </body>
    </html>
  );
}
