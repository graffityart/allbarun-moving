import type { Metadata } from "next";
import "./globals.css";
import "./region.css";
import "./region-faq.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "올바른이사 | 전국 이사업체 비교견적",
    template: "%s | 올바른이사",
  },
  description:
    "포장이사, 원룸이사, 일반이사, 사무실이사 업체를 지역별로 비교하고 무료 견적을 받아보세요. 손없는날과 이사 날짜별 날씨 정보도 함께 확인할 수 있습니다.",
  openGraph: {
    title: "올바른이사 | 전국 이사업체 비교견적",
    description:
      "내 지역 이사업체를 비교하고 손없는날과 날씨까지 확인해 이사 날짜를 준비하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "올바른이사",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
