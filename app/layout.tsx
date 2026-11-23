import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 产出",
  description: "看近期 AI 进展、原始演示和能验证的能力边界。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
